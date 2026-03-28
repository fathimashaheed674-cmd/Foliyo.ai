import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import EditorClient from '@/components/EditorClient';

export default async function EditorPage() {
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

  return <EditorClient user={user} initialPortfolio={portfolio} />;
}
