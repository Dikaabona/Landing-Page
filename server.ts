
import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Test route to verify server is reachable
  app.get('/api/ping', (req, res) => {
    res.json({ message: 'pong', timestamp: new Date().toISOString() });
  });

  // Career form submission endpoint (supports both new and old paths for compatibility)
  const handleSubmission = async (req: any, res: any) => {
    try {
      const data = req.body;
      console.log('Submission received:', data);

      const webhookUrl = process.env.CAREER_SPREADSHEET_WEBHOOK_URL;
      
      if (!webhookUrl) {
        console.error('CAREER_SPREADSHEET_WEBHOOK_URL is missing');
        return res.status(400).json({ 
          success: false, 
          message: 'CAREER_SPREADSHEET_WEBHOOK_URL belum diatur di project settings (Environment Variables).' 
        });
      }

      try {
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        
        const responseText = await response.text();
        
        if (response.ok) {
          return res.status(200).json({ success: true });
        } else {
          return res.status(500).json({ 
            success: false, 
            message: 'Spreadsheet Apps Script returned an error.',
            details: responseText
          });
        }
      } catch (err: any) {
        return res.status(500).json({ 
          success: false, 
          message: 'Gagal menghubungi Webhook Spreadsheet: ' + err.message 
        });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };

  app.post('/api/submit-lamaran', handleSubmission);
  app.post('/api/career', handleSubmission);

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    
    // Fallback for SPA in dev mode
    app.all('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        const template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        const html = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
      } catch (e) {
        if (vite) {
          vite.ssrFixStacktrace(e as Error);
        }
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
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
