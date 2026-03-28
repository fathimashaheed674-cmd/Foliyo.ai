import type { Portfolio } from '@/lib/types';

export default function ArcticMinimal({ portfolio }: { portfolio: Portfolio }) {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <section className="mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-3 tracking-tight">{portfolio.name}</h1>
          <p className="text-xl text-gray-600 mb-8">{portfolio.title}</p>
          {portfolio.bio && (
            <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">
              {portfolio.bio}
            </p>
          )}

          <div className="flex items-center gap-4 mt-6 flex-wrap">
            {portfolio.github && (
              <a
                href={portfolio.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black transition-colors font-medium"
              >
                GitHub
              </a>
            )}
            {portfolio.linkedin && (
              <a
                href={portfolio.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black transition-colors font-medium"
              >
                LinkedIn
              </a>
            )}
            {portfolio.website && (
              <a
                href={portfolio.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black transition-colors font-medium"
              >
                Website
              </a>
            )}
            {portfolio.email && (
              <a
                href={`mailto:${portfolio.email}`}
                className="text-gray-600 hover:text-black transition-colors font-medium"
              >
                Email
              </a>
            )}
          </div>
        </section>

        {portfolio.skills && portfolio.skills.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {portfolio.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {portfolio.projects && portfolio.projects.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Projects</h2>
            <div className="space-y-12">
              {portfolio.projects.map((project) => (
                <div key={project.id} className="border-l-2 border-gray-200 pl-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">{project.description}</p>
                  {project.tech && project.tech.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-4 text-sm">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black hover:underline font-medium"
                      >
                        View Live →
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black hover:underline font-medium"
                      >
                        View Code →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="text-center mt-16 pt-8 border-t border-gray-200">
          <a href="/" className="text-gray-500 text-sm hover:text-black transition-colors">
            Made with Foliyo
          </a>
        </div>
      </div>
    </div>
  );
}
