import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatbotFab from './components/ChatbotFab';
import Particles from './components/Particles';
import { useScrollReveal } from './hooks/useScrollReveal';

const App = () => {
  useScrollReveal();

  return (
    <>
      {/* Background Effects */}
      <div className="bg-grid" />
      <Particles />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Blog />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Chatbot FAB — Future Integration */}
      <ChatbotFab />
    </>
  );
};

export default App;
