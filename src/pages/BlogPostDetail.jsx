import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FaArrowLeft, FaCalendarAlt, FaClock } from 'react-icons/fa';
import './Blog.css';

const BlogPostDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    // In a real app, you would fetch this from an API
    const fakePost = {
      id: 1,
      title: "My Journey into AI Development",
      date: "2023-05-15",
      tags: ["AI", "Career"],
      readTime: "5 min read",
      slug: "ai-journey"
    };

    setPost(fakePost);
    
    // Load markdown content
    const fakeMarkdown = `
# My Journey into AI Development

![AI Brain](https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80)

Two years ago, I made the decision to pivot my career from traditional web development to specializing in artificial intelligence. This is my story.

## The Turning Point

In early 2021, I was working as a full-stack developer when I had an opportunity to collaborate on a healthcare project that used machine learning to analyze medical images. The potential to create solutions that could literally save lives was incredibly motivating.

## Challenges Faced

1. **Steep Learning Curve**: Moving from JavaScript to Python and understanding complex mathematical concepts
2. **Hardware Limitations**: Training models requires significant computational power
3. **Keeping Up**: The AI field evolves at an incredible pace

## Key Lessons Learned

- Start with practical projects rather than just theory
- The AI community is incredibly supportive - don't hesitate to ask for help
- Specializing in a niche (like healthcare AI) can be more valuable than being a generalist

## Where I'm Headed

I'm currently working on:

\`\`\`python
def predict_diagnosis(input_data):
    # My current project code
    model = load_ai_model()
    return model.predict(input_data)
\`\`\`

The future of AI is exciting, and I'm grateful to be part of this journey!
    `;

    setMarkdown(fakeMarkdown);
  }, [slug]);

  if (!post) return <div className="loading">Loading...</div>;

  return (
    <div className="post-detail">
      <div className="post-header">
        <a href="/blog" className="back-button">
          <FaArrowLeft /> Back to Blog
        </a>
        <h1>{post.title}</h1>
        
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
      
      <div className="post-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {markdown}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default BlogPostDetail;