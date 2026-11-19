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
 * Condensed from the owner's resume; keep it free of contact details.
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
      'Build full-stack features for Manifest, an AI logistics decision platform used by U.S. Marine Corps logisticians and maintenance planners; moved from customer delivery to internal R&D.',
      "Built the agent harness and tool-calling layer for Argus, the platform's conversational AI assistant, and GPU-rendered, cached diagrams that let users explore hundreds of thousands of entities interactively.",
      "Cut database load by about 99% on heavy calculations with a precomputed, background-refreshed cache table, and served as rotating release manager for the launch week of the platform's newest major version.",
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
      'Built an HSA/FSA platform from scratch at a 3-person startup: about 60% of product code, about 95% of infrastructure, 290+ PRs.',
      'Delivered HSA, FSA and Limited-Purpose FSA flows end to end on a custodial banking API: claims, AI receipt substantiation, reimbursements, rollovers, card management and KYC/KYB onboarding.',
      'Designed the AWS platform in Terraform, hardened for HIPAA and SOC 2, with gated releases and about 2,800 tests; shipped per-employer SSO via Keycloak/OIDC with SMS 2FA, a partner API and an employer admin dashboard.',
    ],
  },
  {
    title: 'Software Engineer',
    company: 'aRoboticsCompany',
    url: 'https://arcinc.com',
    location: 'Ossining, NY',
    start: 'Sept 2023',
    end: 'June 2025',
    highlights: [
      'Built and deployed 20+ native UI tools integrated with Python backend services, reducing in-field civil inspection time by 50%.',
      'Designed high-throughput data post-processing pipelines handling thousands of sensor files per deployment.',
      'Engineered an AWS-hosted management platform (EC2, S3, Lambda, CloudWatch) with 99.9% uptime, cutting reporting time in half for 50+ users, and automated development testing infrastructure, reducing cloud compute costs by 25-40%.',
    ],
  },
  {
    title: 'Data Engineer (contract)',
    company: 'Tompkins Consolidated Area Transit',
    location: 'Ithaca, NY',
    start: 'Sept 2018',
    end: 'Sept 2023',
    highlights: [
      'Built an ETL data warehouse holding hundreds of gigabytes of transit data, used for federal reporting; this cut the time spent preparing NTD reports in half.',
      'Analyzed 300+ GB transit datasets using Python and SQL and reconstructed geospatial graphs.',
      'Built pipelines to pull data from SQL views into analysis tools and helped set goals for the data team.',
    ],
  },
  {
    title: 'Research Aide',
    company: 'Computational Physiology Lab, Cornell University',
    start: 'June 2023',
    end: 'Sept 2023',
    highlights: [
      'Refactored legacy codebases, enabling reproducible ligand-binding simulation experiments.',
      'Explored energy-efficient optimization using clustering in spiking neural networks.',
    ],
  },
  {
    title: 'Research Assistant',
    company: 'Cornell B.A.B.Y. Lab',
    highlights: [
      'Contributed to developmental psychology research studying communication development in human infants and songbirds.',
    ],
  },
];

export const education: Education = {
  school: 'Cornell University',
  location: 'Ithaca, NY',
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

/** Roles that are still ongoing. */
export function currentRoles(): Role[] {
  return experience.filter((role) => role.end === PRESENT);
}
