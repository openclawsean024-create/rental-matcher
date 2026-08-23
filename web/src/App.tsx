import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ListingsPage from './pages/ListingsPage'
import ComparePage from './pages/ComparePage'
import ViewingsPage from './pages/ViewingsPage'
import FavoritesPage from './pages/FavoritesPage'
import MessagesPage from './pages/MessagesPage'
import './lib/bootstrap'
export default function App() {
  return <Layout>
    <Routes>
      <Route path="/" element={<ListingsPage />} />
      <Route path="/compare" element={<ComparePage />} />
      <Route path="/viewings" element={<ViewingsPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="/messages" element={<MessagesPage />} />
    </Routes>
  </Layout>
}
