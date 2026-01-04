import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-(--background)">
      <div className="text-center px-6">
        <h1 className="text-6xl font-bold text-(--text-primary) mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-(--text-secondary) mb-2">Page Not Found</h2>
        <p className="text-(--text-secondary) text-lg mb-8">
          Oops! Looks like you've wandered off the path. The page you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-3 bg-(--button-color) hover:bg-(--button-highlight) text-(--text-primary) font-semibold rounded-lg transition-colors"
        >
          Go to Site
        </Link>
      </div>
    </div>
  );
}
