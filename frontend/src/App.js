import { useEffect } from 'react';
import './App.css';
import './styles/site.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import ServerDetail from './pages/ServerDetail';
import AddServer from './pages/AddServer';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import CategoryPage from './pages/CategoryPage';
import ReklamFiyatlari from './pages/ReklamFiyatlari';
import SearchPage from './pages/SearchPage';
import GmKodlari from './pages/GmKodlari';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import { Toaster } from './components/ui/sonner';

function App() {
  useEffect(() => { document.title = 'TopMetin2Pvp | Metin2 PvP Server Tanıtım Merkezi'; }, []);
  return (
    <AppProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/kategori/:slug" element={<CategoryPage />} />
            <Route path="/server/:id" element={<ServerDetail />} />
            <Route path="/sunucu-ekle" element={<AddServer />} />
            <Route path="/reklam-fiyatlari" element={<ReklamFiyatlari />} />
            <Route path="/ara" element={<SearchPage />} />
            <Route path="/gm-kodlari" element={<GmKodlari />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/profil" element={<Profile />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Layout>
        <Toaster position="bottom-center" theme="dark" richColors />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
