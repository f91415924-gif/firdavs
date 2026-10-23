import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { CustomerChat } from './components/chat/CustomerChat';
import { AdminPanel } from './components/admin/AdminPanel';
import { DocsModal } from './components/admin/DocsModal';
import { AuthModal } from './components/auth/AuthModal';
import { IndustryModal } from './components/admin/IndustryModal';
import { motion, AnimatePresence } from 'motion/react';

const AppContent: React.FC = () => {
  const { activeTab, isAuthModalOpen, setIsAuthModalOpen } = useApp();
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const [isIndustryModalOpen, setIsIndustryModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-black antialiased transition-colors dark:bg-black dark:text-white flex flex-col">
      {/* Top Navbar */}
      <Navbar
        onOpenDocs={() => setIsDocsOpen(true)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenIndustry={() => setIsIndustryModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden">
        <AnimatePresence mode="wait">
          {activeTab === 'chat' ? (
            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              <CustomerChat />
            </motion.div>
          ) : (
            <motion.div
              key="admin"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              <AdminPanel />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Identity & Role Selector Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      {/* Industry / Network Selector Modal */}
      <IndustryModal
        isOpen={isIndustryModalOpen}
        onClose={() => setIsIndustryModalOpen(false)}
      />

      {/* Architecture & Documentation Modal */}
      <DocsModal isOpen={isDocsOpen} onClose={() => setIsDocsOpen(false)} />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
