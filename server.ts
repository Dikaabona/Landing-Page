
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

  // Career form submission endpoint
  app.post('/api/career', async (req, res) => {
    try {
      const data = req.body;
      console.log('New Career Submission:', data);

      const webhookUrl = process.env.CAREER_SPREADSHEET_WEBHOOK_URL;
      
      if (!webhookUrl) {
        console.error('CAREER_SPREADSHEET_WEBHOOK_URL is not defined');
        return res.status(400).json({ 
          success: false, 
          message: 'Webhook URL Spreadsheet belum diatur di Environment Variables.' 
        });
      }

      try {
        // Forward to Google Apps Script Web App
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        
        const responseText = await response.text();
        
        if (response.ok) {
          console.log('Webhook Success:', responseText);
          return res.status(200).json({ success: true, message: 'Data sent to spreadsheet' });
        } else {
          console.error('Webhook returned error status:', response.status, responseText);
          return res.status(500).json({ 
            success: false, 
            message: 'Google Sheets Apps Script returned an error.', 
            details: responseText,
            status: response.status 
          });
        }
      } catch (fetchErr: any) {
        console.error('Fetch error when calling webhook:', fetchErr);
        return res.status(500).json({ 
          success: false, 
          message: 'Failed to connect to Google Sheets Webhook.', 
          error: fetchErr.message 
        });
      }
    } catch (error) {
      console.error('Career submission error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });

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
