import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, field, topSkill, dreamJob, uniqueThing } = await request.json();

    if (!name || !field) {
      return NextResponse.json(
        { error: 'Name and field are required' },
        { status: 400 }
      );
    }

    const mockBio = `I'm ${name}, a ${field} specialist with a passion for ${topSkill}. ${uniqueThing ? `What sets me apart is ${uniqueThing}.` : ''}\n\nThroughout my journey, I've focused on building practical skills and creating meaningful projects. I believe in learning by doing, and I'm constantly exploring new technologies and best practices in ${field}.\n\n${dreamJob ? `My goal is to ${dreamJob}, where I can apply my skills to solve real-world problems and continue growing as a professional.` : 'I\'m excited about opportunities where I can contribute to innovative projects and collaborate with talented teams.'}`;

    return NextResponse.json({ bio: mockBio });
  } catch (error) {
    console.error('Bio generation error:', error);
    return NextResponse.json({ error: 'Failed to generate bio' }, { status: 500 });
  }
}
