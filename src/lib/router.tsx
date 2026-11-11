import { useCallback, useEffect, useState, type AnchorHTMLAttributes } from "react";

function readPath(): string {
  const raw = window.location.hash.replace(/^#/, "");
  if (!raw) return "/";
  return raw.startsWith("/") ? raw : `/${raw}`;
}

export function navigate(to: string) {
  const next = to.startsWith("/") ? to : `/${to}`;
  if (window.location.hash === `#${next}`) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  window.location.hash = next;
}

export function usePath() {
  const [path, setPath] = useState<string>(() =>
    typeof window === "undefined" ? "/" : readPath()
  );

  useEffect(() => {
    const onChange = () => setPath(readPath());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
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
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      navigate(to);
    },
    [onClick, to]
  );

  return (
    <a href={`#${to.startsWith("/") ? to : `/${to}`}`} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
