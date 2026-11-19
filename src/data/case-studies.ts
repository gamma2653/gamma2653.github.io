import { getProject, type Project, type ProjectCategory, type ProjectLink } from './projects';

export type CaseStudy = {
  /** Unique kebab-case slug. */
  id: string;
  title: string;
  subtitle?: string;
  category: ProjectCategory;
  /** Display text, e.g. '2025 - present'. */
  year: string;
  /** One sentence for compact cards. */
  summary: string;
  /** 1-3 sentences each. */
  problem: string;
  built: string;
  outcome: string;
  /** Projects in src/data/projects.ts this study covers. */
  projectIds: string[];
  tags: string[];
  images?: string[];
  /** External links other than the covered projects' repositories. */
  links: ProjectLink[];
};

type CaseStudyInput = Omit<CaseStudy, 'tags' | 'images' | 'links'> & {
  /** Added after the covered projects' tags. */
  extraTags?: string[];
  /** Added after the covered projects' links. */
  extraLinks?: ProjectLink[];
};

function unique<T>(items: T[], key: (item: T) => unknown = (item) => item): T[] {
  const seen = new Set<unknown>();
  return items.filter((item) => {
    const k = key(item);
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

/** The projects a case study covers, in `projectIds` order. */
export function coveredProjects(study: Pick<CaseStudy, 'projectIds'>): Project[] {
  return study.projectIds
    .map((id) => getProject(id))
    .filter((project): project is Project => project !== undefined);
}

/** Fills in tags, images and links from the covered projects so they are not written twice. */
function defineCaseStudy({ extraTags = [], extraLinks = [], ...study }: CaseStudyInput): CaseStudy {
  const covered = coveredProjects(study);
  const images = unique(covered.flatMap((project) => project.images ?? []));
  return {
    ...study,
    tags: unique([...covered.flatMap((project) => project.tags), ...extraTags]),
    images: images.length > 0 ? images : undefined,
    links: unique([...covered.flatMap((project) => project.links ?? []), ...extraLinks], (link) => link.href),
  };
}

/**
 * The flagship projects, written up as problem / what was built / outcome.
 * Every statement here comes from a project README, its GitHub releases,
 * the earlier site copy or the owner's resume. Do not add outcomes that
 * none of those sources back.
 */
export const caseStudies: CaseStudy[] = [
  defineCaseStudy({
    id: 'campaign-master',
    title: 'Campaign Master',
    subtitle: 'AI-enabled TTRPG planner',
    category: 'software',
    year: '2025 - present',
    summary:
      'A companion app for tabletop game masters that separates planning a campaign from running it with players.',
    problem:
      'Running a tabletop RPG campaign is two different jobs: preparing it, and running the session with players. A plan also has to survive contact with the players, so it cannot be a fixed script.',
    built:
      'A companion app where a game master plans a campaign as story points and then executes that plan in session, modifying it on the fly, spinning off new branches and marking story points as executed. It runs either as a Qt desktop GUI or as a FastAPI web server with a React and TypeScript frontend. It is AI-assisted rather than AI-driven, so the game master keeps creative control.',
    outcome:
      'In development since September 2025, with both run modes working and each one packageable as a standalone executable. Seven releases, v1.0.0 through v1.3.0, went out in February 2026. A rules framework for additional game mechanics and MCP compliance are planned.',
    projectIds: ['campaign-master'],
  }),
  defineCaseStudy({
    id: 'habitica-resync',
    title: 'Habitica-Resync',
    subtitle: 'Obsidian plugin',
    category: 'software',
    year: '2025 - 2026',
    summary:
      'An Obsidian plugin that keeps Habitica tasks in sync with a vault, written from scratch after the original plugin stopped building.',
    problem:
      'The existing habitica-sync plugin for Obsidian was deprecated and no longer built.',
    built:
      'A plugin written from scratch, with no code from the original, that works in two modes. Notes mode keeps real .md files in sync with Habitica and is compatible with Obsidian Tasks; Pane mode manages tasks from a React sidebar pane with no managed files. A configurable request timeout and a rate-limit buffer keep it within Habitica\'s limit of 30 requests per minute.',
    outcome:
      'A working spiritual successor to habitica-sync. Pane mode is the closest match for people coming from the original plugin, and Notes mode is the one to use alongside Obsidian Tasks.',
    projectIds: ['habitica-resync'],
  }),
  defineCaseStudy({
    id: 'c1c0',
    title: 'C1C0 lab-assistant robot',
    subtitle: 'Cornell Cup Robotics',
    category: 'robotics',
    year: '2020 - 2023',
    summary:
      'Integration and computer vision for a lab-assistant robot, including object detection made twice as fast on an NVIDIA Jetson Nano.',
    problem:
      'C1C0 is a lab-assistant robot whose subsystems (locomotion, arm control, object detection and facial recognition) each ran separately and had to be coordinated.',
    built:
      'A scheduler that is the communication hub between subsystems, each of which has a client file and a specification file telling the scheduler how to handle its messages. Object detection runs on TensorFlow\'s SSD MobileNet V1 COCO model, and the facial recognition interface recognizes and learns faces against a cache.',
    outcome:
      'Object-detection inference time was halved, from 200 ms to 100 ms per frame, on an NVIDIA Jetson Nano using TensorRT. Models trained on the COCO dataset reached 80-90% accuracy depending on the target.',
    projectIds: ['c1c0-scheduler', 'r2-object-detection', 'c1c0-facial-recognition'],
    extraTags: ['TensorRT', 'NVIDIA Jetson Nano'],
    extraLinks: [{ label: 'C1C0 at Cornell Cup Robotics', href: 'https://www.cornellcuprobotics.com/projects/c1c0' }],
  }),
];

export function caseStudiesByCategory(category: ProjectCategory): CaseStudy[] {
  return caseStudies.filter((study) => study.category === category);
}

/** Ids of every project covered by a case study in the category. */
export function caseStudyProjectIds(category: ProjectCategory): string[] {
  return caseStudiesByCategory(category).flatMap((study) => study.projectIds);
}
