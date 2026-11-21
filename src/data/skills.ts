export type SkillGroup = {
  name: string;
  skills: string[];
};

/**
 * The resume's "Skills & Frameworks" lines, in the resume's order.
 * Mirrors the owner's resume document; keep it in sync with it.
 */
export const skillGroups: SkillGroup[] = [
  {
    name: 'Languages',
    skills: ['Python', 'TypeScript', 'Rust', 'C++', 'SQL'],
  },
  {
    name: 'Frameworks & Tools',
    skills: [
      'FastAPI',
      'Next.js',
      'React/React Native',
      'SQLAlchemy/Postgres',
      'Celery',
      'AWS',
      'Terraform',
      'Docker',
      'Kubernetes',
      'GitHub Actions',
      'Keycloak/OIDC',
    ],
  },
  {
    name: 'Specialized',
    skills: ['LLM agent tooling', 'backend systems', 'cloud infrastructure', 'HIPAA/SOC 2', 'ETL pipelines'],
  },
];
