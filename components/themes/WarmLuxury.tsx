import type { Portfolio } from '@/lib/types';

export default function WarmLuxury({ portfolio }: { portfolio: Portfolio }) {
  return (
    <div className="min-h-screen bg-espresso text-cream">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <section className="text-center mb-16">
          <h1 className="font-playfair text-5xl md:text-6xl mb-4">{portfolio.name}</h1>
          <p className="text-2xl text-gold mb-6">{portfolio.title}</p>
          {portfolio.location && <p className="text-parchment mb-6">{portfolio.location}</p>}
          {portfolio.bio && (
            <p className="text-parchment max-w-2xl mx-auto leading-relaxed whitespace-pre-wrap">
              {portfolio.bio}
            </p>
          )}

          <div className="flex items-center justify-center gap-4 mt-8 flex-wrap">
            {portfolio.github && (
              <a
                href={portfolio.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:text-goldHover transition-colors"
              >
                GitHub
              </a>
            )}
            {portfolio.linkedin && (
              <a
                href={portfolio.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:text-goldHover transition-colors"
              >
                LinkedIn
              </a>
            )}
            {portfolio.website && (
              <a
                href={portfolio.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:text-goldHover transition-colors"
              >
                Website
              </a>
            )}
            {portfolio.email && (
              <a
                href={`mailto:${portfolio.email}`}
                className="text-gold hover:text-goldHover transition-colors"
              >
                Email
              </a>
            )}
          </div>
        </section>

        {portfolio.skills && portfolio.skills.length > 0 && (
          <section className="mb-16">
            <h2 className="font-playfair text-3xl mb-6 text-center">Skills</h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {portfolio.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-white/5 border border-gold/20 rounded-full text-gold"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {portfolio.projects && portfolio.projects.length > 0 && (
          <section className="mb-16">
            <h2 className="font-playfair text-3xl mb-8 text-center">Projects</h2>
            <div className="grid gap-8">
              {portfolio.projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white/3 backdrop-blur-glass border border-gold/12 rounded-card p-6 hover:border-gold/20 transition-all"
                >
                  <h3 className="font-playfair text-2xl mb-3">{project.title}</h3>
                  <p className="text-parchment mb-4 leading-relaxed">{project.description}</p>
                  {project.tech && project.tech.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gold/10 text-gold text-sm rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gold hover:text-goldHover transition-colors"
                      >
                        Live Demo →
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gold hover:text-goldHover transition-colors"
                      >
                        GitHub →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="text-center">
          <h2 className="font-playfair text-3xl mb-6">Get in Touch</h2>
          {portfolio.email && (
            <a
              href={`mailto:${portfolio.email}`}
              className="inline-block px-8 py-3 bg-gold text-espresso font-semibold rounded-button hover:bg-goldHover transition-all hover:scale-105"
            >
              Send me an email
            </a>
          )}
        </section>

        <div className="text-center mt-16 pt-8 border-t border-gold/10">
          <a
            href="/"
            className="text-parchment text-sm hover:text-gold transition-colors"
          >
            Made with Foliyo
          </a>
        </div>
      </div>
    </div>
  );
}
