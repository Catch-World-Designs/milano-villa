import { useEffect } from "react";
import { usePath } from "@/lib/router";
import { projects } from "@/data/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Atelier from "@/pages/Atelier";
import DisciplinesPage from "@/pages/DisciplinesPage";
import Commissions from "@/pages/Commissions";
import CommissionDetail from "@/pages/CommissionDetail";
import Realization from "@/pages/Realization";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";

function Router({ path }: { path: string }) {
  if (path === "/") return <Home />;
  if (path === "/atelier") return <Atelier />;
  if (path === "/disciplines") return <DisciplinesPage />;
  if (path.startsWith("/disciplines/")) {
    return <DisciplinesPage focusId={path.replace("/disciplines/", "")} />;
  }
  if (path === "/commissions") return <Commissions />;
  if (path.startsWith("/commissions/")) {
    return <CommissionDetail slug={path.replace("/commissions/", "")} />;
  }
  if (path === "/realization") return <Realization />;
  if (path === "/contact") return <Contact />;
  return <NotFound />;
}

const titles: Record<string, string> = {
  "/": "Milano Villa — Italian Design & Furnishings | Washington, DC",
  "/atelier": "The Atelier — Milano Villa",
  "/disciplines": "Disciplines — Milano Villa",
  "/commissions": "Commissions — Milano Villa",
  "/realization": "The Realization Steps — Milano Villa",
  "/contact": "Private Consultation — Milano Villa",
};

export default function App() {
  const path = usePath();

  useEffect(() => {
    const commission = projects.find(
      (project) => path === `/commissions/${project.slug}`
    );
    document.title = commission
      ? `${commission.title} — Milano Villa`
      : titles[path] ?? "Commissions — Milano Villa";
  }, [path]);

  return (
    <div className="min-h-screen bg-ivory">
      <a
        href="#main"
        onClick={(event) => {
          event.preventDefault();
          const main = document.getElementById("main");
          main?.focus();
          main?.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
        className="sr-only z-[100] bg-ink px-5 py-3 font-label text-xs tracking-widest text-ivory focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Header path={path} />
      <main id="main" key={path} tabIndex={-1} className="page-enter outline-none">
        <Router path={path} />
      </main>
      <Footer />
    </div>
  );
}
