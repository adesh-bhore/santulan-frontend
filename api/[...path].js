/**
 * Vercel Serverless API Proxy
 * Forwards requests from HTTPS frontend to HTTP backend
 * This solves the mixed content security issue
 */

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Extract path from URL
  const { path } = req.query;
  const apiPath = Array.isArray(path) ? path.join('/') : path || '';
  
  // Backend URL - using HTTPS
  // Note: apiPath already includes everything after /api/
  const backendUrl = `https://santulan.duckdns.org/api/${apiPath}`;
  
  console.log(`[Proxy] Incoming path:`, path);
  console.log(`[Proxy] Constructed apiPath:`, apiPath);
  console.log(`[Proxy] Full backend URL:`, backendUrl);
  
  console.log(`[Proxy] ${req.method} ${apiPath}`);
  
  try {
    // Forward request to backend
    const fetchOptions = {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    
    // Add body for POST/PUT requests
    if (req.method !== 'GET' && req.method !== 'HEAD' && req.body) {
      fetchOptions.body = JSON.stringify(req.body);
    }
    
    const response = await fetch(backendUrl, fetchOptions);
    
    // Get response data
    const contentType = response.headers.get('content-type');
    let data;
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }
    
    // Forward response
    return res.status(response.status).json(data);
    
  } catch (error) {
    console.error('[Proxy] Error:', error);
    console.error('[Proxy] Request details:', {
      method: req.method,
      path: req.query.path,
      apiPath,
      backendUrl
    });
    return res.status(500).json({ 
      error: 'Proxy request failed', 
      details: error.message,
      path: apiPath,
      backendUrl
    });
  }
}
