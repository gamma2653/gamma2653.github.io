import campaign_master1 from '../assets/images/software/campaign_master1.webp';
import campaign_master2 from '../assets/images/software/campaign_master2.webp';
import campaign_master_gui1 from '../assets/images/software/campaign_master_gui1.webp';
import campaign_master_gui2 from '../assets/images/software/campaign_master_gui2.webp';
import campaign_master_gui3 from '../assets/images/software/campaign_master_gui3.webp';
import habitica_resync1 from '../assets/images/software/habitica_resync1.webp';
import habitica_resync2 from '../assets/images/software/habitica_resync2.webp';
import habitica_resync3 from '../assets/images/software/habitica_resync3.webp';
import storyboard from '../assets/images/portfolio/storyboard.webp';
import c1c0_collage from '../assets/images/portfolio/c1c0_collage.webp';

export type ProjectCategory = 'software' | 'robotics' | 'academics';

export type ProjectLink = { label: string; href: string };

export type Project = {
  /** Unique kebab-case slug. */
  id: string;
  title: string;
  /** Short qualifier, e.g. 'AI-enabled TTRPG planner'. */
  tagline?: string;
  /** 1-3 plain sentences. */
  blurb: string;
  category: ProjectCategory;
  /** Tech chips. Keep the canonical spellings already used in this file. */
  tags: string[];
  /** Display text, e.g. '2025 - present', '2016'. */
  year?: string;
  /** Used for sorting only. */
  startYear?: number;
  /** e.g. 'Cornell Cup Robotics'. */
  org?: string;
  /** https://github.com/... URL. */
  repo?: string;
  /** Other external links. */
  links?: ProjectLink[];
  /** Imported asset URLs; images[0] is the thumbnail. */
  images?: string[];
  featured?: boolean;
  /** 'earlier' moves the project to the compact "Earlier work" row. Absent means 'standard'. */
  tier?: 'standard' | 'earlier';
};

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  software: 'Software',
  robotics: 'Robotics',
  academics: 'Academics',
};

const CORNELL_CUP = 'Cornell Cup Robotics';

/**
 * Every project shown on the Software, Robotics and Academics pages.
 * To add a project, add an entry here; the pages render from this list.
 */
