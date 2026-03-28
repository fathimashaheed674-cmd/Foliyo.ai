import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { skills, jobDescription } = await request.json();

    if (!skills || !Array.isArray(skills) || !jobDescription) {
      return NextResponse.json(
        { error: 'Skills array and job description are required' },
        { status: 400 }
      );
    }

    const mockAnalysis = {
      matched: skills.slice(0, Math.floor(skills.length * 0.6)),
      missing: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
      recommendations: {
        Docker: [
          { title: 'Docker Official Tutorial', url: 'https://docs.docker.com/get-started/' },
        ],
        Kubernetes: [
          { title: 'Kubernetes Basics', url: 'https://kubernetes.io/docs/tutorials/' },
        ],
        AWS: [
          { title: 'AWS Free Tier', url: 'https://aws.amazon.com/free/' },
        ],
        'CI/CD': [
          { title: 'GitHub Actions Guide', url: 'https://docs.github.com/en/actions' },
        ],
      },
      matchPercent: Math.floor((skills.length * 0.6) / (skills.length * 0.6 + 4) * 100),
    };

    return NextResponse.json(mockAnalysis);
  } catch (error) {
    console.error('Skills gap analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze skills gap' },
      { status: 500 }
    );
  }
}
