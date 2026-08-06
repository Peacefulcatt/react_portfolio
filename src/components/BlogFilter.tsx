import { useMemo, useState } from 'react';

export type BlogCard = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  dateLabel: string;
  tags: string[];
  readTime: string;
  href: string;
};

type Props = {
  posts: BlogCard[];
};

export default function BlogFilter({ posts }: Props) {
  const [search, setSearch] = useState('');
  const [tag, setTag] = useState('all');

  const tags = useMemo(
    () => ['all', ...new Set(posts.flatMap((post) => post.tags))],
    [posts],
  );

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query);
      const matchesTag = tag === 'all' || post.tags.includes(tag);
      return matchesSearch && matchesTag;
    });
  }, [posts, search, tag]);

  return (
    <div className="blog-filter">
      <div className="controls">
        <label className="search">
          <span className="sr-only">Search articles</span>
          <input
            type="search"
            placeholder="Search articles..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>
        <label className="select">
          <span className="sr-only">Filter by tag</span>
          <select value={tag} onChange={(event) => setTag(event.target.value)}>
            {tags.map((item) => (
              <option key={item} value={item}>
                {item === 'all' ? 'All topics' : item}
              </option>
            ))}
          </select>
        </label>
      </div>

      {filtered.length > 0 ? (
        <div className="list">
          {filtered.map((post) => (
            <a key={post.id} className="post" href={post.href}>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <div className="meta">
                <time dateTime={post.date}>{post.dateLabel}</time>
                <span>{post.readTime}</span>
              </div>
              <div className="tags">
                {post.tags.map((item) => (
                  <span key={item} className="tag">
                    {item}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className="empty">
          <h3>No articles found</h3>
          <p>Try adjusting your search or filter.</p>
        </div>
      )}

      <style>{`
        .blog-filter {
          display: grid;
          gap: 2rem;
        }

        .controls {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 0.75rem;
        }

        .search input,
        .select select {
          width: 100%;
          border: 1px solid var(--line);
          border-radius: 0.4rem;
          background: rgba(255, 255, 255, 0.75);
          padding: 0.75rem 0.9rem;
          color: var(--ink);
        }

        .list {
          display: grid;
          gap: 1rem;
        }

        .post {
          display: block;
          text-decoration: none;
          padding: 1.35rem 1.4rem;
          border: 1px solid var(--line);
          border-radius: var(--radius);
          background: rgba(255, 255, 255, 0.7);
          transition: transform 200ms ease, border-color 200ms ease;
        }

        .post:hover {
          transform: translateY(-3px);
          border-color: rgba(31, 122, 109, 0.45);
          color: inherit;
        }

        .post h3 {
          font-size: 1.4rem;
          margin-bottom: 0.45rem;
        }

        .post p {
          color: var(--ink-soft);
          margin-bottom: 0.85rem;
        }

        .meta {
          display: flex;
          gap: 1rem;
          color: var(--ink-soft);
          font-size: 0.9rem;
          margin-bottom: 0.8rem;
        }

        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .empty {
          padding: 2rem;
          border: 1px dashed var(--line);
          border-radius: var(--radius);
          text-align: center;
          color: var(--ink-soft);
        }

        @media (max-width: 640px) {
          .controls {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
