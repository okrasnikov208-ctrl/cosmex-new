import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import useStore from '../store/useStore'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { formatDistanceToNow } from 'date-fns'

// ====== FEED ======
export function Feed() {
  const { user, profile } = useStore()
  const [posts, setPosts] = useState([])
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    const { data } = await supabase
      .from('posts').select('*, profiles(username,avatar_url)')
      .order('created_at', { ascending: false }).limit(30)
    setPosts(data || [])
    setLoading(false)
  }

  const submit = async () => {
    if (!user) { toast.error('Sign in to post'); return }
    if (!content.trim()) return
    const { error } = await supabase.from('posts').insert({ user_id: user.id, content })
    if (!error) { setContent(''); fetchPosts(); toast.success('Posted!') }
    else toast.error(error.message)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Compose */}
      {user && (
        <div className="card p-4 mb-6 border-blue-500/20">
          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-sm font-bold flex-shrink-0">
              {(profile?.username?.[0] || '?').toUpperCase()}
            </div>
            <div className="flex-1">
              <textarea value={content} onChange={e=>setContent(e.target.value)}
                className="input-cosmos resize-none" rows={3}
                placeholder="Share something with the cosmos..." />
              <div className="flex justify-end mt-2">
                <button onClick={submit} className="btn-primary px-6 py-2 text-sm">Publish</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {!user && (
        <div className="card p-6 mb-6 text-center border-blue-500/20">
          <p className="text-slate-400 mb-3">Join to post and interact</p>
          <div className="flex gap-3 justify-center">
            <Link to="/login" className="btn-ghost px-6 py-2 text-sm">Sign in</Link>
            <Link to="/register" className="btn-primary px-6 py-2 text-sm">Join free</Link>
          </div>
        </div>
      )}

      {/* Posts */}
      {loading ? (
        <div className="text-center text-slate-500 py-12">Loading...</div>
      ) : posts.length === 0 ? (
        <div className="text-center text-slate-500 py-12">No posts yet. Be the first!</div>
      ) : (
        <div className="flex flex-col gap-4">
          {posts.map(post => (
            <div key={post.id} className="card p-5 border-blue-500/10 hover:border-blue-500/25 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold">
                  {(post.profiles?.username?.[0] || '?').toUpperCase()}
                </div>
                <div>
                  <div className="text-sm font-medium text-white">{post.profiles?.username || 'Explorer'}</div>
                  <div className="text-xs text-slate-500">
                    {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                  </div>
                </div>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">{post.content}</p>
              <div className="flex gap-4 mt-3 pt-3 border-t border-white/5">
                <button className="text-xs text-slate-500 hover:text-blue-400 transition-colors">♥ Like</button>
                <button className="text-xs text-slate-500 hover:text-blue-400 transition-colors">💬 Comment</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ====== MARKET ======
export function Market() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => { fetchProducts() }, [filter])

  const fetchProducts = async () => {
    let q = supabase.from('products').select('*, profiles(username)')
      .eq('status', 'active').order('created_at', { ascending: false }).limit(40)
    if (filter !== 'all') q = q.eq('condition', filter)
    const { data } = await q
    setProducts(data || [])
    setLoading(false)
  }

  const FILTERS = [
    { value: 'all', label: 'All' },
    { value: 'new', label: '✨ New' },
    { value: 'like_new', label: '⭐ Like new' },
    { value: 'good', label: '👍 Good' },
    { value: 'fair', label: '🔧 Fair' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-white" style={{fontFamily:'Space Grotesk,sans-serif'}}>Marketplace</h1>
          <p className="text-slate-400 mt-1">Find gear from explorers worldwide</p>
        </div>
        <Link to="/sell" className="btn-primary px-6 py-2.5">+ Sell</Link>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {FILTERS.map(f => (
          <button key={f.value} onClick={() => setFilter(f.value)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all
              ${filter === f.value ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40' : 'btn-ghost py-1.5 px-4'}`}>
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center text-slate-500 py-16">Loading...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-slate-400 mb-4">No products yet</p>
          <Link to="/sell" className="btn-primary px-8 py-3">List something</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map(p => (
            <div key={p.id} className="card p-4 hover:border-blue-500/30 transition-all hover:-translate-y-1 cursor-pointer">
              <div className="aspect-square bg-white/5 rounded-lg mb-3 flex items-center justify-center text-4xl">
                📦
              </div>
              <div className="text-xs text-slate-500 mb-1">{p.condition?.replace('_',' ')}</div>
              <h3 className="text-sm font-semibold text-white truncate mb-1">{p.title}</h3>
              <div className="text-blue-400 font-bold">${p.price}</div>
              <div className="text-xs text-slate-500 mt-1">by {p.profiles?.username || 'Explorer'}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ====== SELL ======
export function Sell() {
  const { user } = useStore()
  const [form, setForm] = useState({ title:'', description:'', price:'', category:'Electronics', condition:'new' })
  const [loading, setLoading] = useState(false)

  if (!user) return (
    <div className="max-w-md mx-auto px-4 py-16 text-center">
      <div className="card p-8 border-blue-500/20">
        <h2 className="text-2xl font-bold text-white mb-3">Sign in to sell</h2>
        <p className="text-slate-400 mb-6">Create an account to list your items</p>
        <Link to="/register" className="btn-primary px-8 py-3">Join free</Link>
      </div>
    </div>
  )

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.from('products').insert({
      ...form, price: parseFloat(form.price), user_id: user.id
    })
    if (!error) { toast.success('Listed!'); setForm({ title:'', description:'', price:'', category:'Electronics', condition:'new' }) }
    else toast.error(error.message)
    setLoading(false)
  }

  const CATS = ['Electronics','Clothing','Books','Games','Sport','Home','Other']
  const CONDS = [['new','New'],['like_new','Like new'],['good','Good'],['fair','Fair']]

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <h1 className="text-3xl font-black text-white mb-8" style={{fontFamily:'Space Grotesk,sans-serif'}}>List an item</h1>
      <div className="card p-6 border-blue-500/20">
        <form onSubmit={submit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Title</label>
            <input className="input-cosmos" placeholder="What are you selling?" value={form.title}
              onChange={e=>setForm({...form,title:e.target.value})} required />
          </div>
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Description</label>
            <textarea className="input-cosmos resize-none" rows={3} placeholder="Describe your item..."
              value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Price ($)</label>
              <input type="number" className="input-cosmos" placeholder="0.00" value={form.price}
                onChange={e=>setForm({...form,price:e.target.value})} required min="0" step="0.01" />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Condition</label>
              <select className="input-cosmos" value={form.condition} onChange={e=>setForm({...form,condition:e.target.value})}>
                {CONDS.map(([v,l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Category</label>
            <select className="input-cosmos" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>
              {CATS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <button type="submit" disabled={loading} className="btn-primary py-3 mt-2">
            {loading ? 'Listing...' : 'List item'}
          </button>
        </form>
      </div>
    </div>
  )
}

// ====== CHAT ======
export function Chat() {
  const { user, profile } = useStore()
  const [messages, setMessages] = useState([])
  const [msg, setMsg] = useState('')

  const COSMO_REPLIES = [
    "Greetings, explorer! How can I assist your cosmic journey? 🚀",
    "I can help you find the best deals across the marketplace!",
    "Looking for something specific? Tell me and I'll search the cosmos.",
    "COSMEX has thousands of items from verified sellers. What interests you?",
    "Pro tip: Check the Deals section for flash sales updated daily! 🔥",
  ]

  const sendMessage = () => {
    if (!msg.trim()) return
    const userMsg = { id: Date.now(), text: msg, from: 'user', time: new Date() }
    setMessages(prev => [...prev, userMsg])
    setMsg('')
    setTimeout(() => {
      const reply = COSMO_REPLIES[Math.floor(Math.random() * COSMO_REPLIES.length)]
      setMessages(prev => [...prev, { id: Date.now()+1, text: reply, from: 'cosmo', time: new Date() }])
    }, 800)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 h-[80vh] flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-lg">🤖</div>
        <div>
          <div className="font-bold text-white">COSMO AI</div>
          <div className="text-xs text-green-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-400"></span> Online</div>
        </div>
      </div>

      <div className="flex-1 card p-4 overflow-y-auto mb-4 border-blue-500/15 flex flex-col gap-3">
        {messages.length === 0 && (
          <div className="text-center text-slate-500 py-8">
            <div className="text-4xl mb-3">🤖</div>
            <p>COSMO is ready to help! Ask anything about COSMEX.</p>
          </div>
        )}
        {messages.map(m => (
          <div key={m.id} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs px-4 py-2.5 rounded-2xl text-sm ${
              m.from === 'user'
                ? 'bg-blue-500/30 text-white border border-blue-500/30'
                : 'bg-white/5 text-slate-300 border border-white/10'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <input value={msg} onChange={e=>setMsg(e.target.value)}
          onKeyDown={e=>e.key==='Enter'&&sendMessage()}
          className="input-cosmos flex-1" placeholder="Ask COSMO anything..." />
        <button onClick={sendMessage} className="btn-primary px-6">Send</button>
      </div>
    </div>
  )
}

// ====== USED ITEMS ======
export function Used() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-black text-white mb-2" style={{fontFamily:'Space Grotesk,sans-serif'}}>Used Items</h1>
      <p className="text-slate-400 mb-8">Pre-loved gear at great prices</p>
      <Market />
    </div>
  )
}

// ====== NEW ITEMS ======
export function NewItems() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-black text-white mb-2" style={{fontFamily:'Space Grotesk,sans-serif'}}>New Arrivals</h1>
      <p className="text-slate-400 mb-8">Fresh listings from verified sellers</p>
      <Market />
    </div>
  )
}

// ====== DEALS ======
export function Deals() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-4xl">🔥</span>
        <div>
          <h1 className="text-3xl font-black text-white" style={{fontFamily:'Space Grotesk,sans-serif'}}>Hot Deals</h1>
          <p className="text-slate-400">Flash sales and limited-time offers</p>
        </div>
      </div>
      <div className="card p-12 text-center border-orange-500/20">
        <div className="text-5xl mb-4">🚀</div>
        <h2 className="text-xl font-bold text-white mb-2">Deals launching soon</h2>
        <p className="text-slate-400">Be the first to know when flash sales go live.</p>
        <button className="btn-primary mt-6 px-8 py-3">Notify me</button>
      </div>
    </div>
  )
}
