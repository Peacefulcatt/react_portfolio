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
            placeholder="Search"
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
              <div className="meta">
                <time dateTime={post.date}>{post.dateLabel}</time>
                <span>{post.readTime}</span>
              </div>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
            </a>
          ))}
        </div>
      ) : (
        <div className="empty">
          <p>No articles found.</p>
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
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--line);
        }

        .search input,
        .select select {
          width: 100%;
          border: 0;
          border-bottom: 1px solid var(--line);
          border-radius: 0;
          background: transparent;
          padding: 0.65rem 0;
          color: var(--ink);
        }

        .search input:focus,
        .select select:focus {
          outline: none;
          border-bottom-color: var(--ink);
        }

        .list {
          display: grid;
          gap: 0;
        }

        .post {
          display: block;
          text-decoration: none;
          padding: 1.5rem 0;
          border-bottom: 1px solid var(--line);
          transition: opacity 180ms ease;
        }

        .post:hover {
          opacity: 0.7;
          color: inherit;
        }

        .post h3 {
          font-size: 1.35rem;
          margin: 0 0 0.45rem;
        }

        .post p {
          color: var(--muted);
          margin: 0;
        }

        .meta {
          display: flex;
          gap: 1rem;
          color: var(--muted);
          font-size: 0.88rem;
          margin-bottom: 0.55rem;
        }

        .empty {
          padding: 2rem 0;
          color: var(--muted);
        }

        .empty p {
          margin: 0;
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
