import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Upload from './pages/Upload';
import Resources from './pages/Resources';
import Chat from './pages/Chat';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;