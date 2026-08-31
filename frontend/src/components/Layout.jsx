import React from 'react';
import Header from './Header';
import Footer, { AdSlot } from './Footer';
import PopupAd from './PopupAd';
import { useApp } from '../context/AppContext';

export default function Layout({ children }) {
  const { announcement } = useApp();
  return (
    <div className="App">
      <PopupAd />
      {announcement?.active && announcement.text && (
        <div className="site-announce" data-testid="announce-bar"><span>{announcement.text}</span></div>
      )}
      <Header />
      <div className="page">
        <div className="content-grid">
          <AdSlot side="left" />
          <div className="main-col">{children}</div>
          <AdSlot side="right" />
        </div>
      </div>
      <Footer />
    </div>
  );
}
