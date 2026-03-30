import {
  FiCode,
  FiCpu,
  FiDatabase,
  FiTool,
} from 'react-icons/fi';

const skillCategories = [
  {
    title: 'Languages & Frontend',
    icon: <FiCode />,
    className: 'cat-languages',
    skills: ['Python', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'React'],
  },
  {
    title: 'AI & Automation',
    icon: <FiCpu />,
    className: 'cat-ai',
    skills: ['n8n', 'HuggingFace', 'OpenAI API', 'LangChain', 'AI Agents', 'Prompt Engineering'],
  },
  {
    title: 'Backend & Database',
    icon: <FiDatabase />,
    className: 'cat-backend',
    skills: ['Django', 'REST APIs', 'PostgreSQL', 'Supabase', 'Node.js', 'SQLite'],
  },
  {
    title: 'Tools & DevOps',
    icon: <FiTool />,
    className: 'cat-tools',
    skills: ['Git & GitHub', 'Vite', 'VS Code', 'Vercel', 'npm', 'Linux'],
  },
];

const Skills = () => {
  return (
    <section className="section skills" id="skills">
      <div className="container">
        <div className="reveal">
          <h2 className="section-title">Skills & Tech Stack</h2>
          <p className="section-subtitle">
            Technologies I use to bring ideas to life
          </p>
        </div>

        <div className="skills-grid">
          {skillCategories.map((category, idx) => (
            <div
              className={`skill-category ${category.className} reveal`}
              key={idx}
              style={{ transitionDelay: `${idx * 0.1}s` }}
            >
              <h3 className="skill-category-title">
                <span className="skill-category-icon">{category.icon}</span>
                {category.title}
              </h3>
              <div className="skill-tags">
                {category.skills.map((skill) => (
                  <span className="skill-tag" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
