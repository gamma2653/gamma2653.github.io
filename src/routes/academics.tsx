import { pageTitle } from '../lib/site';
import { createFileRoute } from '@tanstack/react-router'
import Page from '../components/page';
import PageHeader from '../components/page-header';
import ProjectGrid from '../components/project-grid';
import { projectsByCategory } from '../data/projects';

export const Route = createFileRoute('/academics')({
  component: RouteComponent,
  head: () => ({ meta: [{ title: pageTitle('Academics & Research') }] }),
})

function RouteComponent() {
  return (
    <Page>
      <PageHeader title="Academic & Research Projects">
        <p>My academic work focuses on computational psychology, data analysis, and applied research in cognitive science and systems analysis.</p>
        <p>Here are some of my notable research and academic projects.</p>
      </PageHeader>
      <ProjectGrid projects={projectsByCategory('academics')} />
    </Page>
  )
}
