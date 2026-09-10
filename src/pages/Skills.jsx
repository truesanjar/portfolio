import React, { useEffect, useRef, useState } from "react";
import { useApp } from "../contexts/AppContext";
import { SKILL_GROUPS } from "../data/skills";

// Функсия барои муайян кардани матни сифат аз рӯи фоиз
const getSkillLabel = (level, lang) => {
  const labels = {
    tj: {
      excellent: "Хеле хуб",
      good: "Хуб",
      average: "Миёна",
      low: "Кам",
    },
    ru: {
      excellent: "Отлично",
      good: "Хорошо",
      average: "Средне",
      low: "Слабо",
    },
    en: {
      excellent: "Excellent",
      good: "Good",
      average: "Average",
      low: "Low",
    },
  };

  const l = labels[lang] || labels.en;

  if (level >= 80) return l.excellent;
  if (level >= 60) return l.good;
  if (level >= 40) return l.average;
  return l.low;
};

const SkillBar = ({ name, level, lang }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{name}</span>
        <span className="mono text-xs text-muted-foreground">
          {getSkillLabel(level, lang)}
        </span>
      </div>
      <div className="skill-track">
        <div
          className="skill-fill"
          style={{
            width: visible ? `${level}%` : 0,
            transition: "width 1.2s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      </div>
    </div>
  );
};

const SkillsPage = () => {
  const { t, lang } = useApp();
  const s = t.skills;

  return (
    <div className="page-shell fade-up" data-testid="skills-page">
      <span className="section-eyebrow">{s.eyebrow}</span>
      <h1 className="section-title">{s.title}</h1>
      <p className="text-muted-foreground text-base md:text-lg max-w-xl mb-10">
        {s.subtitle}
      </p>

      <div className="space-y-10">
        {SKILL_GROUPS.map((group) => (
          <section
            key={group.id}
            data-testid={`skill-group-${group.id}`}
            className="card-soft p-6"
          >
            <h2 className="text-lg md:text-xl font-bold mb-5 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-accent rounded-full" />
              {group.title[lang]}
            </h2>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
              {group.items.map((item) => (
                <SkillBar
                  key={item.name}
                  name={item.name}
                  level={item.level}
                  lang={lang}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default SkillsPage;
