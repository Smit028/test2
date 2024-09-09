export default async function handler(req, res) {
    const { code } = req.query;
  
    if (!code) {
      return res.status(400).json({ error: 'Authorization code missing' });
    }
  
    const clientId = 'YOUR_CLIENT_ID';
    const clientSecret = 'YOUR_CLIENT_SECRET';
    const redirectUri = 'http://localhost:3000/callback'; // Same as in your OAuth flow
  
    try {
      const response = await fetch('https://api.instagram.com/oauth/access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: 'authorization_code',
          redirect_uri: redirectUri,
          code: code,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        res.status(200).json({ access_token: data.access_token });
      } else {
        res.status(500).json({ error: data.error_message || 'Failed to fetch access token' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch access token' });
    }
  }
  