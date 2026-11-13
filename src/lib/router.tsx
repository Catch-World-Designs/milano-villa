import { useCallback, useEffect, useState, type AnchorHTMLAttributes } from "react";
import { normalizePath, stripBasePath, toBrowserPath } from "@/data/routes";

const NAVIGATION_EVENT = "milano:navigate";

function readPath(): string {
  return stripBasePath(window.location.pathname);
}

export function navigate(to: string) {
  const next = normalizePath(to);
  if (readPath() === next) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  window.history.pushState({}, "", toBrowserPath(next));
  window.dispatchEvent(new Event(NAVIGATION_EVENT));
  window.requestAnimationFrame(() => document.getElementById("main")?.focus());
}

export function usePath(initialPath = "/") {
  const [path, setPath] = useState<string>(() =>
    typeof window === "undefined" ? normalizePath(initialPath) : readPath()
  );

  useEffect(() => {
    const onChange = () => setPath(readPath());
    window.addEventListener("popstate", onChange);
    window.addEventListener(NAVIGATION_EVENT, onChange);
    return () => {
      window.removeEventListener("popstate", onChange);
      window.removeEventListener(NAVIGATION_EVENT, onChange);
    };
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scrolling is an intentional reaction to route changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [path]);

  return path;
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string;
  children: React.ReactNode;
};

export function Link({ to, children, onClick, ...rest }: LinkProps) {
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      onClick?.(event);
      if (event.defaultPrevented) return;
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        rest.target === "_blank"
      )
        return;
      event.preventDefault();
      navigate(to);
    },
    [onClick, rest.target, to]
  );

  return (
    <a href={toBrowserPath(to)} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
