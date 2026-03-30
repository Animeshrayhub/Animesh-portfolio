import { FiCpu, FiCode, FiZap } from 'react-icons/fi';

const About = () => {
  return (
    <section className="section about" id="about">
      <div className="container">
        <div className="reveal">
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            Turning ideas into intelligent, automated solutions
          </p>
        </div>

        <div className="about-grid">
          <div className="about-text reveal">
            <p>
              I'm <strong>Animesh Ray</strong>, a passionate developer focused on the
              intersection of <strong>Artificial Intelligence</strong> and{' '}
              <strong>software automation</strong>. I specialize in building intelligent
              workflows, scalable web applications, and AI-powered systems that solve
              real-world problems.
            </p>
            <p>
              From crafting end-to-end automation pipelines with <strong>n8n</strong> to
              developing full-stack applications with <strong>Django</strong> and{' '}
              <strong>React</strong>, I'm constantly pushing the boundaries of what's
              possible with modern technology. I believe in learning by building — every
              project is a stepping stone toward mastery.
            </p>
            <p>
              Currently, I'm deep into <strong>AI automation</strong>, exploring HuggingFace
              models, building intelligent agents, and creating tools that make workflows
              smarter and faster.
            </p>

            <div className="about-stats">
              <div className="stat-card">
                <div className="stat-number">10+</div>
                <div className="stat-label">Projects</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">5+</div>
                <div className="stat-label">Technologies</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">∞</div>
                <div className="stat-label">Curiosity</div>
              </div>
            </div>
          </div>

          <div className="about-highlights reveal">
            <div className="highlight-card">
              <div className="highlight-icon cyan">
                <FiCpu />
              </div>
              <div>
                <h4>AI & Machine Learning</h4>
                <p>Building with HuggingFace, OpenAI, and custom ML pipelines to create intelligent solutions</p>
              </div>
            </div>

            <div className="highlight-card">
              <div className="highlight-icon purple">
                <FiZap />
              </div>
              <div>
                <h4>Workflow Automation</h4>
                <p>Designing n8n workflows that automate complex business processes end-to-end</p>
              </div>
            </div>

            <div className="highlight-card">
              <div className="highlight-icon pink">
                <FiCode />
              </div>
              <div>
                <h4>Full-Stack Development</h4>
                <p>Building scalable web apps with Python, Django, React, and modern JavaScript</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
