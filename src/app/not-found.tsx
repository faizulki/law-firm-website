import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-6 py-32 text-center">
      <div>
        <p className="eyebrow text-xs font-medium text-silver/80">Error 404</p>
        <h1 className="mt-4 font-serif text-5xl font-medium text-gradient-silver sm:text-6xl">
          Page not found
        </h1>
        <p className="mx-auto mt-5 max-w-md text-mute">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>
        <div className="mt-9 flex justify-center gap-3">
          <Button href="/">Return Home</Button>
          <Button href="/contact" variant="secondary">
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
}
