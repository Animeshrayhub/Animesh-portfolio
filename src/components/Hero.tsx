import { useEffect, useState, lazy, Suspense } from 'react';
import { FiArrowDown, FiGithub, FiExternalLink } from 'react-icons/fi';

const CharacterScene = lazy(() => import('./Character/Scene'));

const typewriterTexts = [
  'AI Automation Developer',
  'Software Engineer',
  'n8n Workflow Builder',
  'Python & Django Developer',
];

const Hero = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [characterLoaded, setCharacterLoaded] = useState(false);

  useEffect(() => {
    const currentFullText = typewriterTexts[currentTextIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (displayText.length < currentFullText.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentFullText.slice(0, displayText.length + 1));
        }, 80);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 40);
      } else {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % typewriterTexts.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTextIndex]);

  useEffect(() => {
    const timer = setTimeout(() => setCharacterLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="hero">
      <img
        src="/hero-bg.png"
        alt="AI Neural Network Background"
        className="hero-bg-image"
        loading="eager"
      />
      <div className="hero-overlay" />

      <div className="hero-split">
        {/* Left: Text Content */}
        <div className="hero-text-side">
          <div className="hero-badge">
            <span className="pulse-dot" />
            Available for Projects
          </div>

          <p className="hero-greeting">// Hello World</p>

          <h1 className="hero-name">
            Hi, I'm<br />
            <span className="name-highlight">Animesh Ray</span>
          </h1>

          <p className="hero-tagline">
            I build <strong>{displayText}</strong>
            <span className="typewriter-cursor" />
            <br />
            Crafting intelligent systems, automation workflows, and scalable web applications
          </p>

          <div className="hero-cta-group">
            <a href="#projects" className="btn btn-primary">
              <FiExternalLink /> View Projects
            </a>
            <a
              href="https://github.com/Animeshrayhub"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              <FiGithub /> GitHub
            </a>
          </div>
        </div>

        {/* Right: 3D Character */}
        <div className="hero-character-side">
          {characterLoaded && (
            <Suspense fallback={
              <div className="character-loading">
                <div className="character-loading-spinner"></div>
                <p>Loading 3D Model...</p>
              </div>
            }>
              <CharacterScene />
            </Suspense>
          )}
        </div>
      </div>

      <div className="hero-scroll-indicator" onClick={scrollToAbout}>
        <span>Scroll</span>
        <div className="scroll-line" />
        <FiArrowDown />
      </div>
    </section>
  );
};

export default Hero;
