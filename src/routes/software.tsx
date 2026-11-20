import { pageTitle } from '../lib/site';
import { createFileRoute } from '@tanstack/react-router'
import Page from '../components/page';
import PageHeader from '../components/page-header';
import ProjectGrid from '../components/project-grid';
import CaseStudyCard from '../components/case-study';
import EarlierWork from '../components/earlier-work';
import { caseStudiesByCategory, caseStudyProjectIds } from '../data/case-studies';
import { earlierProjects, standardProjects } from '../data/projects';

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

      <h2 className="font-display text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Featured</h2>
      <div className="space-y-6 sm:space-y-8">
        {caseStudiesByCategory('software').map((study) => (
          <CaseStudyCard key={study.id} study={study} />
        ))}
      </div>

      <h2 className="font-display text-xl sm:text-2xl font-bold mt-10 sm:mt-12 mb-4 sm:mb-6">More projects</h2>
      <ProjectGrid projects={standardProjects('software', caseStudyProjectIds('software'))} />

      <EarlierWork projects={earlierProjects('software')} />
    </Page>
  )
}
