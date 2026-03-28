'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-espresso/85 backdrop-blur-glass border-b border-gold/10"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-espresso">
              <path
                fill="currentColor"
                d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"
              />
            </svg>
          </div>
          <span className="font-playfair text-xl text-cream">Foliyo</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-parchment hover:text-cream transition-colors">
            Features
          </Link>
          <Link href="#themes" className="text-parchment hover:text-cream transition-colors">
            Themes
          </Link>
          <Link href="#pricing" className="text-parchment hover:text-cream transition-colors">
            Pricing
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-cream hover:text-gold transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="px-6 py-2.5 bg-gold text-espresso font-medium rounded-button hover:bg-goldHover transition-all hover:scale-105"
          >
            Start free
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
