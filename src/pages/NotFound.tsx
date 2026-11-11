import { Link } from "@/lib/router";
import { LogoMark } from "@/components/Logo";
import { ArrowLink } from "@/components/primitives";

export default function NotFound() {
  return (
    <section className="wrap flex min-h-[80vh] flex-col items-center justify-center py-32 text-center">
      <LogoMark className="h-20 w-20 opacity-70" />
      <p className="label mt-8 text-gold">404 · Page not found</p>
      <h1 className="display mt-5 max-w-xl text-[2.8rem] leading-[1.02] sm:text-[3.6rem]">
        This room is not on the plan.
      </h1>
      <p className="body-copy mt-5 max-w-sm">
        The page you are looking for has been moved, or was never drawn. The
        atelier is still here.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
        <Link to="/" className="btn">
          Return to the house
        </Link>
        <ArrowLink to="/contact">Contact the concierge</ArrowLink>
      </div>
    </section>
  );
}
