import { pageTitle } from '../lib/site';
import { createFileRoute } from '@tanstack/react-router'
import Page from '../components/page';
import aroboLogo from '../assets/images/arobo_logo.png';
import Card from '../components/card';
import PageHeader from '../components/page-header';
import ProjectGrid from '../components/project-grid';
import CaseStudyCard from '../components/case-study';
import { caseStudiesByCategory, caseStudyProjectIds } from '../data/case-studies';
import { standardProjects } from '../data/projects';

export const Route = createFileRoute('/robotics')({
  component: RouteComponent,
  head: () => ({ meta: [{ title: pageTitle('Robotics') }] }),
})

function RouteComponent() {
  return (
    <Page>
      <PageHeader title="Robotics">
        <p>My robotics projects combine hardware and software to create interactive systems and explore innovative applications of embedded systems.</p>
        <p>I contributed to several projects as part of Cornell Cup Robotics, a student project team focused on building autonomous robots.</p>
      </PageHeader>

      <h2 className="font-display text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Featured</h2>
      <div className="mb-10 sm:mb-12 space-y-6 sm:space-y-8">
        {caseStudiesByCategory('robotics').map((study) => (
          <CaseStudyCard key={study.id} study={study} />
        ))}
      </div>

      <Card as="section" className="mb-10 sm:mb-12 max-w-3xl">
        <a href="https://arcinc.com" target="_blank" rel="noopener noreferrer" className="no-underline">
          <img src={aroboLogo} alt="aRoboticsCompany logo" loading="lazy" decoding="async" className="mb-4 h-24 sm:h-32 object-contain" />
          <h2 className="font-display text-xl sm:text-2xl font-bold">aRoboticsCompany</h2>
        </a>
        <p className="text-xs sm:text-sm font-semibold mb-2">Focus: Civil Inspection Robotics</p>
        <div className="mt-3 space-y-2 text-sm sm:text-base leading-relaxed">
          <p>Worked at aRoboticsCompany, a company focused on civil inspection robotics.</p>
          <p>My contributions included developing CAN bus communication systems for reliable inter-module data exchange, and LWIR (Long-Wave Infrared) image processing for thermal imaging applications used in infrastructure inspection.</p>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 italic">
          Disclaimer: This website and its content are not endorsed by nor affiliated with aRoboticsCompany.
        </p>
      </Card>

      <h2 className="font-display text-xl sm:text-2xl font-bold mb-4 sm:mb-6">More projects</h2>
      <ProjectGrid projects={standardProjects('robotics', caseStudyProjectIds('robotics'))} />
    </Page>
  )
}
