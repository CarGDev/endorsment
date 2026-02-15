import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Profile from './routes/Profile';
import CreateUser from './routes/CreateUser';
import PostDetail from './routes/PostDetail';
import Navbar from './components/Navbar';
import CreatePostModal from './components/CreatePostModal';
import MarkdownModal from './components/MarkdownModal';
import NotificationCenter from './components/NotificationCenter';
import useAppStore from './store/useAppStore';

const App: React.FC = () => {
  const seedData = useAppStore((s) => s.seedData);
  useEffect(() => {
    seedData();
  }, [seedData]);

  return (
    <div className="app">
      <div className="nav">
        <Navbar />
      </div>
      <NotificationCenter />
      <CreatePostModal />
      <MarkdownModal />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/post/:id" element={<PostDetail />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
