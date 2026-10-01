import { notFound } from 'next/navigation';
import ProjectCase from '../../components/ProjectCase';
import { getProject, projects } from '../../data/projects';

export function generateStaticParams() {
  return Object.entries(projects).flatMap(([discipline, list]) => list.map((project) => ({ discipline, slug: project.slug })));
}

export default async function ProjectPage({ params }: { params: Promise<{ discipline: string; slug: string }> }) {
  const { discipline, slug } = await params;
  const project = getProject(discipline, slug);
  if (!project) notFound();
  const list = projects[project.discipline];
  const current = list.findIndex((item) => item.slug === project.slug);
  const nextProject = list[(current + 1) % list.length];
  return <ProjectCase project={project} nextProject={nextProject}/>;
}
