import { createClient } from '@supabase/supabase-js';

// Read-only public catalog endpoint. Do not expose product imports via unauthenticated POST.
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    return res.status(503).json({ error: 'Product catalog is not configured' });
  }

  try {
    const supabase = createClient(url, anonKey, {
      auth: { persistSession: false, autoRefreshToken: false }
    });
    // Requires a products table and SELECT permissions via Supabase RLS.
    const { data, error } = await supabase
      .from('products')
      .select('id,title,price,image,source,created_at')
      .order('created_at', { ascending: false })
      .limit(100);
    if (error) throw error;
    return res.status(200).json(data || []);
  } catch (error) {
    console.error('Failed to load product catalog:', error);
    return res.status(503).json({ error: 'Product catalog unavailable' });
  }
}
