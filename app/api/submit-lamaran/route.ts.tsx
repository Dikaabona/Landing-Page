export async function POST(request: Request) {
  const requestId = Math.random().toString(36).substring(7);
  
  try {
    const data = await request.json();
    const webhookUrl = process.env.CAREER_SPREADSHEET_WEBHOOK_URL;

    if (!webhookUrl) {
      return Response.json({
        success: false,
        message: 'CAREER_SPREADSHEET_WEBHOOK_URL belum diset di Vercel!'
      }, { status: 400 });
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      return Response.json({ success: true });
    } else {
      const errorText = await response.text();
      return Response.json({
        success: false,
        message: 'Apps Script error',
        details: errorText
      }, { status: 500 });
    }

  } catch (error: any) {
    return Response.json({
      success: false,
      message: error.message
    }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}