import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { resumeText } = await request.json();

    if (!resumeText) {
      return NextResponse.json({ error: 'Resume text is required' }, { status: 400 });
    }

    const mockData = {
      name: 'Arjun Mehta',
      title: 'Full Stack Developer',
      bio: 'Passionate developer with experience in building modern web applications. Skilled in React, Node.js, and cloud technologies. Always eager to learn and tackle new challenges.',
      skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS', 'Docker'],
      projects: [
        {
          id: '1',
          title: 'E-commerce Platform',
          description: 'Built a full-featured e-commerce platform with payment integration, inventory management, and admin dashboard.',
          tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        },
        {
          id: '2',
          title: 'Task Management App',
          description: 'Developed a collaborative task management application with real-time updates and team features.',
          tech: ['Next.js', 'Supabase', 'TailwindCSS'],
        },
      ],
      experience: [
        {
          id: '1',
          company: 'Tech Startup',
          position: 'Software Developer Intern',
          duration: 'Jun 2023 - Aug 2023',
          description: 'Worked on building features for the main product using React and Node.js.',
        },
      ],
    };

    return NextResponse.json(mockData);
  } catch (error) {
    console.error('Resume parsing error:', error);
    return NextResponse.json({ error: 'Failed to parse resume' }, { status: 500 });
  }
}
