import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { title, what, tech, role, outcome } = await request.json();

    if (!title || !what) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      );
    }

    const mockDescription = `${title} is a comprehensive project where I ${what}. Built using ${tech || 'modern technologies'}, this project demonstrates my ability to architect and implement full-stack solutions.\n\nIn this project, I ${role || 'handled both frontend and backend development'}. The biggest challenge was ensuring scalability and performance, which I addressed through careful planning and optimization.\n\n${outcome || 'The project successfully achieved its goals and provided valuable learning experiences in software development and problem-solving.'}`;

    return NextResponse.json({ description: mockDescription });
  } catch (error) {
    console.error('Case study generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate case study' },
      { status: 500 }
    );
  }
}
