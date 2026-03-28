import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { themes } from '@/components/themes';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params;
  const supabase = await createClient();

  const { data: portfolio } = await supabase
    .from('portfolios')
    .select('*')
    .eq('username', username)
    .eq('is_public', true)
    .maybeSingle();

  if (!portfolio) {
    return {
      title: 'Portfolio Not Found',
    };
  }

  return {
    title: `${portfolio.name} - ${portfolio.title}`,
    description: portfolio.bio || `Portfolio of ${portfolio.name}`,
    openGraph: {
      title: `${portfolio.name} - ${portfolio.title}`,
      description: portfolio.bio || `Portfolio of ${portfolio.name}`,
      type: 'profile',
    },
  };
}

export default async function PublicPortfolioPage({ params }: PageProps) {
  const { username } = await params;
  const supabase = await createClient();

  const { data: portfolio } = await supabase
    .from('portfolios')
    .select('*')
    .eq('username', username)
    .eq('is_public', true)
    .maybeSingle();

  if (!portfolio) {
    notFound();
  }

  await supabase
    .from('portfolios')
    .update({ view_count: (portfolio.view_count || 0) + 1 })
    .eq('id', portfolio.id);

  const ThemeComponent = themes[portfolio.theme as keyof typeof themes] || themes['warm-luxury'];

  return <ThemeComponent portfolio={portfolio} />;
}
