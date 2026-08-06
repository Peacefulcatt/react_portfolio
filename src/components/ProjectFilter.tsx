import { useMemo, useState } from 'react';
import type { Project } from '../data/projects';

type Props = {
  projects: Project[];
};

export default function ProjectFilter({ projects }: Props) {
  const [filter, setFilter] = useState('all');

  const tags = useMemo(
    () => ['all', ...new Set(projects.flatMap((project) => project.tags))],
    [projects],
  );

  const filtered = useMemo(
    () =>
      filter === 'all'
        ? projects
        : projects.filter((project) => project.tags.includes(filter)),
    [filter, projects],
  );

  return (
    <div className="project-filter">
      <div className="filters" role="tablist" aria-label="Filter projects by technology">
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            role="tab"
            aria-selected={filter === tag}
            className={filter === tag ? 'active' : undefined}
            onClick={() => setFilter(tag)}
          >
            {tag === 'all' ? 'All' : tag}
          </button>
        ))}
      </div>

      <div className="grid">
        {filtered.map((project) => (
          <article key={project.id} className="project">
            <div className="media">
              <img src={project.image} alt="" loading="lazy" />
              <div className="links">
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  Code
                </a>
                {project.demo !== '#' && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer">
                    Live
                  </a>
                )}
              </div>
            </div>
            <div className="body">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <style>{`
        .project-filter {
          display: grid;
          gap: 2rem;
        }

        .filters {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }

        .filters button {
          border: 1px solid var(--line);
          background: rgba(255, 255, 255, 0.65);
          color: var(--ink-soft);
          border-radius: 0.35rem;
          padding: 0.45rem 0.8rem;
          cursor: pointer;
          font-weight: 500;
        }

        .filters button.active,
        .filters button:hover {
          background: var(--ink);
          border-color: var(--ink);
          color: white;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
          gap: 1.5rem;
        }

        .project {
          overflow: hidden;
          border: 1px solid var(--line);
          border-radius: var(--radius);
          background: rgba(255, 255, 255, 0.72);
        }

        .media {
          position: relative;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          background: #d7e2ea;
        }

        .media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 400ms ease;
        }

        .project:hover .media img {
          transform: scale(1.04);
        }

        .links {
          position: absolute;
          inset: auto 0.75rem 0.75rem auto;
          display: flex;
          gap: 0.5rem;
        }

        .links a {
          text-decoration: none;
          background: rgba(14, 28, 47, 0.88);
          color: white;
          padding: 0.35rem 0.65rem;
          border-radius: 0.3rem;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .body {
          padding: 1.15rem 1.2rem 1.35rem;
        }

        .body h3 {
          font-size: 1.25rem;
          margin-bottom: 0.45rem;
        }

        .body p {
          color: var(--ink-soft);
          margin-bottom: 0.9rem;
        }

        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }
      `}</style>
    </div>
  );
}
