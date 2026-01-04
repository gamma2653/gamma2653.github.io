import { createFileRoute } from '@tanstack/react-router'
import Page from '../components/page';
import { CaptionedImage } from '../components/image';
import butter_tasty from '../assets/images/butter_tasty.jpg';

export const Route = createFileRoute('/about')({
  component: RouteComponent,
})

const skills = [
  { name: 'Python', level: 10 },
  { name: 'TypeScript', level: 9 },
  { name: 'C', level: 9 },
  { name: 'SQL', level: 8 },
  { name: 'C++', level: 8 },
  { name: 'Java', level: 7 },
];

function RouteComponent() {
  return (
    <Page>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">About Me</h1>

        {/* Introduction */}
        <div className="mb-12">
          <p className="text-lg text-gray-700 dark:text-gray-300 mt-4 text-center leading-relaxed">
            Hello, and thank you for your interest in learning more about me.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mt-4 text-center leading-relaxed">
            My professional journey has been a fascinating blend of technology, innovation, and a continuous quest to understand the intricacies of human cognition and computation. Since my early years in the Bronx, New York, where I was born and raised, I've been driven by a curiosity about how things work—particularly how the human brain processes information.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mt-4 text-center leading-relaxed">
            I'm currently seeking opportunities to apply my knowledge of <span className="font-semibold text-gray-900 dark:text-gray-100">computational psychology and information processing</span> to solve complex problems at the intersection of technology and human cognition.
          </p>
        </div>

        {/* Education */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Education</h2>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-bold text-center mb-2">Cornell University</h3>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-4">B.A. in Psychology, Minor in Computer Science • May 2023</p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              My academic path was enriched by courses ranging from Developmental Psychology to Neural Circuits for Social Behavior and Foundations of Artificial Intelligence.
            </p>
            <div className="mt-4">
              <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Influential Courses & Professors:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                <li><span className="font-semibold">Computational Psychology</span> (Shimon Edelman) - particularly fascinated by dimensional reduction</li>
                <li><span className="font-semibold">Operating Systems & Practicum</span> (Robbert van Renesse)</li>
                <li><span className="font-semibold">Functional Programming</span> (Nate Foster)</li>
                <li><span className="font-semibold">Systems Programming</span> (Ken Birman)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Technical Skills</h2>
          <div className="space-y-4">
            {skills.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between mb-1">
                  <span className="text-base font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{skill.level}/10</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 dark:bg-blue-500 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${skill.level * 10}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 text-center italic">
            * Java: deep but outdated knowledge
          </p>
        </div>

        {/* Experience */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Professional Experience</h2>
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold mb-1">Software Engineer</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">aRoboticsCompany • 2023 - June 2025</p>
              <p className="text-gray-700 dark:text-gray-300">
                Developed user interfaces for automated robotic systems and established CI/CD pipelines to enhance developer productivity.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold mb-1">Contract Data Engineer</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">Tompkins Consolidated Area Transit (TCAT)</p>
              <p className="text-gray-700 dark:text-gray-300">
                Led software development initiatives that facilitated NTD reporting, cutting time spent preparing NTD reports in half.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold mb-1">Research Aide</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">Cornell Computational Physiology Lab</p>
              <p className="text-gray-700 dark:text-gray-300">
                Explored bio-inspired algorithms and neuromorphic computing, contributing to research at the intersection of neuroscience and computation.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold mb-1">Research Assistant</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">Cornell B.A.B.Y. Lab</p>
              <p className="text-gray-700 dark:text-gray-300">
                Contributed to developmental psychology research studying communication development in human infants and songbirds.
              </p>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Achievements & Activities</h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold mb-2">Cornell Cup Robotics</h3>
              <p>
                Integrated complex modules into the C1C0 robot, developing skills in real-time object detection, facial recognition, and machine learning for autonomous robotics systems.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold mb-2">1st Place - Cornell Animal Health Hackathon</h3>
              <p>
                Won first place with a project focused on improving clinical workflows through enhanced communication platforms.
              </p>
            </div>
          </div>
        </div>

        {/* Personal Interests */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Beyond Code</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 text-center leading-relaxed">
            Outside of my professional work, I enjoy hiking, sound design, music, and tabletop games. I'm currently developing <span className="font-semibold">Campaign Master</span>—a companion application for game masters of tabletop roleplaying games—which exemplifies my passion for creating innovative solutions that blend technology with creative pursuits.
          </p>
        </div>

        {/* Connect */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Let's Connect</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 text-center leading-relaxed mb-6">
            I'm always eager to connect with like-minded individuals who share a passion for technology, creativity, and innovation.
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            <a
              href="https://github.com/gamma2653"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors shadow-md"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/cdejesus26/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors shadow-md"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
          </div>
          <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
            Or reach out through the <a href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">contact page</a>!
          </p>
        </div>

        <CaptionedImage src={butter_tasty} alt="Hiking Buttermilk Falls" caption="Hiking Buttermilk Falls" classNames={{
          div: "mt-8",
          div_img: "h-100 mx-auto",
        }} />
      </div>
    </Page>
  );
}
