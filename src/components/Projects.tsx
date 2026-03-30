import { FiExternalLink, FiGithub } from 'react-icons/fi';

const projects = [
  {
    title: 'ChessHub Academy',
    description:
      'A full-featured online chess learning platform with role-based authentication, interactive lessons, and a premium UI. Built for coaches and students to collaborate seamlessly.',
    techStack: ['React', 'TypeScript', 'Supabase', 'Vite', 'CSS'],
    image: '/chess-project.png',
    liveUrl: 'https://chesshubacademy.online',
    githubUrl: 'https://github.com/Animeshrayhub',
    badge: 'live',
  },
  {
    title: 'AI Automation Workflows',
    description:
      'End-to-end automation pipelines built with n8n — from data scraping and API integrations to AI-powered content generation and smart notifications.',
    techStack: ['n8n', 'REST APIs', 'OpenAI', 'Webhooks', 'JSON'],
    image: '/automation-project.png',
    githubUrl: 'https://github.com/Animeshrayhub',
    badge: 'live',
  },
  {
    title: 'AI Chatbot System',
    description:
      'Intelligent conversational AI chatbot powered by HuggingFace models and custom prompts. Designed for integration into web apps and support workflows.',
    techStack: ['Python', 'HuggingFace', 'LangChain', 'FastAPI'],
    image: '/ai-chatbot.png',
    githubUrl: 'https://github.com/Animeshrayhub',
    badge: 'wip',
  },
  {
    title: 'Portfolio System',
    description:
      'This very portfolio — a dark-themed, futuristic personal website with GSAP animations, responsive design, and an AI chatbot placeholder ready for integration.',
    techStack: ['React', 'TypeScript', 'GSAP', 'Vite'],
    image: '/hero-bg.png',
    githubUrl: 'https://github.com/Animeshrayhub',
    badge: 'live',
  },
];

const Projects = () => {
  return (
    <section className="section projects" id="projects">
      <div className="container">
        <div className="reveal">
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            Real-world applications I've designed, built, and deployed
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project, idx) => (
            <article
              className="project-card reveal"
              key={idx}
              style={{ transitionDelay: `${idx * 0.15}s` }}
            >
              <div className="project-image-wrapper">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                  loading="lazy"
                />
                <div className="project-image-overlay" />
                <span className={`project-badge ${project.badge}`}>
                  {project.badge === 'live' ? '● Live' : '◎ In Progress'}
                </span>
              </div>

              <div className="project-info">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                <div className="project-tech-stack">
                  {project.techStack.map((tech) => (
                    <span className="tech-tag" key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="project-links">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      <FiExternalLink /> Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      <FiGithub /> Source
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
