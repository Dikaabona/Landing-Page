
import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Log all requests for debugging
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
  });

  // Test route to verify server is reachable
  app.get('/api/ping', (req, res) => {
    res.json({ message: 'pong', timestamp: new Date().toISOString() });
  });

  // Career form submission endpoint
  const handleSubmission = async (req: any, res: any) => {
    console.log('--- Submission Process Started ---');
    try {
      const data = req.body;
      const webhookUrl = process.env.CAREER_SPREADSHEET_WEBHOOK_URL;
      
      if (!webhookUrl) {
        console.error('ERROR: CAREER_SPREADSHEET_WEBHOOK_URL is missing in environment variables');
        return res.status(400).json({ 
          success: false, 
          message: 'Konfigurasi CAREER_SPREADSHEET_WEBHOOK_URL belum diatur. Silakan atur di Settings > Secrets.' 
        });
      }

      console.log('Forwarding data to Google Apps Script...');
      try {
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        
        const responseText = await response.text();
        console.log('Google Apps Script response status:', response.status);
        
        if (response.ok) {
          console.log('SUCCESS: Data sent to spreadsheet');
          return res.status(200).json({ success: true });
        } else {
          console.error('ERROR from Spreadsheet:', responseText);
          return res.status(500).json({ 
            success: false, 
            message: 'Aplikasi Google Sheets mengembalikan error.',
            details: responseText
          });
        }
      } catch (err: any) {
        console.error('FETCH ERROR:', err.message);
        return res.status(500).json({ 
          success: false, 
          message: 'Gagal terhubung ke Webhook Spreadsheet: ' + err.message 
        });
      }
    } catch (error: any) {
      console.error('SYSTEM ERROR:', error.message);
      res.status(500).json({ success: false, message: 'Internal server error: ' + error.message });
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

startServer();
