import React from "react";
import { useApp } from "../contexts/AppContext";
import { LANGUAGES } from "../i18n";
import { SOCIAL_LINKS } from "../data/profile";
import {
  Sun,
  Moon,
  Languages,
  Info,
  ExternalLink,
  Heart,
  Globe,
  Github,
  Linkedin,
  Facebook,
  Send,
  AtSign,
  Instagram,
  Youtube,
  Rocket,
  BriefcaseBusiness,
  MessageSquareCode,
  Orbit,
  MessageSquare,
  MessageCircle
} from "lucide-react";

const ICONS = { Github, Linkedin, Facebook, Send, AtSign, Instagram, Youtube, Rocket, BriefcaseBusiness, MessageSquareCode, Orbit, MessageSquare, MessageCircle };

const SettingsPage = () => {
  const { t, lang, setLang, theme, setTheme } = useApp();
  const s = t.settings;

  return (
    <div className="page-shell fade-up" data-testid="settings-page">
      <span className="section-eyebrow">{s.eyebrow}</span>
      <h1 className="section-title">{s.title}</h1>
      <p className="text-muted-foreground text-base md:text-lg max-w-xl mb-10">
        {s.subtitle}
      </p>

      {/* Language */}
      <section className="card-soft p-6 mb-5" data-testid="settings-language">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Languages className="w-5 h-5 text-accent" />
          {s.language}
        </h2>
        <div className="flex flex-wrap gap-2">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              data-testid={`lang-btn-${l.code}`}
              onClick={() => setLang(l.code)}
              className={`px-4 py-2.5 rounded-full text-sm font-medium border transition-all ${
                lang === l.code
                  ? "bg-foreground text-background border-foreground"
                  : "bg-background text-foreground border-border hover:border-accent"
              }`}
            >
              <span className="mono text-xs mr-2 opacity-70">{l.short}</span>
              {l.label}
            </button>
          ))}
        </div>
      </section>

      {/* Theme */}
      <section className="card-soft p-6 mb-5" data-testid="settings-theme">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          {theme === "dark" ? (
            <Moon className="w-5 h-5 text-accent" />
          ) : (
            <Sun className="w-5 h-5 text-accent" />
          )}
          {s.theme}
        </h2>
        <div className="flex flex-wrap gap-2">
          <button
            data-testid="theme-btn-light"
            onClick={() => setTheme("light")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium border transition-all ${
              theme === "light"
                ? "bg-foreground text-background border-foreground"
                : "bg-background text-foreground border-border hover:border-accent"
            }`}
          >
            <Sun className="w-4 h-4" />
            {s.light}
          </button>
          <button
            data-testid="theme-btn-dark"
            onClick={() => setTheme("dark")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium border transition-all ${
              theme === "dark"
                ? "bg-foreground text-background border-foreground"
                : "bg-background text-foreground border-border hover:border-accent"
            }`}
          >
            <Moon className="w-4 h-4" />
            {s.dark}
          </button>
        </div>
      </section>

      {/* About */}
      <section className="card-soft p-6 mb-5" data-testid="settings-about">
        <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
          <Info className="w-5 h-5 text-accent" />
          {s.about}
        </h2>
        <p className="text-muted-foreground leading-relaxed">{s.aboutText}</p>
      </section>

      {/* Support / Subscribe */}
      <section className="card-soft p-6" data-testid="settings-support">
        <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
          <Heart className="w-5 h-5 text-accent" />
          {s.support}
        </h2>
        <p className="text-muted-foreground mb-5">{s.supportText}</p>
        <div className="space-y-2.5">
          {SOCIAL_LINKS.map((social) => {
            const isAnyVoice = social.id === "anyvoice";
            const isMessenger0 = social.id === "messenger0";
            const Icon = ICONS[social.icon] || Globe;

            return (
              <div
                key={social.id}
                data-testid={`social-link-${social.id}`}
                className="card-soft group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-3 px-4 py-3.5 hover:translate-y-[-2px] transition-transform"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span
                    className="flex items-center justify-center w-10 h-10 rounded-lg shrink-0 overflow-hidden transition-colors"
                    style={{ backgroundColor: `${social.color}18`, color: social.color }}
                  >
                    {isAnyVoice ? (
                      <img
                        src="/anyvoice.png"
                        alt="AnyVoice"
                        className="w-10 h-10 object-contain"
                      />
                    ) : isMessenger0 ? (
                      <img
                        src="/messenger0.png"
                        alt="Messenger0"
                        className="w-10 h-10 object-contain"
                      />
                    ) : (
                      <Icon className="w-5 h-5"/>
                    )}
                  </span>

                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold truncate">{social.name}</div>
                    <div className="text-xs text-muted-foreground truncate mono">
                      {social.handle}
                    </div>
                  </div>
                </div>

                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`subscribe-${social.id}`}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full bg-accent text-accent-foreground text-xs font-bold hover:opacity-90 transition-opacity whitespace-nowrap w-full sm:w-auto"
                >
                  {s.subscribe}
                  <ExternalLink className="w-3 h-3 flex-shrink-0" />
                </a>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default SettingsPage;