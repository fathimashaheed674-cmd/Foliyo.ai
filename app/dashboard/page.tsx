import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import DashboardClient from '@/components/DashboardClient';

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: portfolio } = await supabase
    .from('portfolios')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle();

  const { data: recentGenerations } = await supabase
    .from('ai_generations')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5);

  return (
    <DashboardClient
      user={user}
      portfolio={portfolio}
      recentGenerations={recentGenerations || []}
    />
  );
}
