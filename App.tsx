
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeesSection from './components/FeesSection';
import WhyUsSection from './components/WhyUsSection';
import ContactSection from './components/ContactSection';
import ChatBot from './components/ChatBot';
import Footer from './components/Footer';

// مكون فرعي للتعامل مع معلمات الرابط
const ChatManager: React.FC<{ isOpen: boolean; onClose: () => void; onOpen: () => void }> = ({ isOpen, onClose, onOpen }) => {
  const location = useLocation();

  useEffect(() => {
    // إذا كان الرابط ينتهي بـ /chat أو يحتوي على ?chat=true افتح الدردشة
    if (location.pathname === '/chat' || location.search.includes('chat=true')) {
      onOpen();
    }
  }, [location, onOpen]);

  return isOpen ? <ChatBot onClose={onClose} /> : null;
};

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar onOpenChat={() => setIsChatOpen(true)} />
        
        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <div id="why-us">
                  <WhyUsSection />
                </div>
                <div id="fees">
                  <FeesSection />
                </div>
                <div id="contact">
                  <ContactSection />
                </div>
              </>
            } />
            {/* مسار وهمي لدعم رابط الدردشة المباشر */}
            <Route path="/chat" element={
               <>
                <Hero />
                <WhyUsSection />
                <FeesSection />
                <ContactSection />
              </>
            } />
          </Routes>
        </main>

        <Footer />
        
        <ChatManager 
          isOpen={isChatOpen} 
          onOpen={() => setIsChatOpen(true)} 
          onClose={() => setIsChatOpen(false)} 
        />
      </div>
    </Router>
  );
};

export default App;
