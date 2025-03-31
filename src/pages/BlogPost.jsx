import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import './Blog.css';

const BlogPost = ({ post, index }) => {
  return (
    <motion.article
      className="blog-post"
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
      <Link to={`/blog/${post.slug}`} className="post-link">
        <div className="post-content">
          <h3>{post.title}</h3>
          <p className="post-excerpt">{post.excerpt}</p>
          
          <div className="post-meta">
            <span className="meta-item">
              <FaCalendarAlt className="meta-icon" />
              {new Date(post.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
            
            <span className="meta-item">
              <FaClock className="meta-icon" />
              {post.readTime}
            </span>
          </div>
          
          <div className="post-tags">
            {post.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default BlogPost;