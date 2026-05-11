import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ExternalLink, X, Calendar, Layers, ArrowUpRight } from "lucide-react";
import { useApp } from "../contexts/AppContext";
import { PROJECTS } from "../data/projects";

const ProjectsPage = () => {
  const { t, lang } = useApp();
  const p = t.projects;
  const [active, setActive] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Modal Component бо Portal ва Layout Responsive
  const ProjectModal = ({ project, onClose }) => {
    useEffect(() => {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }, []);

    return createPortal(
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.95)",
          backdropFilter: "blur(8px)",
          margin: 0,
          padding: 0,
        }}
        onClick={onClose}
        data-testid="project-modal"
      >
        <div
          className="
            relative
            bg-card
            border
            border-border
            w-full
            h-full
            md:rounded-2xl
            overflow-hidden
            flex
            flex-col
          "
          style={{
            maxWidth: "1300px",
            maxHeight: "90vh",
            width: "100%",
            height: "100%",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            data-testid="project-modal-close"
            className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/60 backdrop-blur border border-white/20 hover:bg-black/80 text-white transition-all"
            aria-label={p.close}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Контейнери ягонаи скролшаванда */}
          <div className="flex-1 overflow-y-auto">
            {/* Тасвир дар боло барои mobile */}
            <div className="w-full bg-black flex items-center justify-center p-4 md:hidden">
              <div className="aspect-square w-full max-w-[500px] max-h-[500px]">
                <img
                  src={project.cover}
                  alt={project.title[lang]}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>

            {/* Layout барои desktop: flex-row */}
            <div className="flex flex-col md:flex-row items-stretch">
              {/* Самти чап (расм) барои desktop */}
              <div className="hidden md:flex w-full md:w-1/2 bg-black items-center justify-center flex-shrink-0 p-4">
                <div className="aspect-square w-full min-w-[280px] min-h-[280px] max-w-[700px] max-h-[700px]">
                  <img
                    src={project.cover}
                    alt={project.title[lang]}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              </div>

              {/* Самти рост (матн) */}
              <div className="w-full md:w-1/2 p-6 md:p-8">
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="text-xs mono font-semibold px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor: `${project.accent}20`,
                      color: project.accent,
                    }}
                  >
                    <Calendar className="w-3 h-3 inline mr-1" />
                    {project.year}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-1">
                  {project.title[lang]}
                </h2>
                <p className="text-accent mono text-sm mb-6">
                  {project.tagline[lang]}
                </p>

                <div className="space-y-5">
                  <div>
                    <div className="text-xs mono uppercase tracking-wider text-muted-foreground mb-1.5">
                      {p.why}
                    </div>
                    <p className="text-foreground leading-relaxed">
                      {project.why[lang]}
                    </p>
                  </div>
                  <div>
                    <div className="text-xs mono uppercase tracking-wider text-muted-foreground mb-1.5">
                      {p.what}
                    </div>
                    <p className="text-foreground leading-relaxed">
                      {project.what[lang]}
                    </p>
                  </div>
                  <div>
                    <div className="text-xs mono uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1.5">
                      <Layers className="w-3 h-3" />
                      {p.stack}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((s) => (
                        <span
                          key={s}
                          className="text-xs mono px-2.5 py-1 rounded-md bg-secondary"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {project.url && project.url !== "#" && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`project-modal-visit-${project.id}`}
                    className="mt-7 inline-flex items-center gap-2 px-5 py-3 bg-foreground text-background rounded-full font-medium hover:bg-accent hover:text-accent-foreground transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {p.visit}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <div className="page-shell fade-up" data-testid="projects-page">
      <span className="section-eyebrow">{p.eyebrow}</span>
      <h1 className="section-title">{p.title}</h1>
      <p className="text-muted-foreground text-base md:text-lg max-w-xl mb-8">
        {p.subtitle}
      </p>

      <div className="grid sm:grid-cols-2 gap-5">
        {PROJECTS.map((proj) => (
          <button
            key={proj.id}
            onClick={() => setActive(proj)}
            data-testid={`project-card-${proj.id}`}
            className="card-soft project-card text-left flex flex-col"
          >
            <div className="aspect-square overflow-hidden rounded-t-[var(--radius)] bg-secondary">
              <img
                src={proj.cover}
                alt={proj.title[lang]}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-center justify-between mb-2">
                <span
                  className="text-xs mono font-semibold px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: `${proj.accent}20`,
                    color: proj.accent,
                  }}
                >
                  {proj.year}
                </span>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-bold mb-1">{proj.title[lang]}</h3>
              <p className="text-sm text-muted-foreground flex-1">
                {proj.tagline[lang]}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {proj.stack.slice(0, 3).map((s) => (
                  <span
                    key={s}
                    className="text-[10px] mono px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground"
                  >
                    {s}
                  </span>
                ))}
                {proj.stack.length > 3 && (
                  <span className="text-[10px] mono px-2 py-0.5 rounded-md bg-secondary text-muted-foreground">
                    +{proj.stack.length - 3}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Modal бо Portal */}
      {mounted && active && (
        <ProjectModal project={active} onClose={() => setActive(null)} />
      )}
    </div>
  );
};

export default ProjectsPage;