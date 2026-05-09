import React from "react";
import { NavLink } from "react-router-dom";
import { User, FolderKanban, BarChart3, MessageCircle, Settings } from "lucide-react";
import { useApp } from "../contexts/AppContext";

const items = [
  { to: "/", icon: User, key: "profile", end: true },
  { to: "/projects", icon: FolderKanban, key: "projects" },
  { to: "/skills", icon: BarChart3, key: "skills" },
  { to: "/tweets", icon: MessageCircle, key: "tweets" },
  { to: "/settings", icon: Settings, key: "settings" },
];

const Navigation = () => {
  const { t } = useApp();

  return (
    <>
      {/* Desktop top nav */}
      <nav
        data-testid="nav-desktop"
        className="hidden lg:flex fixed top-0 left-0 right-0 z-50 items-center justify-center px-6 py-4 backdrop-blur-xl bg-background/70 border-b border-border"
      >
        <div className="flex items-center gap-1 bg-card/80 border border-border rounded-full px-2 py-1.5 shadow-sm">
          {items.map(({ to, icon: Icon, key, end }) => (
            <NavLink
              key={key}
              to={to}
              end={end}
              data-testid={`nav-desktop-${key}`}
              className={({ isActive }) =>
                `group relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`
              }
              title={t.nav[key]}
            >
              <Icon className="w-4 h-4" strokeWidth={2} />
              <span className="hidden xl:inline">{t.nav[key]}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Mobile bottom nav */}
      <nav
        data-testid="nav-mobile"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/85 border-t border-border"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <div className="flex items-center justify-around px-2 py-2.5">
          {items.map(({ to, icon: Icon, key, end }) => (
            <NavLink
              key={key}
              to={to}
              end={end}
              data-testid={`nav-mobile-${key}`}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 min-w-[56px] px-2 py-1.5 rounded-xl transition-all ${
                  isActive
                    ? "text-accent bg-accent/10"
                    : "text-muted-foreground hover:text-foreground"
                }`
              }
              aria-label={t.nav[key]}
            >
              <Icon className="w-5 h-5" strokeWidth={2.2} />
              <span className="text-[10px] font-medium leading-none">{t.nav[key]}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navigation;
