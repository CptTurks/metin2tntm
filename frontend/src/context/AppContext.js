import React, { createContext, useContext, useEffect, useState } from 'react';
import { SERVERS, ADMIN_BANNERS, ANNOUNCEMENT_SEED, TAXONOMY_SEED } from '../mock/mock';

const AppContext = createContext(null);
export const useApp = () => useContext(AppContext);

const LS_SERVERS = 'tm2_servers';
const LS_USER = 'tm2_user';
const LS_USERS = 'tm2_users';
const LS_VOTES = 'tm2_votes';
const LS_BANNERS = 'tm2_banners';
const LS_ANNOUNCE = 'tm2_announce';
const LS_TAXONOMY = 'tm2_taxonomy';

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}

// Eski localStorage kayıtlarında eksik alanları tamamla
const normalizeServer = (s) => ({
  hidden: false,
  vipTier: s.vip ? 'red' : 'none',
  vipUntil: '',
  featured: !!s.vip,
  online: typeof s.online === 'number' ? s.online : Math.floor(40 + Math.random() * 400),
  featuredSystem: [],
  taxTags: [],
  ...s,
  comments: (s.comments || []).map((c) => ({ hidden: false, ...c })),
});

export function AppProvider({ children }) {
  const [servers, setServers] = useState(() => load(LS_SERVERS, SERVERS).map(normalizeServer));
  const [user, setUser] = useState(() => load(LS_USER, null));
  const [users, setUsers] = useState(() => load(LS_USERS, [
    { username: 'mert', email: 'mert@topmetin2pvp.com', password: '123456', rank: 'Yönetici', registerDate: '2025-11-30', isAdmin: true },
  ]));
  const [votes, setVotes] = useState(() => load(LS_VOTES, {}));
  const [banners, setBanners] = useState(() => load(LS_BANNERS, ADMIN_BANNERS));
  const [announcement, setAnnouncementState] = useState(() => load(LS_ANNOUNCE, ANNOUNCEMENT_SEED));
  const [taxonomy, setTaxonomy] = useState(() => load(LS_TAXONOMY, TAXONOMY_SEED));

  useEffect(() => localStorage.setItem(LS_SERVERS, JSON.stringify(servers)), [servers]);
  useEffect(() => localStorage.setItem(LS_USER, JSON.stringify(user)), [user]);
  useEffect(() => localStorage.setItem(LS_USERS, JSON.stringify(users)), [users]);
  useEffect(() => localStorage.setItem(LS_VOTES, JSON.stringify(votes)), [votes]);
  useEffect(() => localStorage.setItem(LS_BANNERS, JSON.stringify(banners)), [banners]);
  useEffect(() => localStorage.setItem(LS_ANNOUNCE, JSON.stringify(announcement)), [announcement]);
  useEffect(() => localStorage.setItem(LS_TAXONOMY, JSON.stringify(taxonomy)), [taxonomy]);

  // ---- Public / oy & tıklama ----
  const voteServer = (id) => {
    if (votes[id]) return { ok: false, msg: 'Bu server için zaten oy kullandınız.' };
    setServers((prev) => prev.map((s) => (s.id === id ? { ...s, likes: s.likes + 1 } : s)));
    setVotes((prev) => ({ ...prev, [id]: true }));
    return { ok: true, msg: 'Oyunuz kaydedildi! Teşekkürler.' };
  };

  const trackClick = (id, type) => {
    setServers((prev) => prev.map((s) => {
      if (s.id !== id) return s;
      return type === 'web' ? { ...s, webClicks: s.webClicks + 1 } : { ...s, discordClicks: s.discordClicks + 1 };
    }));
  };

  const addComment = (id, text, rating) => {
    if (!user) return { ok: false, msg: 'Yorum yapmak için giriş yapmalısınız.' };
    setServers((prev) => prev.map((s) => {
      if (s.id !== id) return s;
      const comment = { id: Date.now(), user: user.username, rating, text, date: new Date().toISOString().slice(0, 10), hidden: false };
      return { ...s, comments: [comment, ...s.comments] };
    }));
    return { ok: true, msg: 'Yorumunuz eklendi.' };
  };

  const addServer = (data) => {
    const id = Math.max(0, ...servers.map((s) => s.id)) + 1;
    const newServer = {
      id, likes: 0, webClicks: 0, discordClicks: 0, comments: [],
      hidden: false, vipTier: 'none', vipUntil: '', featured: false,
      online: Math.floor(20 + Math.random() * 300), taxTags: [],
      owner: user ? user.username : 'misafir',
      createdAt: new Date().toISOString().slice(0, 10),
      ...data,
    };
    setServers((prev) => [newServer, ...prev]);
    return id;
  };

  const deleteServer = (id) => setServers((prev) => prev.filter((s) => s.id !== id));

  // ---- Admin: server yönetimi ----
  const toggleServerHidden = (id) => setServers((prev) => prev.map((s) => (s.id === id ? { ...s, hidden: !s.hidden } : s)));
  const setServerVip = (id, tier, until) => setServers((prev) => prev.map((s) => (s.id === id ? { ...s, vipTier: tier, vipUntil: until ?? s.vipUntil } : s)));
  const toggleServerFeatured = (id) => setServers((prev) => prev.map((s) => (s.id === id ? { ...s, featured: !s.featured } : s)));
  const updateServerFeaturedSystem = (id, arr) => setServers((prev) => prev.map((s) => (s.id === id ? { ...s, featuredSystem: arr } : s)));

  // ---- Yorum yönetimi ----
  const deleteComment = (serverId, commentId) => setServers((prev) => prev.map((s) => (
    s.id === serverId ? { ...s, comments: s.comments.filter((c) => c.id !== commentId) } : s
  )));
  const toggleCommentHidden = (serverId, commentId) => setServers((prev) => prev.map((s) => (
    s.id === serverId ? { ...s, comments: s.comments.map((c) => (c.id === commentId ? { ...c, hidden: !c.hidden } : c)) } : s
  )));

  // ---- Banner yönetimi ----
  const addBanner = (data) => setBanners((prev) => [{ id: Math.max(0, ...prev.map((b) => b.id)) + 1, clicks: 0, impressions: 0, active: true, ...data }, ...prev]);
  const updateBanner = (id, patch) => setBanners((prev) => prev.map((b) => (b.id === id ? { ...b, ...patch } : b)));
  const deleteBanner = (id) => setBanners((prev) => prev.filter((b) => b.id !== id));
  const toggleBanner = (id) => setBanners((prev) => prev.map((b) => (b.id === id ? { ...b, active: !b.active } : b)));
  const trackBannerClick = (id) => setBanners((prev) => prev.map((b) => (b.id === id ? { ...b, clicks: b.clicks + 1 } : b)));
  const trackBannerImpression = (id) => setBanners((prev) => prev.map((b) => (b.id === id ? { ...b, impressions: b.impressions + 1 } : b)));

  // ---- Duyuru ----
  const setAnnouncement = (patch) => setAnnouncementState((prev) => ({ ...prev, ...patch }));

  // ---- Taksonomi (özellik yönetimi) ----
  const addTaxGroup = (name) => setTaxonomy((prev) => [...prev, { id: Date.now(), name, tags: [] }]);
  const deleteTaxGroup = (gid) => setTaxonomy((prev) => prev.filter((g) => g.id !== gid));
  const addTaxTag = (gid, name) => setTaxonomy((prev) => prev.map((g) => (g.id === gid ? { ...g, tags: [...g.tags, { id: Date.now(), name }] } : g)));
  const deleteTaxTag = (gid, tid) => setTaxonomy((prev) => prev.map((g) => (g.id === gid ? { ...g, tags: g.tags.filter((t) => t.id !== tid) } : g)));

  // ---- Üye yönetimi ----
  const updateUserRole = (username, isAdmin) => setUsers((prev) => prev.map((u) => (
    u.username === username ? { ...u, isAdmin, rank: isAdmin ? 'Yönetici' : 'Üye' } : u
  )));
  const resetUserPassword = (username, newPass) => setUsers((prev) => prev.map((u) => (
    u.username === username ? { ...u, password: newPass } : u
  )));

  const login = (username, password) => {
    const found = users.find((u) => (u.username === username || u.email === username) && u.password === password);
    if (found) { setUser(found); return { ok: true }; }
    return { ok: false, msg: 'Kullanıcı adı veya şifre hatalı.' };
  };

  const register = (username, email, password) => {
    if (users.some((u) => u.username === username)) return { ok: false, msg: 'Bu kullanıcı adı alınmış.' };
    if (users.some((u) => u.email === email)) return { ok: false, msg: 'Bu e-posta kayıtlı.' };
    const newUser = { username, email, password, rank: 'Üye', registerDate: new Date().toISOString().slice(0, 10), isAdmin: false };
    setUsers((prev) => [...prev, newUser]);
    setUser(newUser);
    return { ok: true };
  };

  const logout = () => setUser(null);

  const value = {
    servers, user, users, votes, banners, announcement, taxonomy,
    voteServer, trackClick, addComment, addServer, deleteServer, login, register, logout,
    toggleServerHidden, setServerVip, toggleServerFeatured, updateServerFeaturedSystem,
    deleteComment, toggleCommentHidden,
    addBanner, updateBanner, deleteBanner, toggleBanner, trackBannerClick, trackBannerImpression,
    setAnnouncement,
    addTaxGroup, deleteTaxGroup, addTaxTag, deleteTaxTag,
    updateUserRole, resetUserPassword,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
