import { expect, test, describe } from '@rstest/core';
import {
  CATEGORY_LABELS,
  earlierProjects,
  featuredProjects,
  getProject,
  projects,
  projectsByCategory,
  standardProjects,
  type ProjectCategory,
} from '../../src/data/projects';
import { caseStudies } from '../../src/data/case-studies';

const FILLER = /showcas|demonstrates (the |my )?(ability|skills)|programming skills/i;

const CATEGORIES: ProjectCategory[] = ['software', 'robotics', 'academics'];

const EXPECTED_IDS = [
  'campaign-master',
  'habitica-resync',
  'magiteknician',
  'openvchange',
  'gamma-plugin-tk',
  'tcat-service-journal',
  'storyboard-workshop',
  'blockhider',
  'c1c0-scheduler',
  'r2-object-detection',
  'c1c0-facial-recognition',
  'phone-controlled-robot',
  'c1c0-sounds',
  'odor-sampling',
  'baby-lab',
];

describe('projects data', () => {
  test('ids are unique and kebab-case', () => {
    const ids = projects.map((project) => project.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) {
      expect(id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  test('every project has a title, blurb, valid category and at least one tag', () => {
    for (const project of projects) {
      expect(project.title.trim()).not.toBe('');
      expect(project.blurb.trim()).not.toBe('');
      expect(CATEGORIES).toContain(project.category);
      expect(project.tags.length).toBeGreaterThan(0);
    }
  });

  test('every repo is a GitHub URL', () => {
    for (const project of projects) {
      if (project.repo !== undefined) {
        expect(project.repo.startsWith('https://github.com/')).toBe(true);
      }
    }
  });

  test('contains the expected projects', () => {
    for (const id of EXPECTED_IDS) {
      expect(getProject(id)).toBeDefined();
    }
    expect(getProject('baby-lab')?.repo).toBeUndefined();
    expect(getProject('does-not-exist')).toBeUndefined();
  });

  test('labels every category', () => {
    expect(CATEGORY_LABELS).toEqual({
      software: 'Software',
      robotics: 'Robotics',
      academics: 'Academics',
    });
  });

  test('software and robotics each have a featured project', () => {
    const featured = featuredProjects();
    expect(featured.every((project) => project.featured)).toBe(true);
    expect(featured.some((project) => project.category === 'software')).toBe(true);
    expect(featured.some((project) => project.category === 'robotics')).toBe(true);
  });

  test('projectsByCategory returns only that category, featured first, then newest first', () => {
    for (const category of CATEGORIES) {
      const list = projectsByCategory(category);
      expect(list.length).toBe(projects.filter((p) => p.category === category).length);
      expect(list.every((project) => project.category === category)).toBe(true);

      const firstPlain = list.findIndex((project) => !project.featured);
      if (firstPlain !== -1) {
        expect(list.slice(firstPlain).some((project) => project.featured)).toBe(false);
      }

      for (const group of [list.filter((p) => p.featured), list.filter((p) => !p.featured)]) {
        const years = group.map((project) => project.startYear ?? -Infinity);
        expect(years).toEqual([...years].sort((a, b) => b - a));
      }
    }
  });

  test('projectsByCategory does not reorder the source list', () => {
    const before = projects.map((project) => project.id);
    projectsByCategory('software');
    expect(projects.map((project) => project.id)).toEqual(before);
  });

  test('the Java and Minecraft projects are in the earlier tier', () => {
    expect(getProject('storyboard-workshop')?.tier).toBe('earlier');
    expect(getProject('blockhider')?.tier).toBe('earlier');
    expect(projects.filter((project) => project.tier === 'earlier')).toHaveLength(2);
  });

  test('earlierProjects returns only the earlier tier of a category, newest first', () => {
    expect(earlierProjects('software').map((project) => project.id)).toEqual(['storyboard-workshop', 'blockhider']);
    expect(earlierProjects('robotics')).toEqual([]);
    expect(earlierProjects('academics')).toEqual([]);
  });

  test('standardProjects leaves out the earlier tier and any excluded ids', () => {
    for (const category of CATEGORIES) {
      const standard = standardProjects(category);
      expect(standard.every((project) => project.category === category && project.tier !== 'earlier')).toBe(true);
      expect(standard.length + earlierProjects(category).length).toBe(projectsByCategory(category).length);
    }
    const ids = standardProjects('software', ['campaign-master', 'habitica-resync']).map((project) => project.id);
    expect(ids).toEqual(['openvchange', 'gamma-plugin-tk', 'magiteknician', 'tcat-service-journal']);
  });

  test('no blurb or case-study text uses filler phrasing', () => {
    for (const project of projects) {
      expect(project.blurb).not.toMatch(FILLER);
      expect(project.tagline ?? '').not.toMatch(FILLER);
    }
    for (const study of caseStudies) {
      for (const field of [study.summary, study.problem, study.built, study.outcome, study.subtitle ?? '']) {
        expect(field).not.toMatch(FILLER);
      }
    }
  });
});
