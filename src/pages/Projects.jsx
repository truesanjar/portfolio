import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  ExternalLink,
  X,
  Calendar,
  Layers,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
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

  const handleOpenProject = (proj) => {
    setActive(proj);
  };

  // Modal Component
  const ProjectModal = ({ project, onClose }) => {
    const images =
      project.images && project.images.length > 0
        ? project.images
        : [project.cover];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }, []);

    useEffect(() => {
      setCurrentIndex(0);
    }, [project.id]);

    const goNext = () => {
      setCurrentIndex((i) => (i + 1) % images.length);
    };

    const goPrev = () => {
      setCurrentIndex((i) => (i - 1 + images.length) % images.length);
    };

    useEffect(() => {
      const handleKey = (e) => {
        if (e.key === "ArrowRight") goNext();
        if (e.key === "ArrowLeft") goPrev();
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKey);
      return () => window.removeEventListener("keydown", handleKey);
    }, [images.length]);

    // Функсияи оддӣ (на компонент), то ҳар рендер акс аз нав сохта нашавад
    const renderSlider = () => (
      <div className="relative w-full h-full flex items-center justify-center bg-black">
        <img
          src={images[currentIndex]}
          alt={`${project.title[lang]} - ${currentIndex + 1}`}
          className="w-full h-full object-contain transition-opacity duration-300"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/60 backdrop-blur border border-white/20 hover:bg-black/80 text-white transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/60 backdrop-blur border border-white/20 hover:bg-black/80 text-white transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur border border-white/20">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(i);
                  }}
                  aria-label={`Go to image ${i + 1}`}
                  className={`rounded-full transition-all ${
                    i === currentIndex
                      ? "w-5 h-1.5 bg-white"
                      : "w-1.5 h-1.5 bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>

            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur border border-white/20 text-white text-xs mono">
              {currentIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>
    );

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

          <div className="flex-1 min-h-0 overflow-y-auto md:overflow-hidden">
            {/* Mobile: акс баландии калон мегирад */}
            <div className="w-full bg-black md:hidden" style={{ height: "70vh" }}>
              {renderSlider()}
            </div>

            <div className="flex flex-col md:flex-row md:h-full">
              {/* Desktop: акс аз боло то поён */}
              <div className="hidden md:block md:w-1/2 h-full bg-black flex-shrink-0">
                {renderSlider()}
              </div>

              {/* Матн: худаш scroll мешавад */}
              <div className="w-full md:w-1/2 p-6 md:p-8 md:h-full md:overflow-y-auto">
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
            onClick={() => handleOpenProject(proj)}
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

      {mounted && active && (
        <ProjectModal project={active} onClose={() => setActive(null)} />
      )}
    </div>
  );
};

export default ProjectsPage;