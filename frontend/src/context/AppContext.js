import React, { createContext, useContext, useEffect, useState } from 'react';
import { SERVERS, MOCK_USER } from '../mock/mock';

const AppContext = createContext(null);
export const useApp = () => useContext(AppContext);

const LS_SERVERS = 'tm2_servers';
const LS_USER = 'tm2_user';
const LS_USERS = 'tm2_users';
const LS_VOTES = 'tm2_votes';

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}

export function AppProvider({ children }) {
  const [servers, setServers] = useState(() => load(LS_SERVERS, SERVERS));
  const [user, setUser] = useState(() => load(LS_USER, null));
  const [users, setUsers] = useState(() => load(LS_USERS, [
    { username: 'mert', email: 'mert@topmetin2pvp.com', password: '123456', rank: 'Yönetici', registerDate: '2025-11-30', isAdmin: true },
  ]));
  const [votes, setVotes] = useState(() => load(LS_VOTES, {}));

  useEffect(() => localStorage.setItem(LS_SERVERS, JSON.stringify(servers)), [servers]);
  useEffect(() => localStorage.setItem(LS_USER, JSON.stringify(user)), [user]);
  useEffect(() => localStorage.setItem(LS_USERS, JSON.stringify(users)), [users]);
  useEffect(() => localStorage.setItem(LS_VOTES, JSON.stringify(votes)), [votes]);

  // Registration-free voting: tracked per-browser via localStorage
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
      const comment = { id: Date.now(), user: user.username, rating, text, date: new Date().toISOString().slice(0, 10) };
      return { ...s, comments: [comment, ...s.comments] };
    }));
    return { ok: true, msg: 'Yorumunuz eklendi.' };
  };

  const addServer = (data) => {
    const id = Math.max(0, ...servers.map((s) => s.id)) + 1;
    const newServer = {
      id, likes: 0, webClicks: 0, discordClicks: 0, comments: [],
      owner: user ? user.username : 'misafir',
      createdAt: new Date().toISOString().slice(0, 10),
      ...data,
    };
    setServers((prev) => [newServer, ...prev]);
    return id;
  };

  const deleteServer = (id) => setServers((prev) => prev.filter((s) => s.id !== id));

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

  const value = { servers, user, users, votes, voteServer, trackClick, addComment, addServer, deleteServer, login, register, logout };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
