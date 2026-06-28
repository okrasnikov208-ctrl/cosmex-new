import { createClient } from '@supabase/supabase-client';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  // Настройка CORS заголовков
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      // Отдаем товары напрямую из базы Supabase
      const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return res.status(200).json(products || []);
    }

    if (req.method === 'POST') {
      const importedProducts = [];

      // Фейковые данные для теста, пока не привязаны ключи маркетплейсов
      if (importedProducts.length === 0) {
        importedProducts.push(
          { title: "Cosmic Jacket Alpha", price: 129, image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2", source: "AliExpress" },
          { title: "Quantum Watch X", price: 399, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30", source: "Amazon" }
        );
      }

      // Сохраняем товары в базу Supabase
      const { error: insertError } = await supabase
        .from('products')
        .upsert(importedProducts, { onConflict: 'title' });

      if (insertError) throw insertError;

      return res.status(200).json({ success: true, count: importedProducts.length });
    }

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}