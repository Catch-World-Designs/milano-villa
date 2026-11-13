import { useEffect } from "react";
import { usePath } from "@/lib/router";
import { disciplines } from "@/data/site";
import { getRouteMetadata } from "@/data/routes";
import { applyDocumentMetadata } from "@/lib/metadata";
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
    const focusId = path.replace("/disciplines/", "");
    return disciplines.some((discipline) => discipline.id === focusId) ? (
      <DisciplinesPage focusId={focusId} />
    ) : (
      <NotFound />
    );
  }
  if (path === "/commissions") return <Commissions />;
  if (path.startsWith("/commissions/")) {
    return <CommissionDetail slug={path.replace("/commissions/", "")} />;
  }
  if (path === "/realization") return <Realization />;
  if (path === "/contact") return <Contact />;
  return <NotFound />;
}

export default function App({ initialPath = "/" }: { initialPath?: string }) {
  const path = usePath(initialPath);
  const metadata = getRouteMetadata(path);

  useEffect(() => {
    const siteUrl = import.meta.env.VITE_SITE_URL || window.location.origin;
    applyDocumentMetadata(metadata, siteUrl);
  }, [metadata]);

  return (
    <div className="min-h-screen bg-ivory">
      <button
        type="button"
        onClick={(event) => {
          event.preventDefault();
          const main = document.getElementById("main");
          main?.focus();
          main?.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
        className="sr-only z-[100] bg-ink px-5 py-3 font-label text-xs tracking-widest text-ivory focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </button>
      <Header path={path} />
      <main id="main" key={path} tabIndex={-1} className="page-enter outline-none">
        <Router path={path} />
      </main>
      <Footer />
    </div>
  );
}
