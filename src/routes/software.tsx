import { pageTitle } from '../lib/site';
import { createFileRoute } from '@tanstack/react-router'
import Page from '../components/page';
import PageHeader from '../components/page-header';
import ProjectGrid from '../components/project-grid';
import { projectsByCategory } from '../data/projects';

export const Route = createFileRoute('/software')({
  component: RouteComponent,
  head: () => ({ meta: [{ title: pageTitle('Software Projects') }] }),
})

function RouteComponent() {
  return (
    <Page>
      <PageHeader title="Software">
        <p>I am always actively developing new software projects and improving my coding skills.</p>
        <p>These are the personal and open-source projects I am excited to share, most recent work first.</p>
      </PageHeader>
      <ProjectGrid projects={projectsByCategory('software')} />
    </Page>
  )
}
