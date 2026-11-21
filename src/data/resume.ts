export type Role = {
  title: string;
  company: string;
  /** Company website, when there is one. */
  url?: string;
  location?: string;
  /** Display text, e.g. 'Mar 2026'. Omitted when the dates are not known. */
  start?: string;
  /** Display text, or 'Present' for a current role. */
  end?: string;
  partTime?: boolean;
  contract?: boolean;
  /** Bullets; `**text**` marks the phrases the resume sets in bold. */
  highlights: string[];
};

export type ResumeProject = {
  name: string;
  /** Project page, when there is one. */
  url?: string;
  tagline: string;
  repos: { label: string; url: string }[];
  start?: string;
  end?: string;
  /** Bullets; `**text**` marks bold, as in `Role.highlights`. */
  highlights: string[];
};

export type Education = {
  school: string;
  location: string;
  degree: string;
  graduation: string;
  coursework: string[];
};

export const PRESENT = 'Present';

/**
 * Work history shown on the About page, newest first.
 * Mirrors the owner's resume document; keep the wording in sync with it and
 * keep it free of contact details.
 */
export const experience: Role[] = [
  {
    title: 'Software Engineer',
    company: 'Tagup',
    url: 'https://www.tagup.io',
    location: 'New York, NY',
    start: 'Mar 2026',
    end: PRESENT,
    highlights: [
      'Built full-stack features for Manifest, an AI logistics decision platform used by **U.S. Marine Corps** logisticians and maintenance planners; moved from customer delivery to internal R&D.',
      "Contributed to the agent harness and **tool-calling layer** for **Argus**, the platform's conversational AI assistant.",
      'Built **GPU-rendered, cached diagrams** that let users explore **hundreds of thousands of entities** interactively.',
      'Cut database load **~99%** on heavy calculations via a precomputed, background-refreshed cache table.',
      "Served as rotating **release manager** for the launch week of the platform's newest major version, coordinating with the DevOps team; on the legacy platform, shipped a customer-requested feature within my first two weeks.",
    ],
  },
  {
    title: 'Founding Engineer',
    company: 'Saga Healthcare Co',
    url: 'https://mysagahealth.com',
    location: 'New York, NY',
    start: 'Mar 2026',
    end: PRESENT,
    partTime: true,
    highlights: [
      'Built an HSA/FSA platform from scratch at a 3-person startup: **~60% of product code**, **~95% of infra**, **290+ PRs**.',
      'Delivered HSA, FSA and Limited-Purpose FSA flows end to end on a custodial banking API: claims, AI receipt substantiation, reimbursements, rollovers, card management, and KYC/KYB onboarding.',
      'Designed the **AWS platform in Terraform**, hardened for **HIPAA and SOC 2**, with gated releases and **~2,800 tests**.',
      'Shipped employer features: per-employer **SSO via Keycloak/OIDC** with SMS 2FA, a partner API with per-org credentials, and an employer admin dashboard.',
    ],
  },
  {
    title: 'Software Engineer',
    company: 'aRoboticsCompany',
    url: 'https://arcinc.com',
    location: 'Ossining, New York',
    start: 'Sept 2023',
    end: 'June 2025',
    highlights: [
      'Built and deployed **20+ native UI** tools integrated with Python backend services, reducing in-field civil inspection time by 50%.',
      'Designed **high-throughput data post-processing pipelines** handling thousands of sensor files per deployment.',
      'Engineered an **AWS-hosted management platform** (EC2, S3, Lambda, CloudWatch) with **99.9% uptime**, cutting reporting time in half for **50+ users**.',
      'Automated development testing infrastructure, reducing cloud compute costs by **25–40%**.',
    ],
  },
  {
    title: 'Data Engineer',
    company: 'Tompkins Consolidated Area Transit',
    location: 'Ithaca, NY',
    start: 'Sept 2018',
    end: 'Sept 2023',
    contract: true,
    highlights: [
      'Built an **ETL data warehouse** holding hundreds of gigabytes of transit data, used for **federal reporting**.',
      'Analyzed 300+ GB transit datasets using Python and SQL and reconstructed geospatial graphs.',
      'Built pipelines to pull data from SQL views into analysis tools, and helped set goals for the data team.',
    ],
  },
];

/** The resume's Projects section; the rest live on the category pages. */
export const resumeProjects: ResumeProject[] = [
  {
    name: 'Campaign Master',
    tagline: 'AI-enabled TTRPG Planner',
    repos: [{ label: 'CampaignMaster', url: 'https://github.com/gamma2653/CampaignMaster' }],
    start: 'Sept 2025',
    end: PRESENT,
    highlights: [
      'Web app helping game masters plan and run campaigns; AI-assisted, not AI-driven, so users keep creative control.',
    ],
  },
  {
    name: 'C1C0',
    url: 'https://www.cornellcuprobotics.com/projects/c1c0',
    tagline: 'Automated Lab Assistant Robot',
    repos: [
      {
        label: 'c1c0-scheduler',
        url: 'https://github.com/cornell-cup/c1c0-scheduler/commits/master/?author=gamma2653',
      },
      {
        label: 'r2-object_detection',
        url: 'https://github.com/cornell-cup/r2-object_detection/commits/master/?author=gamma2653',
      },
    ],
    highlights: [
      'Halved object-detection inference time (200ms to 100ms per frame) on an NVIDIA Jetson Nano via TensorRT.',
    ],
  },
];

export const education: Education = {
  school: 'Cornell University',
  location: 'Ithaca, New York',
  degree: 'B.A. Psychology (Computational Focus), Minor in Computer Science',
  graduation: 'Class of 2023',
  coursework: [
    'Systems Programming',
    'Artificial Intelligence',
    'Neural Representations',
    'Computational Psychology',
  ],
};

export const activities: { title: string; detail: string; date?: string }[] = [
  {
    title: 'Cornell Cup Robotics',
    detail:
      'Integrated complex modules into the C1C0 robot, developing skills in real-time object detection, facial recognition, and machine learning for autonomous robotics systems.',
    date: 'Jan 2020 – May 2023',
  },
  {
    title: '1st Place - Cornell Animal Health Hackathon',
    detail:
      'Won first place in the "Clinical Workflow & Efficiency" vertical with Encompass, a unified veterinarian health portal.',
    date: 'Jan 2018',
  },
];

/** 'Mar 2026 – Present', or '' when the dates are not known. */
export function dateRange({ start, end }: { start?: string; end?: string }): string {
  return [start, end].filter(Boolean).join(' – ');
}

/** Roles that are still ongoing. */
export function currentRoles(): Role[] {
  return experience.filter((role) => role.end === PRESENT);
}
