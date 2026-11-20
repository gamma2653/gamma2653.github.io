import { expect, test, describe } from '@rstest/core';
import {
  caseStudies,
  caseStudiesByCategory,
  caseStudyProjectIds,
  coveredProjects,
} from '../../src/data/case-studies';
import { getProject, type ProjectCategory } from '../../src/data/projects';

const CATEGORIES: ProjectCategory[] = ['software', 'robotics', 'academics'];

describe('case studies data', () => {
  test('are exactly the three flagships, in order', () => {
    expect(caseStudies.map((study) => study.id)).toEqual(['campaign-master', 'habitica-resync', 'c1c0']);
  });

  test('every study has a title, year, summary, problem, built and outcome', () => {
    for (const study of caseStudies) {
      for (const field of [study.title, study.year, study.summary, study.problem, study.built, study.outcome]) {
        expect(field.trim()).not.toBe('');
      }
    }
  });

  test('every study has a valid category', () => {
    for (const study of caseStudies) {
      expect(CATEGORIES).toContain(study.category);
    }
  });

  test('every projectId resolves to a project in the same category', () => {
    for (const study of caseStudies) {
      expect(study.projectIds.length).toBeGreaterThan(0);
      for (const id of study.projectIds) {
        expect(getProject(id)).toBeDefined();
        expect(getProject(id)?.category).toBe(study.category);
      }
      expect(coveredProjects(study).map((project) => project.id)).toEqual(study.projectIds);
    }
  });

  test('no project is covered by two studies', () => {
    const ids = caseStudies.flatMap((study) => study.projectIds);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test('tags, images and links are derived from the covered projects', () => {
    for (const study of caseStudies) {
      const covered = coveredProjects(study);
      expect(study.tags.length).toBeGreaterThan(0);
      expect(new Set(study.tags).size).toBe(study.tags.length);
      for (const project of covered) {
        for (const tag of project.tags) expect(study.tags).toContain(tag);
        for (const image of project.images ?? []) expect(study.images).toContain(image);
        for (const link of project.links ?? []) expect(study.links).toContainEqual(link);
      }
      for (const link of study.links) {
        expect(link.href.startsWith('https://')).toBe(true);
      }
    }
  });

  test('the C1C0 study covers the three Cornell Cup projects and links to the team page', () => {
    const c1c0 = caseStudies.find((study) => study.id === 'c1c0');
    expect(c1c0?.projectIds).toEqual(['c1c0-scheduler', 'r2-object-detection', 'c1c0-facial-recognition']);
    expect(c1c0?.subtitle).toBe('Cornell Cup Robotics');
    expect(c1c0?.images).toHaveLength(1);
    expect(c1c0?.links.map((link) => link.href)).toContain('https://www.cornellcuprobotics.com/projects/c1c0');
    expect(c1c0?.outcome).toMatch(/200 ms to 100 ms/);
  });

  test('caseStudiesByCategory filters by category and keeps the order', () => {
    expect(caseStudiesByCategory('software').map((study) => study.id)).toEqual([
      'campaign-master',
      'habitica-resync',
    ]);
    expect(caseStudiesByCategory('robotics').map((study) => study.id)).toEqual(['c1c0']);
    expect(caseStudiesByCategory('academics')).toEqual([]);
  });

  test('caseStudyProjectIds lists the covered projects of a category', () => {
    expect(caseStudyProjectIds('software')).toEqual(['campaign-master', 'habitica-resync']);
    expect(caseStudyProjectIds('academics')).toEqual([]);
  });
});