export const projects: Project[] = [
  // Software
  {
    id: 'campaign-master',
    title: 'Campaign Master',
    tagline: 'AI-enabled TTRPG planner',
    blurb:
      'A companion app for tabletop game masters that separates planning a campaign from running it with players. It runs either as a Qt desktop GUI or as a FastAPI web server with a React frontend.',
    category: 'software',
    tags: ['Python', 'FastAPI', 'Pydantic', 'React', 'TypeScript', 'TanStack', 'Tailwind CSS', 'Qt'],
    year: '2025 - present',
    startYear: 2025,
    repo: 'https://github.com/gamma2653/CampaignMaster',
    images: [campaign_master_gui1, campaign_master_gui2, campaign_master_gui3, campaign_master1, campaign_master2],
    featured: true,
  },
  {
    id: 'habitica-resync',
    title: 'Habitica-Resync',
    tagline: 'Obsidian plugin',
    blurb:
      'An Obsidian plugin that extends Obsidian Tasks to interoperate with Habitica. Notes mode keeps real .md files in sync with Habitica, and Pane mode manages tasks from a sidebar pane. It is the spiritual successor to SuperChamp234\'s habitica-sync plugin.',
    category: 'software',
    tags: ['TypeScript', 'React', 'Obsidian API'],
    year: '2025 - 2026',
    startYear: 2025,
    repo: 'https://github.com/gamma2653/habitica-resync',
    links: [{ label: 'Original habitica-sync', href: 'https://github.com/SuperChamp234/habitica-sync' }],
    images: [habitica_resync1, habitica_resync2, habitica_resync3],
    featured: true,
  },
  {
    id: 'magiteknician',
    title: 'Magiteknician',
    tagline: 'Godot rhythm game',
    blurb:
      'A rhythm game about casting spells: you strike a spell\'s runes in order and in rhythm, at a tempo you choose, and duel other casters in real time. It has a campaign of nine duels, a practice mode and a hosted versus mode. Built with Godot 4.7 and GDScript.',
    category: 'software',
    tags: ['Godot', 'GDScript'],
    year: '2025 - present',
    startYear: 2025,
    repo: 'https://github.com/gamma2653/Magiteknician',
  },
  {
    id: 'openvchange',
    title: 'OpenVChange',
    tagline: 'Real-time voice changer',
    blurb:
      'A real-time voice changer and audio router for Windows. It runs audio from an input device through a chain of effects (gate, filters, EQ, de-esser, compressor, pitch and formant shifting) and sends the result to an output device. Pointed at a virtual audio cable, the output becomes the microphone of any other application.',
    category: 'software',
    tags: ['Python', 'Audio DSP'],
    year: '2026',
    startYear: 2026,
    repo: 'https://github.com/gamma2653/OpenVChange',
    links: [{ label: 'Releases', href: 'https://github.com/gamma2653/OpenVChange/releases' }],
  },
  {
    id: 'gamma-plugin-tk',
    title: 'GammaPluginTk',
    tagline: 'Claude Code plugin marketplace',
    blurb:
      'A small Claude Code plugin marketplace. It includes a per-language format-on-edit hook and a two-line statusline, alongside pr-review, research-brief and stack-build plugins.',
    category: 'software',
    tags: ['Claude Code', 'Python', 'PowerShell', 'Shell'],
    year: '2026',
    startYear: 2026,
    repo: 'https://github.com/gamma2653/GammaPluginTk',
  },
  {
    id: 'tcat-service-journal',
    title: 'TCAT Service Journal',
    blurb:
      'An ETL (Extract, Transform, Load) framework for analyzing Automatic Vehicle Location (AVL) data from TCAT (Tompkins Consolidated Area Transit) buses. It journals transit bus activity for analysis across multi-year datasets.',
    category: 'software',
    tags: ['Python', 'ETL', 'SQL', 'Makefile'],
    year: '2019 - 2023',
    startYear: 2019,
    repo: 'https://github.com/gamma2653/TCAT_Service_Journal',
  },
  {
    id: 'storyboard-workshop',
    title: 'StoryBoardWorkshop',
    blurb:
      'A Java application for creative storytelling and storyboard planning.',
    category: 'software',
    tags: ['Java'],
    year: '2018 - 2019',
    startYear: 2018,
    repo: 'https://github.com/gamma2653/StoryBoardWorkshop',
    images: [storyboard],
    tier: 'earlier',
  },
  {
    id: 'blockhider',
    title: 'BlockHider',
    tagline: 'Minecraft plugin',
    blurb:
      'A Minecraft server plugin that adds a hide-and-seek game mode, built on the Spigot/Bukkit API.',
    category: 'software',
    tags: ['Java', 'Spigot/Bukkit', 'Maven'],
    year: '2016',
    startYear: 2016,
    repo: 'https://github.com/gamma2653/BlockHider',
    tier: 'earlier',
  },

  // Robotics
  {
    id: 'c1c0-scheduler',
    title: 'C1C0 Scheduler',
    blurb:
      'The integration hub for the C1C0 robot. It handles communication between subsystems such as locomotion, arm control and facial recognition, each of which has a client file and a specification file telling the scheduler how to handle its messages.',
    category: 'robotics',
    tags: ['Python', 'Makefile'],
    year: '2020 - 2023',
    startYear: 2020,
    org: CORNELL_CUP,
    repo: 'https://github.com/cornell-cup/c1c0-scheduler',
    images: [c1c0_collage],
    featured: true,
  },
  {
    id: 'r2-object-detection',
    title: 'R2 Object Detection',
    blurb:
      'Dynamic object detection using the camera on the robot. Built on the TensorFlow Object Detection API with the SSD MobileNet V1 COCO pre-trained model.',
    category: 'robotics',
    tags: ['Python', 'TensorFlow', 'Computer Vision'],
    year: '2020 - 2023',
    startYear: 2020,
    org: CORNELL_CUP,
    repo: 'https://github.com/cornell-cup/r2-object_detection',
    featured: true,
  },
  {
    id: 'c1c0-facial-recognition',
    title: 'C1C0 Facial Recognition',
    blurb:
      'Recognition and learning of faces for the C1C0 robot, driven through a terminal command interface. Recognition and learning commands compare against and add to a cache to improve efficiency.',
    category: 'robotics',
    tags: ['Python', 'Computer Vision'],
    year: '2020 - 2023',
    startYear: 2020,
    org: CORNELL_CUP,
    repo: 'https://github.com/cornell-cup/c1c0-facial-recognition',
  },
  {
    id: 'phone-controlled-robot',
    title: 'Phone-Controlled Robot Arm',
    blurb:
      'An Arduino robot arm controlled from a phone over Bluetooth. It updates an original design by Dejan from howtomechatronics.com: serial data from the HC-06 module had no indication of where one line ended and the next began, so this version adds line delimiters and tidies the code.',
    category: 'robotics',
    tags: ['Arduino', 'C++'],
    year: '2020',
    startYear: 2020,
    repo: 'https://github.com/gamma2653/PhoneControlledRobot',
    links: [
      {
        label: 'Original design',
        href: 'https://howtomechatronics.com/tutorials/arduino/diy-arduino-robot-arm-with-smartphone-control/',
      },
    ],
  },
  {
    id: 'c1c0-sounds',
    title: 'C1C0 Sounds',
    tagline: 'Morse code to dynamic chirps',
    blurb:
      'A small script that converts Morse code into dynamic chirps, written as a demo experiment for the C1C0 robot.',
    category: 'robotics',
    tags: ['Python'],
    year: '2022',
    startYear: 2022,
    repo: 'https://github.com/gamma2653/c1c0_sounds',
  },

  // Academics
  {
    id: 'odor-sampling',
    title: 'Odor Sampling Model',
    blurb:
      'A computational model of physicochemical odor sampling by animal olfactory systems. Experiments are configured in YAML to model how animals sample and process odors.',
    category: 'academics',
    tags: ['Python', 'YAML', 'Makefile'],
    year: '2023 - 2024',
    startYear: 2023,
    repo: 'https://github.com/gamma2653/odorsampling',
  },
  {
    id: 'baby-lab',
    title: 'Research Assistant - Cornell B.A.B.Y. Lab',
    tagline: 'Behavioral Analysis of Beginning Years Laboratory',
    blurb:
      'Served as a research assistant at the Cornell B.A.B.Y. Lab, part of the Eleanor J. Gibson Laboratory of Developmental Psychology, directed by Dr. Michael Goldstein. The lab takes a comparative approach to communication and social learning, studying both human infant communication development and songbird vocal learning.',
    category: 'academics',
    tags: ['Developmental Psychology'],
    links: [{ label: 'Lab website', href: 'https://babylab.cornell.edu' }],
  },
];

/** Projects in one category: featured first, then newest `startYear` first. */
export function projectsByCategory(category: ProjectCategory): Project[] {
  return projects
    .filter((project) => project.category === category)
    .sort(
      (a, b) =>
        Number(b.featured ?? false) - Number(a.featured ?? false) ||
        (b.startYear ?? -Infinity) - (a.startYear ?? -Infinity),
    );
}

/**
 * Projects for a category's main grid: everything in `projectsByCategory`
 * except the 'earlier' tier and any id in `excludeIds` (for example the
 * projects a case study already covers).
 */
export function standardProjects(category: ProjectCategory, excludeIds: string[] = []): Project[] {
  return projectsByCategory(category).filter(
    (project) => project.tier !== 'earlier' && !excludeIds.includes(project.id),
  );
}

/** The 'earlier' tier of a category, newest first. */
export function earlierProjects(category: ProjectCategory): Project[] {
  return projectsByCategory(category).filter((project) => project.tier === 'earlier');
}

export function featuredProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

export function getProject(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}
