
import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

async function setupServer() {
  app.use(cors());
  app.use(express.json());

  // Log all requests for debugging
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
  });

  // Test route to verify server is reachable
  app.get('/api/status', (req, res) => {
    res.json({ 
      status: 'online', 
      webhook_configured: !!process.env.CAREER_SPREADSHEET_WEBHOOK_URL,
      timestamp: new Date().toISOString() 
    });
  });

  app.get('/api/ping', (req, res) => {
    res.json({ message: 'pong', timestamp: new Date().toISOString() });
  });

  // Career form submission endpoint
  const handleSubmission = async (req: any, res: any) => {
    const requestId = Math.random().toString(36).substring(7);
    console.log(`[${requestId}] --- Submission Process Started ---`);
    console.log(`[${requestId}] Request Body:`, JSON.stringify(req.body).substring(0, 500) + '...');
    
    try {
      const data = req.body;
      const webhookUrl = process.env.CAREER_SPREADSHEET_WEBHOOK_URL;
      
      if (!webhookUrl) {
        console.error(`[${requestId}] ERROR: CAREER_SPREADSHEET_WEBHOOK_URL is missing`);
        return res.status(400).json({ 
          success: false, 
          message: 'Webhook URL belum diatur di Settings > Secrets (Environment Variables).' 
        });
      }

      console.log(`[${requestId}] Forwarding to Google Apps Script...`);
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      const responseText = await response.text();
      console.log(`[${requestId}] Google Apps Script response status:`, response.status);
      
      if (response.ok) {
        console.log(`[${requestId}] SUCCESS: Data sent to spreadsheet`);
        return res.status(200).json({ success: true });
      } else {
        console.error(`[${requestId}] ERROR from Apps Script:`, responseText);
        return res.status(500).json({ 
          success: false, 
          message: 'Apps Script mengembalikan error. Periksa deployment AppScript Anda.',
          details: responseText
        });
      }
    } catch (error: any) {
      console.error(`[${requestId}] SYSTEM ERROR:`, error.message);
      res.status(500).json({ success: false, message: 'Server backend error: ' + error.message });
    }
  };

  // Define API routes explicitly
  app.post('/api/submit-lamaran', handleSubmission);
  app.post('/api/career', handleSubmission);
  
  // Also support GET for testing
  app.get('/api/test-form', (req, res) => {
    res.send('API is ready for POST requests at /api/submit-lamaran');
  });

  app.options('/api/submit-lamaran', (req, res) => res.sendStatus(204));
  app.options('/api/career', (req, res) => res.sendStatus(204));

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    
    // Explicit SPA fallback for development
    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Available routes: /api/ping, /api/submit-lamaran`);
  });
}

// Check if we are running in a local environment
const isLocal = process.env.NODE_ENV !== 'production' || !!process.env.VITE_DEV;

if (isLocal) {
  setupServer().catch(err => {
    console.error('Failed to start server:', err);
  });
}

export { app };
export default app;
