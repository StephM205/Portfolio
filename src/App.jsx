import { useState, lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import "./App.css";

// Global Effects
import { CustomCursor } from "./component/effects/CustomCursor";
import { ScrollProgress } from "./component/effects/ScrollProgress";
import { GradientMesh } from "./component/effects/GradientMesh";
import { MouseSpotlight } from "./component/effects/MouseSpotlight";
import { LoadingScreen } from "./component/effects/LoadingScreen";

// Components
import { Navbar } from "./component/navbar";
import { Hero } from "./component/hero";
import { About } from "./component/about";
import { Experience } from "./component/experience";
import { Skills } from "./component/skills";
import { ArcSlider as Projects } from "./component/project"; // I'll refactor ArcSlider later
import { Contact } from "./component/contact";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen key="loading" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <CustomCursor />
      <ScrollProgress />
      <MouseSpotlight />
      <GradientMesh />

      {!isLoading && (
        <div className="relative z-10 w-full min-h-screen text-text selection:bg-primary/30 selection:text-white">
          <Navbar />
          
          <main className="flex flex-col gap-24 md:gap-32 pb-24">
            <Hero />
            <About />
            <Experience />
            <Skills />
            <Projects />
            <Contact />
          </main>
        </div>
      )}
    </>
  );
}

export default App;
