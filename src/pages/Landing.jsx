import { Link } from 'react-router-dom'
import Astronaut from '../components/space/Astronaut'

const STATS = [
  { value: '12K+', label: 'Explorers' },
  { value: '48K+', label: 'Products' },
  { value: '9', label: 'Languages' },
  { value: '4.9★', label: 'Rating' },
]

const FEATURES = [
  { icon: '🌌', title: 'Live Feed', desc: 'Share discoveries, reviews and unboxings with the community.' },
  { icon: '🛒', title: 'Marketplace', desc: 'Buy and sell new and used goods in a trusted space.' },
  { icon: '🤖', title: 'AI Assistant', desc: 'COSMO helps you find the best deals and answers questions.' },
  { icon: '💬', title: 'Real-time Chat', desc: 'Message sellers and buyers instantly.' },
  { icon: '🔥', title: 'Hot Deals', desc: 'Flash sales and limited-time offers from verified sellers.' },
  { icon: '🌍', title: 'Global Reach', desc: 'Ship across 50+ countries with trusted logistics.' },
]

export default function Landing() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <section className="min-h-screen flex items-center px-4">
        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center py-20">
          {/* Left */}
          <div className="animate-fadeUp">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-blue-300 mb-6 border border-blue-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
              Live — 12,400 explorers online
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6" style={{fontFamily:'Space Grotesk,sans-serif'}}>
              <span className="gradient-text">Trade beyond</span>
              <br />
              <span className="text-white">the stars</span>
            </h1>

            <p className="text-lg text-slate-400 mb-10 leading-relaxed max-w-lg">
              COSMEX is the social marketplace where explorers buy, sell and connect.
              New gear, used finds, real community.
            </p>

            <div className="flex flex-wrap gap-4 mb-14">
              <Link to="/register" className="btn-primary text-base px-8 py-3">
                Launch free →
              </Link>
              <Link to="/market" className="btn-ghost text-base px-8 py-3">
                Explore market
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
              {STATS.map(s => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-black gradient-text">{s.value}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Astronaut */}
          <div className="flex items-center justify-center relative">
            {/* Glow rings */}
            <div className="absolute w-64 h-64 rounded-full border border-blue-500/10 animate-pulse"></div>
            <div className="absolute w-80 h-80 rounded-full border border-purple-500/8"></div>
            <div className="absolute w-96 h-96 rounded-full border border-blue-500/5"></div>

            <Astronaut className="relative z-10 w-72 h-72" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black gradient-text mb-4" style={{fontFamily:'Space Grotesk,sans-serif'}}>
              Everything in one orbit
            </h2>
            <p className="text-slate-400 text-lg">Built for buyers, sellers and explorers</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {FEATURES.map(f => (
              <div key={f.title} className="card p-6 hover:border-blue-500/30 transition-all hover:-translate-y-1 group">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-bold text-white text-lg mb-2 group-hover:gradient-text transition-all">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="card p-12 border-blue-500/20">
            <h2 className="text-4xl font-black text-white mb-4" style={{fontFamily:'Space Grotesk,sans-serif'}}>
              Ready for launch?
            </h2>
            <p className="text-slate-400 mb-8">Join thousands of explorers trading across the cosmos.</p>
            <Link to="/register" className="btn-primary text-lg px-10 py-4">
              Create free account →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
