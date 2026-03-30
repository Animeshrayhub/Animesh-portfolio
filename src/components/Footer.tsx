const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <p>
          © {year} Animesh Ray. Built with <span className="heart">♥</span> using
          React & TypeScript
        </p>
      </div>
    </footer>
  );
};

export default Footer;
