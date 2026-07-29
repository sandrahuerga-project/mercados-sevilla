import { CustomCursor } from './shell/CustomCursor';
import { Hero } from './shell/Hero';
import { Problem, Solution } from './shell/ProblemSolution';
import { Evidence } from './shell/Evidence';
import { FlowExplorer } from './shell/FlowExplorer';
import { Context, Footer } from './shell/Context';

export default function App() {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <CustomCursor />
      <Hero />
      <main>
        <Problem />
        <Evidence />
        <Solution />
        <FlowExplorer />
        <Context />
      </main>
      <Footer />
    </div>
  );
}
