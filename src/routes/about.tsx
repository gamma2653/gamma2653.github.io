import { pageTitle } from '../lib/site';
import { createFileRoute, Link } from '@tanstack/react-router'
import Page from '../components/page';
import { CaptionedImage } from '../components/image';
import butter_tasty from '../assets/images/butter_tasty.webp';
import Card from '../components/card';
import PageHeader from '../components/page-header';
import ExperienceList from '../components/experience-list';
import SkillGroups from '../components/skill-groups';
import PrintResumeButton from '../components/print-resume-button';
import { LINKS } from '../data/links';
import { activities, currentRoles, education, experience, type Role } from '../data/resume';

export const Route = createFileRoute('/about')({
  component: RouteComponent,
  head: () => ({ meta: [{ title: pageTitle('About') }] }),
})

const SITE_URL = 'https://gamma2653.github.io';

const sectionHeading = 'font-display text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 print:text-xl print:mb-2';
const resumeCard = 'print:shadow-none print:border-0 print:p-0 print:bg-transparent print:break-inside-avoid';
const bodyText = 'text-sm sm:text-base text-gray-700 dark:text-gray-300 print:text-black';
const mutedText = 'text-sm sm:text-base text-gray-600 dark:text-gray-400 print:text-black';

/** "a Software Engineer at Tagup and a part-time Founding Engineer at Saga Healthcare Co" */
function describeRoles(roles: Role[]): string {
  const parts = roles.map(
    (role) => `a ${role.partTime ? 'part-time ' : ''}${role.title} at ${role.company}`,
  );
  if (parts.length <= 1) return parts.join('');
  return `${parts.slice(0, -1).join(', ')} and ${parts[parts.length - 1]}`;
}

