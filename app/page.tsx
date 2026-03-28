'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { Sparkles, FileText, PenLine, FolderGit2, Target } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-espresso">
      <Navbar />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-6"
          >
            <div className="px-4 py-2 rounded-full border border-gold/30 bg-gold/5 text-gold text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Built for students, loved by recruiters
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-playfair text-5xl md:text-7xl text-cream mb-6 leading-tight"
          >
            Your projects deserve a portfolio that{' '}
            <span className="italic text-gold">gets you hired.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-parchment max-w-2xl mx-auto mb-8"
          >
            Paste your resume. Foliyo&apos;s AI turns it into a stunning portfolio in under 5
            minutes — no design skills, no coding.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link
              href="/signup"
              className="px-8 py-4 bg-gold text-espresso font-semibold rounded-button hover:bg-goldHover transition-all hover:scale-105 inline-flex items-center justify-center gap-2"
            >
              Build my portfolio →
            </Link>
            <button className="px-8 py-4 bg-transparent border border-gold text-cream font-semibold rounded-button hover:bg-gold/10 transition-all">
              See an example
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-3 text-parchment text-sm"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-gold to-goldHover border-2 border-espresso"
                />
              ))}
            </div>
            <span>2,400+ students already hired</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-16"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="max-w-3xl mx-auto bg-white/3 backdrop-blur-glass border border-gold/12 rounded-card p-8 shadow-[0_0_40px_rgba(201,150,58,0.08)]"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gold/20" />
                <div>
                  <div className="h-4 w-32 bg-cream/20 rounded mb-2" />
                  <div className="h-3 w-48 bg-cream/10 rounded" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-3 w-full bg-cream/10 rounded" />
                <div className="h-3 w-5/6 bg-cream/10 rounded" />
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="h-24 bg-cream/5 rounded-lg border border-gold/5" />
                <div className="h-24 bg-cream/5 rounded-lg border border-gold/5" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-warmDark">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-playfair text-4xl md:text-5xl text-cream text-center mb-16">
            Everything you need. Nothing you don&apos;t.
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: FileText,
                title: 'Resume to Portfolio',
                desc: 'Paste your resume, AI builds your entire site in minutes.',
              },
              {
                icon: PenLine,
                title: 'AI Bio Writer',
                desc: 'Answer 5 questions, get a bio that sounds like you.',
              },
              {
                icon: FolderGit2,
                title: 'Case Study Generator',
                desc: 'Turns college projects into professional descriptions.',
              },
              {
                icon: Target,
                title: 'Skills Gap Detector',
                desc: 'Matches your portfolio to any job description.',
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4, boxShadow: '0 0 60px rgba(201,150,58,0.12)' }}
                className="bg-white/3 backdrop-blur-glass border border-gold/12 rounded-card p-8 hover:border-gold/20 transition-all"
              >
                <feature.icon className="w-12 h-12 text-gold mb-4" />
                <h3 className="font-playfair text-2xl text-cream mb-3">{feature.title}</h3>
                <p className="text-parchment">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Themes Section */}
      <section id="themes" className="py-24 px-6 bg-espresso">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-playfair text-4xl md:text-5xl text-cream text-center mb-16">
            5 premium themes. All stunning.
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: 'Warm Luxury', bg: 'bg-gradient-to-br from-espresso to-walnut' },
              { name: 'Arctic Minimal', bg: 'bg-gradient-to-br from-slate-50 to-slate-200' },
              { name: 'Midnight Glass', bg: 'bg-gradient-to-br from-blue-950 to-blue-900' },
              { name: 'Forest Calm', bg: 'bg-gradient-to-br from-green-950 to-green-900' },
              { name: 'Blush Editorial', bg: 'bg-gradient-to-br from-pink-50 to-pink-100' },
            ].map((theme, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
              >
                <div className={`${theme.bg} h-48 rounded-card border border-gold/20`} />
                <p className="text-center text-cream mt-3 font-medium">{theme.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-warmDark">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Arjun Mehta',
                uni: 'IIT Bombay',
                quote: 'Got an internship at Razorpay within 2 weeks of publishing my Foliyo.',
              },
              {
                name: 'Priya Sharma',
                uni: 'VIT Vellore',
                quote: 'Recruiters loved my portfolio. Landed a startup job in Bangalore.',
              },
              {
                name: 'Rohan Kapoor',
                uni: 'SRM Chennai',
                quote: 'The AI bio writer saved me hours. Got a remote job in 3 weeks.',
              },
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/3 backdrop-blur-glass border border-gold/12 rounded-card p-6"
              >
                <p className="text-parchment mb-4 italic">&quot;{testimonial.quote}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/20" />
                  <div>
                    <p className="text-cream font-medium">{testimonial.name}</p>
                    <p className="text-parchment text-sm">{testimonial.uni}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="pricing" className="py-24 px-6 bg-espresso">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white/3 backdrop-blur-glass border-2 border-gold/30 rounded-card p-12 text-center"
          >
            <h2 className="font-playfair text-5xl text-cream mb-6">Ready to get hired?</h2>
            <p className="text-parchment text-lg mb-8">
              Join 2,400+ students who landed their dream jobs
            </p>
            <Link
              href="/signup"
              className="inline-block px-10 py-4 bg-gold text-espresso font-semibold text-lg rounded-button hover:bg-goldHover transition-all hover:scale-105"
            >
              Start free — no credit card
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-espresso border-t border-gold/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gold rounded flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-espresso">
                <path
                  fill="currentColor"
                  d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"
                />
              </svg>
            </div>
            <span className="font-playfair text-cream">Foliyo</span>
          </div>

          <div className="flex gap-8 text-parchment text-sm">
            <Link href="#" className="hover:text-cream transition-colors">
              About
            </Link>
            <Link href="#" className="hover:text-cream transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-cream transition-colors">
              Terms
            </Link>
            <Link href="#" className="hover:text-cream transition-colors">
              Contact
            </Link>
          </div>

          <p className="text-parchment text-sm">© 2026 Foliyo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
