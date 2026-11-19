import { expect, test, describe } from '@rstest/core';
import {
  CATEGORY_LABELS,
  featuredProjects,
  getProject,
  projects,
  projectsByCategory,
  type ProjectCategory,
} from '../../src/data/projects';

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
});
