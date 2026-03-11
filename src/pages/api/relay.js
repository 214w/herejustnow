export default async function handler(req, res) {
      if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    
      const signal = req.body;
    
      // Implementation Note: Here we would use a stateless store like Redis
      // to 'SET' the key with an EXPIRE of 3600 seconds.
      // This ensures the data automatically vanishes from the relay.
    
      console.log('Relay received signal for:', signal.storeName);
    
      return res.status(200).json({ success: true, message: 'Signal broadcasted' });
    }
