import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Landing from './pages/Landing'
import { Feed, Market, Sell, Chat, Used, NewItems, Deals } from './pages/Pages'
import { Login, Register } from './pages/auth/Auth'
import useStore from './store/useStore'

export default function App() {
  const { init } = useStore()
  useEffect(() => { init() }, [])

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/market" element={<Market />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/used" element={<Used />} />
        <Route path="/new" element={<NewItems />} />
        <Route path="/deals" element={<Deals />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Layout>
  )
}
