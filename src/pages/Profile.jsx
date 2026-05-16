import React from "react";
import {
  User,
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
  Mail,
  MapPin,
  Calendar,
  Heart,
  BookOpen,
  Code2,
  Globe,
  Sparkles,
  Briefcase,
  Flag,
  Orbit,
} from "lucide-react";
import { useApp } from "../contexts/AppContext";
import { PHOTO_URL, EMAIL, SOCIAL_LINKS } from "../data/profile";

const ICONS = { Github, Linkedin, Facebook, Send, AtSign, Instagram, Youtube, Rocket, BriefcaseBusiness, MessageSquareCode, Orbit };

const ProfilePage = () => {
  const { t } = useApp();
  const p = t.profile;

  const rows = [
    { icon: User, key: "fullName" },
    { icon: Calendar, key: "birth" },
    { icon: Sparkles, key: "age" },
    { icon: MapPin, key: "location" },
    { icon: Heart, key: "marital" },
    // { icon: BookOpen, key: "religion" },
    { icon: Briefcase, key: "profession" },
    { icon: Flag, key: "nationality" },
    { icon: Globe, key: "languages" },
    { icon: Code2, key: "hobby" },
    { icon: Sparkles, key: "philosophy" },
  ];

  return (
    <div className="page-shell fade-up" data-testid="profile-page">
      <div className="grid md:grid-cols-[280px_1fr] gap-6 md:gap-10 mb-12 items-start">
        <div className="avatar-frame max-w-[280px] mx-auto md:mx-0" data-testid="profile-avatar">
          <img src={PHOTO_URL} alt="Sanjar Asadzoda" loading="eager" />
        </div>
        <div className="flex flex-col justify-center">
          <span className="section-eyebrow">{p.eyebrow}</span>
          <h1 className="section-title" data-testid="profile-name">
            {p.title}
          </h1>
          <p className="text-accent text-sm md:text-base font-medium mt-1 mb-4 mono">
            {p.role}
          </p>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl">
            {p.bio.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${EMAIL}`}
              data-testid="profile-email-link"
              className="contact-email inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-foreground text-background text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-all"
            >
              <Mail className="w-4 h-4" />
              {EMAIL}
            </a>
          </div>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="w-1.5 h-5 bg-accent rounded-full" />
          {p.tableTitle}
        </h2>
        <div className="card-soft overflow-hidden" data-testid="profile-info-table">
          {rows.map(({ icon: Icon, key }) => (
            <div className="info-row" key={key}>
              <div className="label flex items-center gap-2">
                <Icon className="w-3.5 h-3.5 text-accent" strokeWidth={2.2} />
                {p.labels[key]}
              </div>
              <div className="value">{p.values[key]}</div>
            </div>
          ))}
          <div className="info-row">
            <div className="label flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-accent" strokeWidth={2.2} />
              {p.labels.email}
            </div>
            <div className="value">
              <a
                href={`mailto:${EMAIL}`}
                className="contact-email text-accent hover:underline"
              >
                {EMAIL}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="w-1.5 h-5 bg-accent rounded-full" />
          {p.contactTitle}
        </h2>
        <div className="grid sm:grid-cols-2 gap-3" data-testid="profile-socials">
          {SOCIAL_LINKS.map((s) => {
            const isAnyVoice = s.id === "anyvoice";
            const Icon = ICONS[s.icon] || Globe;

            return (
              <a
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`social-link-${s.id}`}
                className="card-soft group flex items-center gap-3 px-4 py-3.5 hover:translate-y-[-2px]"
              >
                <span
                  className="flex items-center justify-center w-10 h-10 rounded-lg shrink-0 overflow-hidden transition-colors"
                  style={{ backgroundColor: `${s.color}18`, color: s.color }}
                >
                  {isAnyVoice ? (
                    <img
                      src="/anyvoice.png"
                      alt="AnyVoice"
                      className="w-10 h-10 object-contain"
                    />
                  ) : (
                    <Icon className="w-5 h-5"/>
                  )}
                </span>

                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm">{s.name}</div>
                  <div className="text-xs text-muted-foreground truncate">
                    {s.handle}
                  </div>
                </div>

                <span className="text-xs text-muted-foreground group-hover:text-accent transition-colors">
                  →
                </span>
              </a>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
