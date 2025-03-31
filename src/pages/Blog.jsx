import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaCalendarAlt, FaTags } from 'react-icons/fa';
import BlogPost from './BlogPost';
import './Blog.css';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');

  // Sample blog data
  const blogPosts = [
    {
      id: 1,
      title: "My Journey into AI Development",
      excerpt: "How I transitioned from web development to specializing in AI solutions...",
      date: "2023-05-15",
      tags: ["AI", "Career"],
      slug: "ai-journey",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Building Scalable React Applications",
      excerpt: "Best practices I've learned for creating maintainable React projects...",
      date: "2023-04-02",
      tags: ["React", "Frontend"],
      slug: "react-scalability",
      readTime: "8 min read"
    },
    {
      id: 3,
      title: "Why I Love Teaching Programming",
      excerpt: "Sharing knowledge has made me a better developer - here's why...",
      date: "2023-03-18",
      tags: ["Teaching", "Career"],
      slug: "teaching-programming",
      readTime: "4 min read"
    }
  ];

  // Get all unique tags
  const allTags = ['all', ...new Set(blogPosts.flatMap(post => post.tags))];

  // Filter posts based on search and tag selection
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === 'all' || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <motion.div 
      className="blog-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="blog-container">
        <motion.h2
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
        >
          My Blog
        </motion.h2>
        
        <motion.p
          className="blog-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Thoughts, tutorials, and experiences from my development journey
        </motion.p>
        
        <motion.div 
          className="blog-controls"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="tag-filter">
            <FaTags className="filter-icon" />
            <select 
              value={selectedTag} 
              onChange={(e) => setSelectedTag(e.target.value)}
              className="tag-select"
            >
              {allTags.map(tag => (
                <option key={tag} value={tag}>
                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </motion.div>
        
        <motion.div 
          className="blog-posts"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <BlogPost 
                key={post.id}
                post={post}
                index={index}
              />
            ))
          ) : (
            <div className="no-results">
              <h3>No articles found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Blog;