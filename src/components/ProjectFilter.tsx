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
          padding: 1.75rem 0;
          border-top: 1px solid var(--line);
        }

        .project:last-child {
          border-bottom: 1px solid var(--line);
        }

        .top {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          align-items: baseline;
          margin-bottom: 0.5rem;
        }

        .project h3 {
          font-size: 1.3rem;
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

        .project p {
          color: var(--muted);
          margin: 0 0 0.65rem;
          max-width: 40rem;
        }

        .tags {
          font-size: 0.88rem;
          margin-bottom: 0 !important;
        }
      `}</style>
    </div>
  );
}
