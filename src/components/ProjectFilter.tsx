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

      <div className="list">
        {filtered.map((project) => (
          <article key={project.id} className="project">
            <div className="media">
              <img src={project.image} alt="" loading="lazy" />
            </div>
            <div className="body">
              <div className="top">
                <h3>{project.title}</h3>
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
              <p>{project.description}</p>
              <p className="tags">{project.tags.join(' · ')}</p>
            </div>
          </article>
        ))}
      </div>

      <style>{`
        .project-filter {
          display: grid;
          gap: 2.5rem;
        }

        .filters {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem 1rem;
          border-bottom: 1px solid var(--line);
          padding-bottom: 1rem;
        }

        .filters button {
          border: 0;
          background: transparent;
          color: var(--muted);
          padding: 0;
          cursor: pointer;
          font-weight: 500;
          font-size: 0.95rem;
        }

        .filters button.active,
        .filters button:hover {
          color: var(--ink);
        }

        .list {
          display: grid;
          gap: 0;
        }

        .project {
          display: grid;
          grid-template-columns: 12rem 1fr;
          gap: 1.75rem;
          padding: 1.75rem 0;
          border-top: 1px solid var(--line);
        }

        .project:last-child {
          border-bottom: 1px solid var(--line);
        }

        .media {
          aspect-ratio: 4 / 3;
          overflow: hidden;
          background: var(--bg-soft);
        }

        .media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(1);
          transition: filter 250ms ease;
        }

        .project:hover .media img {
          filter: grayscale(0.2);
        }

        .top {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          align-items: baseline;
          margin-bottom: 0.5rem;
        }

        .body h3 {
          font-size: 1.25rem;
          margin: 0;
        }

        .links {
          display: flex;
          gap: 0.9rem;
          flex-shrink: 0;
        }

        .links a {
          text-decoration: none;
          font-size: 0.9rem;
          color: var(--muted);
        }

        .body p {
          color: var(--muted);
          margin: 0 0 0.65rem;
        }

        .tags {
          font-size: 0.88rem;
        }

        @media (max-width: 700px) {
          .project {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .media {
            max-width: 16rem;
          }
        }
      `}</style>
    </div>
  );
}
