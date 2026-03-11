export const relaySignal = async (storeData) => {
      // In a production environment, this would be a POST request to a
      // stateless serverless function (Next.js API route or Netlify Function)
      // that uses Redis (Upstash) or WebSockets (Ably/Pusher) to broadcast.
    
      console.log("Broadcasting ephemeral signal:", storeData);
    
      const response = await fetch('/api/relay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...storeData,
          expiresAt: Date.now() + 3600000 // 1-hour TTL
        }),
      });
    
      return response.json();
    };
    
