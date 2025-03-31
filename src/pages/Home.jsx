import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import ParticlesBackground from '../components/ParticlesBackground/ParticlesBackground';
import ThemeToggle from '../components/ThemeToggle/ThemeToggle';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <ParticlesBackground />
      <ThemeToggle />
      
      <motion.main 
        className="main-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="centered-content">
          <motion.div
            className="hero-content"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="hero-title">
              Hi, I'm <span className="name-highlight">UMUT YILDIZ</span>
            </h1>
            <h2 className="hero-subtitle">Software Engineer</h2>

            <motion.p 
              className="hero-description"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Software Engineer exploring AI and IoT innovations in healthcare to create intelligent solutions.
            </motion.p>

            <motion.div
              className="cta-buttons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <a href="#contact" className="btn primary">Hire Me</a>
              <a href="#projects" className="btn secondary">View Work</a>
            </motion.div>

            <div className="social-links">
              <a href="https://github.com" aria-label="GitHub"><FaGithub /></a>
              <a href="https://linkedin.com" aria-label="LinkedIn"><FaLinkedin /></a>
              <a href="https://twitter.com" aria-label="Twitter"><FaTwitter /></a>
            </div>
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
};

export default Home;