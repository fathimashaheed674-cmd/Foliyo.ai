import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-espresso flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="font-playfair text-6xl text-cream mb-4">404</h1>
        <p className="text-parchment text-xl mb-8">Portfolio not found</p>
        <Link
          href="/"
          className="inline-block px-8 py-3 bg-gold text-espresso font-semibold rounded-button hover:bg-goldHover transition-all"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
