import { createFileRoute } from '@tanstack/react-router'
import Page from '../components/page';

export const Route = createFileRoute('/about')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Page>
      <h1 className="text-4xl font-bold mb-4 text-center">About Me</h1>
      <p className="text-md text-gray-500 dark:text-gray-400 mt-2 text-center">
        Hello, and thank you for your interest in learning more about me.
      </p>
      <p className="text-md text-gray-500 dark:text-gray-400 mt-2 text-center">
        My professional journey has been a fascinating blend of technology, innovation, and a continuous quest to understand the intricacies of human cognition and computation. Since my early years in the Bronx, New York, where I was born and raised, I've been driven by a curiosity about how things work—particularly how the human brain processes information. This interest led me to pursue a B.A. in Psychology with a Minor in Computer Science at Cornell University. My academic path was enriched by courses ranging from Developmental Psychology to Neural Circuits for Social Behavior and Foundations of Artificial Intelligence.
      </p>
      <p className="text-md text-gray-500 dark:text-gray-400 mt-2 text-center">
        During my time at Cornell, I was deeply involved with CUP Robotics, where I had the opportunity to integrate complex modules into the C1C0 robot—a project that honed my skills in real-time object detection and machine learning. My passion for technology also led me to win first place at the Cornell Animal Health Hackathon with a project focused on improving clinical workflows through enhanced communication platforms. One of my most enduring commitments had been with Tompkins Consolidated Area Transit (TCAT), where I worked as a contract Data Engineer while balancing my academic pursuits. I led software development initiatives that facilitated NTD reporting, cutting time spent preparing NTD reports in half.
      </p>
      <p className="text-md text-gray-500 dark:text-gray-400 mt-2 text-center">
        Professionally, I've contributed as a Software Engineer at aRoboticsCompany, where I developed user interfaces for automated robotic systems and established CI/CD pipelines to enhance developer productivity. Prior to this role, I served as a Research Aide at the Cornell Computational Physiology Lab, exploring bio-inspired algorithms and neuromorphic computing.
      </p>
      <p className="text-md text-gray-500 dark:text-gray-400 mt-2 text-center">
        In addition to these roles, recently, I've engaged in personal projects such as Campaign Master—a companion application for game masters of tabletop roleplaying games—which further exemplifies my passion for creating innovative solutions.
      </p>
      <p className="text-md text-gray-500 dark:text-gray-400 mt-2 text-center">
        Outside of my professional and academic life, I enjoy hiking, sound design, music, and tabletop games. I'm always eager to connect with like-minded individuals who share a passion for technology, creativity, and innovation.
      </p>
      <p className="text-md text-gray-500 dark:text-gray-400 mt-2 text-center">
        Thank you for taking the time to learn more about me. I look forward to connecting with you, and please reach out through the contact page!
      </p>
    </Page>
  );
}
