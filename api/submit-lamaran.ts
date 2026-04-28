import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const data = req.body;
    const webhookUrl = process.env.CAREER_SPREADSHEET_WEBHOOK_URL;

    if (!webhookUrl) {
      return res.status(400).json({
        success: false,
        message: 'CAREER_SPREADSHEET_WEBHOOK_URL belum diset di Vercel Settings!'
      });
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      return res.status(200).json({ success: true });
    }

    const errorText = await response.text();
    return res.status(500).json({ success: false, details: errorText });

  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
