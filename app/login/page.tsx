'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden lg:flex lg:w-[55%] bg-espresso p-12 flex-col justify-center relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <path
              d="M100,200 L200,100 L300,200 L200,300 Z"
              fill="none"
              stroke="#C9963A"
              strokeWidth="2"
            />
            <circle cx="200" cy="200" r="80" fill="none" stroke="#C9963A" strokeWidth="1" />
          </svg>
        </div>

        <div className="relative z-10">
          <blockquote className="font-playfair text-4xl italic text-cream mb-12 leading-relaxed">
            The best time to build your portfolio was yesterday. The second best time is right now.
          </blockquote>

          <div className="space-y-6">
            {[
              { outcome: 'Got internship at Razorpay', name: 'Arjun M.', uni: 'IIT Bombay' },
              { outcome: 'Hired at startup in Bangalore', name: 'Priya S.', uni: 'VIT Vellore' },
              { outcome: 'Landed remote job in 3 weeks', name: 'Rohan K.', uni: 'SRM Chennai' },
            ].map((story, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-gold/10 rounded-lg p-4"
              >
                <p className="text-gold font-medium mb-1">{story.outcome}</p>
                <p className="text-parchment text-sm">
                  {story.name}, {story.uni}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full lg:w-[45%] bg-walnut p-8 md:p-12 flex items-center justify-center"
      >
        <div className="w-full max-w-md">
          <Link href="/" className="flex items-center gap-2 mb-8">
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

          <h1 className="font-playfair text-4xl text-cream mb-2">Welcome back.</h1>
          <p className="text-parchment text-sm mb-8">Continue building your future.</p>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-200 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-cream text-sm font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-espresso border border-gold/20 rounded-button text-cream placeholder-parchment/50 focus:border-gold focus:outline-none transition-colors"
                placeholder="arjun@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-cream text-sm font-medium mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-espresso border border-gold/20 rounded-button text-cream placeholder-parchment/50 focus:border-gold focus:outline-none transition-colors"
                placeholder="Your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3.5 bg-gold text-espresso font-semibold rounded-button hover:bg-goldHover transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-parchment text-sm">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-gold hover:text-goldHover transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