function RouteComponent() {
  const current = currentRoles();

  return (
    <Page>
      <div className="max-w-4xl">
        <div className="print:hidden">
          <PageHeader title="About Me" />
        </div>

        {/* Introduction */}
        <div className="mb-8 sm:mb-12 print:hidden">
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mt-3 sm:mt-4 max-w-prose leading-relaxed">
            Hello, and thank you for your interest in learning more about me.
          </p>
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mt-3 sm:mt-4 max-w-prose leading-relaxed">
            My professional journey has been a fascinating blend of technology, innovation, and a continuous quest to understand the intricacies of human cognition and computation. Since my early years in the Bronx, New York, where I was born and raised, I've been driven by a curiosity about how things work—particularly how the human brain processes information.
          </p>
          {current.length > 0 && (
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mt-3 sm:mt-4 max-w-prose leading-relaxed">
              I'm currently {describeRoles(current)}. My background is in <span className="font-semibold text-gray-900 dark:text-gray-100">computational psychology and information processing</span>, and I enjoy problems at the intersection of technology and human cognition.
            </p>
          )}
        </div>

        {/* Why cognition and computation */}
        <section aria-labelledby="why-heading" className="mb-8 sm:mb-12 print:hidden">
          <h2 id="why-heading" className="font-display text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6">Why cognition and computation</h2>
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-prose leading-relaxed">
            You will find that all of my projects have been oriented towards understanding how information is processed,
            as well as some other hobby related projects.
            From a young age I have always found the experience of life to be fascinating,
            how is it that we are able to perceive the present moment? What triggers us into action,
            and how can we learn to live more in the present?
          </p>
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mt-3 sm:mt-4 max-w-prose leading-relaxed">
            This led me down a wide-spanning path of studying a combination of computer science and psychology,
            and the pleasant surprise of how interconnected these two subjects really are— unexpectedly so.
            Although clearer to many now with the advent of large AI models,
            early in my academic career it proved difficult to consolidate what I had learned in these two disparate fields,
            until it finally clicked. The crux of the connection is simple: computational irreducibility.
          </p>
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mt-3 sm:mt-4 max-w-prose leading-relaxed">
            The human brain is a prediction engine; or better to explain my point, a consolidation (reduction) machine.
            It attempts to create a model, however imperfect it may be, of our experience (evolutionarily for the purpose of homeostasis).
            Although research is ongoing, I believe this to be a purely cognitive (i.e. computational) process.
            With this lens, the intersection and value of studying psychology and computer science together becomes apparent:
            in the day and age where we are building "thinking" machines,
            understanding the nature of thought becomes all the more important.
          </p>
        </section>

        {/* Resume: the only part of this page that prints */}
        <section id="resume" aria-labelledby="resume-heading" className="print:text-black">
          <div className="mb-6 sm:mb-8 flex flex-wrap items-center justify-between gap-3 print:hidden">
            <h2 id="resume-heading" className="font-display text-xl sm:text-2xl lg:text-3xl font-bold">Resume</h2>
            <PrintResumeButton />
          </div>

          <div data-testid="resume-print-header" className="hidden print:block mb-6">
            <p className="font-display text-2xl font-bold">Christopher De Jesus</p>
            <p className="text-sm">
              {SITE_URL} · {LINKS.github} · {LINKS.linkedin}
            </p>
          </div>

          {/* Experience */}
          <div className="mb-8 sm:mb-12 print:mb-6">
            <h2 className={sectionHeading}>Professional Experience</h2>
            <ExperienceList roles={experience} />
          </div>

          {/* Education */}
          <div className="mb-8 sm:mb-12 print:mb-6">
            <h2 className={sectionHeading}>Education</h2>
            <Card reveal={false} className={resumeCard}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-display text-lg sm:text-xl font-bold">{education.school}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 print:text-black">{education.graduation}</p>
              </div>
              <p className={`${mutedText} mt-1`}>{education.degree} · {education.location}</p>
              <p className={`${bodyText} mt-3`}>
                <span className="font-semibold">Relevant coursework:</span> {education.coursework.join(', ')}
              </p>
              <div className="mt-3 sm:mt-4">
                <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100 print:text-black mb-2">Influential Courses & Professors:</p>
                <ul className={`list-disc list-inside space-y-1 ${bodyText}`}>
                  <li><span className="font-semibold">Computational Psychology</span> (Shimon Edelman, my faculty advisor) - particularly fascinated by dimensional reduction</li>
                  <li><span className="font-semibold">Operating Systems & Practicum</span> (Robbert van Renesse)</li>
                  <li><span className="font-semibold">Functional Programming</span> (Nate Foster)</li>
                  <li><span className="font-semibold">Systems Programming</span> (Ken Birman)</li>
                </ul>
              </div>
            </Card>
          </div>

          {/* Skills */}
          <div className="mb-8 sm:mb-12 print:mb-6">
            <h2 className={sectionHeading}>Technical Skills</h2>
            <SkillGroups />
          </div>

          {/* Achievements */}
          <div className="mb-8 sm:mb-12 print:mb-0">
            <h2 className={sectionHeading}>Achievements & Activities</h2>
            <div className="space-y-3 sm:space-y-4">
              {activities.map((activity) => (
                <Card key={activity.title} reveal={false} className={resumeCard}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 mb-2">
                    <h3 className="font-display text-lg sm:text-xl font-bold">{activity.title}</h3>
                    {activity.date && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 print:text-black">{activity.date}</p>
                    )}
                  </div>
                  <p className={bodyText}>{activity.detail}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Personal Interests */}
        <div className="mb-8 sm:mb-12 print:hidden">
          <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6">Beyond Code</h2>
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-prose leading-relaxed">
            Outside of my professional work, I enjoy hiking, sound design, music, and tabletop games. I'm currently developing <span className="font-semibold">Campaign Master</span>—a companion application for game masters of tabletop roleplaying games—which exemplifies my passion for creating innovative solutions that blend technology with creative pursuits.
          </p>
        </div>

        {/* Connect */}
        <div className="mb-8 sm:mb-12 print:hidden">
          <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6">Let's Connect</h2>
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-prose leading-relaxed mb-4 sm:mb-6">
            I'm always eager to connect with like-minded individuals who share a passion for technology, creativity, and innovation.
          </p>
          <div className="flex gap-4 flex-wrap">
            <a
              href={LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 no-underline bg-gray-800 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors shadow-md"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              GitHub
            </a>
            <a
              href={LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 no-underline bg-accent-700 text-white rounded-lg hover:bg-accent-800 dark:hover:bg-accent-600 transition-colors shadow-md"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
          </div>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-4 sm:mt-6">
            Or reach out through the <Link to="/contact">contact page</Link>!
          </p>
        </div>

        <CaptionedImage src={butter_tasty} alt="Hiking Buttermilk Falls" caption="Hiking Buttermilk Falls" classNames={{
          div: "mt-8 w-fit print:hidden",
          div_img: "h-100",
        }} />
      </div>
    </Page>
  );
}
