import {
  FiMail,
  FiMessageCircle,
  FiLinkedin,
  FiGithub,
} from 'react-icons/fi';

const Contact = () => {
  return (
    <section className="section contact" id="contact">
      <div className="container">
        <div className="contact-wrapper">
          <div className="reveal">
            <h2 className="section-title">Let's Connect</h2>
            <p className="section-subtitle" style={{ margin: '0 auto 3rem' }}>
              Got a project idea, collaboration opportunity, or just want to say hi?
              I'd love to hear from you.
            </p>
          </div>

          <div className="contact-methods reveal">
            <a
              href="mailto:royduguu786@gmail.com"
              className="contact-card"
              id="contact-email"
            >
              <div className="contact-icon email-icon">
                <FiMail />
              </div>
              <h4>Email</h4>
              <p>royduguu786@gmail.com</p>
            </a>

            <a
              href="https://wa.me/917008665245"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card"
              id="contact-whatsapp"
            >
              <div className="contact-icon whatsapp-icon">
                <FiMessageCircle />
              </div>
              <h4>WhatsApp</h4>
              <p>Message me directly</p>
            </a>

            <a
              href="https://www.linkedin.com/in/animeshray786/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card"
              id="contact-linkedin"
            >
              <div className="contact-icon linkedin-icon">
                <FiLinkedin />
              </div>
              <h4>LinkedIn</h4>
              <p>Let's connect</p>
            </a>
          </div>

          <div className="contact-social reveal">
            <a
              href="https://github.com/Animeshrayhub"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="GitHub"
            >
              <FiGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/animeshray786/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="LinkedIn"
            >
              <FiLinkedin />
            </a>
            <a
              href="mailto:royduguu786@gmail.com"
              className="social-link"
              aria-label="Email"
            >
              <FiMail />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
