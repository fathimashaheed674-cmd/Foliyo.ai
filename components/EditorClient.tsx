'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import type { Portfolio, Project } from '@/lib/types';
import {
  Save,
  Eye,
  Plus,
  X,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Copy,
  Check,
} from 'lucide-react';
import Link from 'next/link';

interface EditorClientProps {
  user: any;
  initialPortfolio: Portfolio | null;
}

export default function EditorClient({ user, initialPortfolio }: EditorClientProps) {
  const router = useRouter();
  const supabase = createClient();

  const [portfolio, setPortfolio] = useState<Portfolio | null>(initialPortfolio);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    bio: true,
    skills: true,
    projects: true,
    theme: true,
    publish: true,
  });

  const [formData, setFormData] = useState({
    name: portfolio?.name || '',
    title: portfolio?.title || '',
    location: portfolio?.location || '',
    website: portfolio?.website || '',
    linkedin: portfolio?.linkedin || '',
    github: portfolio?.github || '',
    email: portfolio?.email || user.email || '',
    bio: portfolio?.bio || '',
    skills: portfolio?.skills || [],
    projects: portfolio?.projects || [],
    theme: portfolio?.theme || 'warm-luxury',
    is_public: portfolio?.is_public || false,
    username: portfolio?.username || '',
  });

  const [newSkill, setNewSkill] = useState('');
  const [showAddProject, setShowAddProject] = useState(false);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: '',
    description: '',
    tech: [],
    liveUrl: '',
    githubUrl: '',
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('portfolios')
        .upsert({
          id: portfolio?.id,
          user_id: user.id,
          ...formData,
        })
        .select()
        .single();

      if (error) throw error;

      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error('Error saving portfolio:', error);
    } finally {
      setSaving(false);
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const addProject = () => {
    if (newProject.title && newProject.description) {
      setFormData((prev) => ({
        ...prev,
        projects: [
          ...prev.projects,
          {
            id: Date.now().toString(),
            title: newProject.title!,
            description: newProject.description!,
            tech: newProject.tech || [],
            liveUrl: newProject.liveUrl,
            githubUrl: newProject.githubUrl,
          },
        ],
      }));
      setNewProject({ title: '', description: '', tech: [], liveUrl: '', githubUrl: '' });
      setShowAddProject(false);
    }
  };

  const removeProject = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  const copyPublicUrl = () => {
    const url = `${window.location.origin}/p/${formData.username}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-warmDark flex">
      <div className="w-[60%] border-r border-gold/8 overflow-y-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-playfair text-3xl text-cream mb-2">Portfolio Editor</h1>
              <p className="text-parchment">Build your professional portfolio</p>
            </div>
            <Link
              href="/dashboard"
              className="px-4 py-2 text-parchment hover:text-cream transition-colors"
            >
              ← Back
            </Link>
          </div>

          <div className="space-y-4">
            {/* Basic Info */}
            <Section
              title="Basic Info"
              expanded={expandedSections.basic}
              onToggle={() => toggleSection('basic')}
            >
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Arjun Mehta"
                />
                <Input
                  label="Professional Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Full Stack Developer"
                />
                <Input
                  label="Location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Bangalore, India"
                />
                <Input
                  label="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="arjun@example.com"
                />
                <Input
                  label="Website"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://example.com"
                />
                <Input
                  label="LinkedIn"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  placeholder="linkedin.com/in/arjun"
                />
                <Input
                  label="GitHub"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  placeholder="github.com/arjun"
                  className="col-span-2"
                />
              </div>
            </Section>

            {/* Bio */}
            <Section
              title="Bio"
              expanded={expandedSections.bio}
              onToggle={() => toggleSection('bio')}
            >
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Tell your story in 2-3 paragraphs..."
                rows={6}
                className="w-full px-4 py-3 bg-espresso border border-gold/20 rounded-button text-cream placeholder-parchment/50 focus:border-gold focus:outline-none transition-colors resize-none"
              />
              <button className="mt-3 flex items-center gap-2 px-4 py-2 text-gold hover:text-goldHover transition-colors">
                <Sparkles className="w-4 h-4" />
                Generate with AI
              </button>
            </Section>

            {/* Skills */}
            <Section
              title="Skills"
              expanded={expandedSections.skills}
              onToggle={() => toggleSection('skills')}
            >
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  placeholder="Add a skill..."
                  className="flex-1 px-4 py-2 bg-espresso border border-gold/20 rounded-button text-cream placeholder-parchment/50 focus:border-gold focus:outline-none transition-colors"
                />
                <button
                  onClick={addSkill}
                  className="px-4 py-2 bg-gold text-espresso rounded-button hover:bg-goldHover transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill) => (
                  <span
                    key={skill}
                    className="flex items-center gap-2 px-3 py-1.5 bg-gold/15 border border-gold/30 rounded-full text-gold text-sm"
                  >
                    {skill}
                    <button onClick={() => removeSkill(skill)} className="hover:text-goldHover">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </Section>

            {/* Projects */}
            <Section
              title="Projects"
              expanded={expandedSections.projects}
              onToggle={() => toggleSection('projects')}
            >
              <div className="space-y-4 mb-4">
                {formData.projects.map((project) => (
                  <div
                    key={project.id}
                    className="p-4 bg-espresso/50 border border-gold/10 rounded-lg"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-cream font-semibold">{project.title}</h4>
                      <button
                        onClick={() => removeProject(project.id)}
                        className="text-parchment hover:text-red-400"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-parchment text-sm mb-2">{project.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 bg-gold/10 text-gold text-xs rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {showAddProject ? (
                <div className="p-4 bg-espresso/50 border border-gold/20 rounded-lg space-y-3">
                  <Input
                    label="Project Title"
                    value={newProject.title || ''}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    placeholder="My Awesome Project"
                  />
                  <div>
                    <label className="block text-cream text-sm font-medium mb-2">
                      Description
                    </label>
                    <textarea
                      value={newProject.description || ''}
                      onChange={(e) =>
                        setNewProject({ ...newProject, description: e.target.value })
                      }
                      placeholder="Describe what you built..."
                      rows={3}
                      className="w-full px-4 py-3 bg-espresso border border-gold/20 rounded-button text-cream placeholder-parchment/50 focus:border-gold focus:outline-none transition-colors resize-none"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={addProject}
                      className="px-4 py-2 bg-gold text-espresso rounded-button hover:bg-goldHover"
                    >
                      Add Project
                    </button>
                    <button
                      onClick={() => setShowAddProject(false)}
                      className="px-4 py-2 text-parchment hover:text-cream"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowAddProject(true)}
                  className="flex items-center gap-2 px-4 py-2 text-gold hover:text-goldHover transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Project
                </button>
              )}
            </Section>

            {/* Theme */}
            <Section
              title="Theme"
              expanded={expandedSections.theme}
              onToggle={() => toggleSection('theme')}
            >
              <div className="grid grid-cols-5 gap-3">
                {[
                  { id: 'warm-luxury', name: 'Warm Luxury', bg: 'bg-gradient-to-br from-espresso to-walnut' },
                  { id: 'arctic-minimal', name: 'Arctic', bg: 'bg-gradient-to-br from-slate-50 to-slate-200' },
                  { id: 'midnight-glass', name: 'Midnight', bg: 'bg-gradient-to-br from-blue-950 to-blue-900' },
                  { id: 'forest-calm', name: 'Forest', bg: 'bg-gradient-to-br from-green-950 to-green-900' },
                  { id: 'blush-editorial', name: 'Blush', bg: 'bg-gradient-to-br from-pink-50 to-pink-100' },
                ].map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setFormData({ ...formData, theme: theme.id })}
                    className={`${theme.bg} h-20 rounded-lg border-2 transition-all ${
                      formData.theme === theme.id
                        ? 'border-gold ring-2 ring-gold/30'
                        : 'border-gold/10 hover:border-gold/30'
                    }`}
                  >
                    <span className="sr-only">{theme.name}</span>
                  </button>
                ))}
              </div>
            </Section>

            {/* Publish */}
            <Section
              title="Publish Settings"
              expanded={expandedSections.publish}
              onToggle={() => toggleSection('publish')}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-espresso/50 rounded-lg">
                  <div>
                    <p className="text-cream font-medium mb-1">Portfolio Visibility</p>
                    <p className="text-parchment text-sm">
                      Make your portfolio {formData.is_public ? 'private' : 'public'}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setFormData({ ...formData, is_public: !formData.is_public })
                    }
                    className={`relative w-14 h-7 rounded-full transition-colors ${
                      formData.is_public ? 'bg-gold' : 'bg-espresso border border-gold/30'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-6 h-6 bg-cream rounded-full transition-transform ${
                        formData.is_public ? 'translate-x-7' : ''
                      }`}
                    />
                  </button>
                </div>

                {formData.is_public && formData.username && (
                  <div className="p-4 bg-gold/5 border border-gold/20 rounded-lg">
                    <p className="text-parchment text-sm mb-2">Your public URL:</p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 px-3 py-2 bg-espresso rounded text-gold text-sm">
                        {`foliyo.app/p/${formData.username}`}
                      </code>
                      <button
                        onClick={copyPublicUrl}
                        className="px-3 py-2 bg-gold text-espresso rounded hover:bg-goldHover transition-colors"
                      >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </Section>
          </div>
        </div>
      </div>

      <div className="w-[40%] bg-espresso overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-playfair text-xl text-cream flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Live Preview
          </h2>
          {formData.is_public && formData.username && (
            <Link
              href={`/p/${formData.username}`}
              target="_blank"
              className="text-gold hover:text-goldHover text-sm"
            >
              Open in new tab →
            </Link>
          )}
        </div>

        <div className="bg-warmDark rounded-lg p-8 border border-gold/10 min-h-[600px]">
          <div className="text-center mb-8">
            <h3 className="font-playfair text-3xl text-cream mb-2">
              {formData.name || 'Your Name'}
            </h3>
            <p className="text-gold text-lg mb-4">{formData.title || 'Your Title'}</p>
            {formData.bio && <p className="text-parchment text-sm max-w-md mx-auto">{formData.bio}</p>}
          </div>

          {formData.skills.length > 0 && (
            <div className="mb-6">
              <h4 className="font-playfair text-xl text-cream mb-3">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {formData.skills.slice(0, 8).map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gold/15 border border-gold/30 rounded-full text-gold text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {formData.projects.length > 0 && (
            <div>
              <h4 className="font-playfair text-xl text-cream mb-3">Projects</h4>
              <div className="space-y-4">
                {formData.projects.slice(0, 2).map((project) => (
                  <div
                    key={project.id}
                    className="p-4 bg-white/3 border border-gold/10 rounded-lg"
                  >
                    <h5 className="text-cream font-semibold mb-2">{project.title}</h5>
                    <p className="text-parchment text-sm mb-3 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {project.tech.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 bg-gold/10 text-gold text-xs rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="fixed bottom-8 right-8 flex items-center gap-2 px-6 py-3 bg-gold text-espresso font-semibold rounded-button hover:bg-goldHover transition-all hover:scale-105 shadow-[0_0_40px_rgba(201,150,58,0.3)] disabled:opacity-50"
      >
        {saved ? (
          <>
            <Check className="w-5 h-5" />
            Saved
          </>
        ) : (
          <>
            <Save className="w-5 h-5" />
            {saving ? 'Saving...' : 'Save'}
          </>
        )}
      </button>
    </div>
  );
}

function Section({
  title,
  expanded,
  onToggle,
  children,
}: {
  title: string;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white/3 backdrop-blur-glass border border-gold/12 rounded-card overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
      >
        <h3 className="font-playfair text-xl text-cream">{title}</h3>
        {expanded ? (
          <ChevronDown className="w-5 h-5 text-gold" />
        ) : (
          <ChevronRight className="w-5 h-5 text-gold" />
        )}
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  className = '',
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-cream text-sm font-medium mb-2">{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-espresso border border-gold/20 rounded-button text-cream placeholder-parchment/50 focus:border-gold focus:outline-none transition-colors"
      />
    </div>
  );
}
