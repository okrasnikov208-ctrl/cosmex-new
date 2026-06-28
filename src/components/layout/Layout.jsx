import Navbar from './Navbar'
import StarField from '../space/StarField'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen relative">
      <StarField />
      <Navbar />
      <main className="relative z-10 pt-14 min-h-screen">
        {children}
      </main>
    </div>
  )
}
