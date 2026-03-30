import { FiArrowRight } from 'react-icons/fi';

const blogPosts = [
  {
    title: 'How I Automate Everything with n8n',
    excerpt:
      'A deep dive into my automation workflows — from lead generation to content scheduling. Learn how n8n transformed my productivity.',
    category: 'Automation',
    date: 'Mar 2026',
    readTime: '5 min read',
  },
  {
    title: 'Building an AI Chatbot with HuggingFace',
    excerpt:
      "Step-by-step guide on building a conversational chatbot using open-source models. Covering model selection, prompt engineering, and deployment.",
    category: 'AI',
    date: 'Feb 2026',
    readTime: '8 min read',
  },
  {
    title: 'Why Every Developer Should Learn Automation',
    excerpt:
      'Automation isn\'t just for DevOps. Here\'s why learning automation tools like n8n, Zapier, and AI agents can 10x your development workflow.',
    category: 'Insights',
    date: 'Jan 2026',
    readTime: '4 min read',
  },
];

const Blog = () => {
  return (
    <section className="section blog" id="blog">
      <div className="container">
        <div className="reveal">
          <h2 className="section-title">Blog & Insights</h2>
          <p className="section-subtitle">
            Thoughts on AI, automation, and building in public
          </p>
        </div>

        <div className="blog-grid">
          {blogPosts.map((post, idx) => (
            <article
              className="blog-card reveal"
              key={idx}
              style={{ transitionDelay: `${idx * 0.1}s` }}
            >
              <div className="blog-meta">
                <span className="blog-category">{post.category}</span>
                <span>{post.date}</span>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>

              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>

              <span className="blog-read-more">
                Read More <FiArrowRight />
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
