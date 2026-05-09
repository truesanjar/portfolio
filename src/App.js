import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";
import Navigation from "@/components/Navigation";
import ProfilePage from "@/pages/Profile";
import ProjectsPage from "@/pages/Projects";
import SkillsPage from "@/pages/Skills";
import TweetsPage from "@/pages/Tweets";
import SettingsPage from "@/pages/Settings";

function App() {
  return (
    <AppProvider>
      <div className="App grain min-h-screen bg-background text-foreground">
        <BrowserRouter>
          <Navigation />
          <main className="relative z-[2]">
            <Routes>
              <Route path="/" element={<ProfilePage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/skills" element={<SkillsPage />} />
              <Route path="/tweets" element={<TweetsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<ProfilePage />} />
            </Routes>
          </main>
        </BrowserRouter>
      </div>
    </AppProvider>
  );
}

export default App;
