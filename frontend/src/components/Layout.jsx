import React from 'react';
import Header from './Header';
import Footer, { AdSlot } from './Footer';

export default function Layout({ children }) {
  return (
    <div className="App">
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
