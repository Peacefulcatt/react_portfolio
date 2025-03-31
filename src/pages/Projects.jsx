import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import './Projects.css';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  
  const projects = [
    {
      id: 1,
      title: "Healthcare AI Platform",
      description: "Developed an AI-powered diagnostic tool for medical professionals with 95% accuracy",
      tags: ["React", "Python", "TensorFlow"],
      github: "https://github.com/yourusername/healthcare-ai",
      demo: "https://demo.healthcare-ai.com",
      image: "/images/project1.jpg"
    },
    {
      id: 2,
      title: "E-Commerce Dashboard",
      description: "Built a real-time analytics dashboard for e-commerce businesses with data visualization",
      tags: ["React", "Node.js", "MongoDB"],
      github: "https://github.com/yourusername/ecommerce-dashboard",
      demo: "https://dashboard.example.com",
      image: "/images/project2.jpg"
    },
    {
      id: 3,
      title: "IoT Smart Home System",
      description: "Created a cross-platform mobile app to control IoT home automation devices",
      tags: ["React Native", "Firebase", "IoT"],
      github: "https://github.com/yourusername/smart-home",
      demo: "https://smarthome.demo.com",
      image: "/images/project3.jpg"
    },
    {
      id: 4,
      title: "Portfolio Website",
      description: "Designed and developed a responsive portfolio website with dark mode",
      tags: ["React", "CSS", "Framer Motion"],
      github: "https://github.com/yourusername/portfolio",
      demo: "https://yourportfolio.com",
      image: "/images/project4.jpg"
    }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.tags.includes(filter));

  const allTags = ['all', ...new Set(projects.flatMap(project => project.tags))];

  return (
    <motion.div 
      className="projects-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="projects-container">
        <motion.h2
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
        >
          My Projects
        </motion.h2>
        
        <motion.p
          className="projects-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Here are some of my recent projects. Each one was carefully crafted to solve specific problems.
        </motion.p>
        
        <motion.div 
          className="filter-buttons"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`filter-btn ${filter === tag ? 'active' : ''}`}
            >
              {tag.charAt(0).toUpperCase() + tag.slice(1)}
            </button>
          ))}
        </motion.div>
        
        <motion.div 
          className="projects-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      className="project-card"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        delay: 0.1 * index,
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ y: -5 }}
    >
      <div className="project-image-container">
        <img 
          src={project.image} 
          alt={project.title} 
          className="project-image"
        />
        <div className="project-links">
          {project.github && (
            <a 
              href={project.github} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
          )}
          {project.demo && (
            <a 
              href={project.demo} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Live Demo"
            >
              <FaExternalLinkAlt />
            </a>
          )}
        </div>
      </div>
      <div className="project-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-tags">
          {project.tags.map(tag => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;