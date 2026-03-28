'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  FileText,
  PenLine,
  FolderGit2,
  Target,
  Eye,
  Folder,
  TrendingUp,
  LogOut,
  Settings,
  Home,
  Palette,
  Wrench,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import type { Portfolio, AIGeneration } from '@/lib/types';

interface DashboardClientProps {
  user: any;
  portfolio: Portfolio | null;
  recentGenerations: AIGeneration[];
}

export default function DashboardClient({
  user,
  portfolio,
  recentGenerations,
}: DashboardClientProps) {
  const router = useRouter();
  const supabase = createClient();
  const [activeNav, setActiveNav] = useState('home');

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const userName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';
  const viewCount = portfolio?.view_count || 0;
  const projectCount = portfolio?.projects?.length || 0;
  const profileStrength = portfolio
    ? Math.min(
        100,
        (portfolio.name ? 15 : 0) +
          (portfolio.bio ? 25 : 0) +
          (portfolio.skills?.length > 0 ? 20 : 0) +
          (portfolio.projects?.length > 0 ? 30 : 0) +
          (portfolio.github || portfolio.linkedin ? 10 : 0)
      )
    : 0;

  return (
    <div className="min-h-screen bg-warmDark flex">
      <aside className="w-64 bg-espresso border-r border-gold/8 flex flex-col">
        <div className="p-6">
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
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {[
            { id: 'home', icon: Home, label: 'Home' },
            { id: 'editor', icon: Wrench, label: 'Build Portfolio', href: '/editor' },
            { id: 'projects', icon: Folder, label: 'My Projects' },
            { id: 'ai', icon: Target, label: 'AI Tools' },
            { id: 'themes', icon: Palette, label: 'Themes' },
            { id: 'settings', icon: Settings, label: 'Settings' },
          ].map((item) => {
            const isActive = activeNav === item.id;
            const content = (
              <>
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </>
            );

            const className = `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive
                ? 'bg-gold/15 text-gold'
                : 'text-parchment hover:text-cream hover:bg-white/5'
            }`;

            return item.href ? (
              <Link key={item.id} href={item.href} className={className}>
                {content}
              </Link>
            ) : (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`w-full ${className}`}
              >
                {content}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gold/8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gold/20 ring-2 ring-gold/30 flex items-center justify-center">
              <span className="text-gold font-semibold">
                {userName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-cream text-sm font-medium truncate">{userName}</p>
              <p className="text-parchment text-xs truncate">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-2 px-4 py-2 text-parchment hover:text-cream hover:bg-white/5 rounded-lg transition-colors text-sm"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-playfair text-4xl text-cream mb-2">
              Good {new Date().getHours() < 12 ? 'morning' : 'afternoon'}, {userName}.
            </h1>
            <p className="text-parchment">
              {portfolio
                ? `Your portfolio has been viewed ${viewCount} times this week.`
                : "Let's get started building your portfolio."}
            </p>
          </motion.div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/3 backdrop-blur-glass border border-gold/12 rounded-card p-6"
            >
              <div className="flex items-center justify-between mb-3">
                <Eye className="w-6 h-6 text-gold" />
                <TrendingUp className="w-4 h-4 text-green-400" />
              </div>
              <p className="text-3xl font-bold text-cream mb-1">{viewCount}</p>
              <p className="text-parchment text-sm">Portfolio Views</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/3 backdrop-blur-glass border border-gold/12 rounded-card p-6"
            >
              <div className="flex items-center justify-between mb-3">
                <Folder className="w-6 h-6 text-gold" />
              </div>
              <p className="text-3xl font-bold text-cream mb-1">{projectCount}</p>
              <p className="text-parchment text-sm">Projects Added</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/3 backdrop-blur-glass border border-gold/12 rounded-card p-6"
            >
              <div className="flex items-center justify-between mb-3">
                <Target className="w-6 h-6 text-gold" />
              </div>
              <p className="text-3xl font-bold text-cream mb-1">{profileStrength}%</p>
              <p className="text-parchment text-sm">Profile Strength</p>
            </motion.div>
          </div>

          <div className="mb-8">
            <h2 className="font-playfair text-2xl text-cream mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  icon: FileText,
                  title: 'Paste Resume',
                  desc: 'AI builds your portfolio',
                  color: 'from-gold/20 to-goldHover/20',
                },
                {
                  icon: PenLine,
                  title: 'Write Bio with AI',
                  desc: 'Get a personalized bio',
                  color: 'from-blue-500/20 to-blue-600/20',
                },
                {
                  icon: FolderGit2,
                  title: 'Add Project',
                  desc: 'Showcase your work',
                  color: 'from-green-500/20 to-green-600/20',
                },
                {
                  icon: Target,
                  title: 'Check Skills Gap',
                  desc: 'Match to job postings',
                  color: 'from-purple-500/20 to-purple-600/20',
                },
              ].map((action, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  whileHover={{ y: -4, boxShadow: '0 0 40px rgba(201,150,58,0.15)' }}
                  className={`bg-gradient-to-br ${action.color} backdrop-blur-glass border border-gold/12 rounded-card p-6 text-left hover:border-gold/20 transition-all`}
                >
                  <action.icon className="w-8 h-8 text-gold mb-3" />
                  <h3 className="text-cream font-semibold mb-1">{action.title}</h3>
                  <p className="text-parchment text-sm">{action.desc}</p>
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-playfair text-2xl text-cream mb-6">Recent Activity</h2>
            <div className="bg-white/3 backdrop-blur-glass border border-gold/12 rounded-card overflow-hidden">
              {recentGenerations.length > 0 ? (
                <div className="divide-y divide-gold/8">
                  {recentGenerations.map((gen, i) => (
                    <motion.div
                      key={gen.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="p-4 hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-cream font-medium capitalize mb-1">
                            {gen.type.replace('_', ' ')}
                          </p>
                          <p className="text-parchment text-sm truncate max-w-lg">
                            {gen.input.substring(0, 100)}
                            {gen.input.length > 100 ? '...' : ''}
                          </p>
                        </div>
                        <p className="text-parchment text-xs">
                          {new Date(gen.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center">
                  <p className="text-parchment">No AI generations yet. Try the quick actions above!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
