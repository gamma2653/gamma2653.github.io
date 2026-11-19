import { expect, test, describe } from '@rstest/core';
import { projects } from '../../src/data/projects';
import { experience } from '../../src/data/resume';
import { projectsForSkill, skillGroups } from '../../src/data/skills';

const allSkills = skillGroups.flatMap((group) => group.skills);

describe('skills data', () => {
  test('has the three groups in order', () => {
    expect(skillGroups.map((group) => group.name)).toEqual(['Languages', 'Frameworks', 'Tooling']);
    for (const group of skillGroups) {
      expect(group.skills.length).toBeGreaterThan(0);
    }
  });

  test('skill names are unique', () => {
    const names = allSkills.map((skill) => skill.name);
    expect(new Set(names).size).toBe(names.length);
  });

  test('projectsForSkill matches project tags', () => {
    const python = projectsForSkill({ name: 'Python' });
    expect(python.length).toBeGreaterThan(0);
    expect(python).toEqual(projects.filter((project) => project.tags.includes('Python')));
  });

  test('projectsForSkill prefers the explicit tag over the name', () => {
    const react = allSkills.find((skill) => skill.tag === 'React');
    expect(react).toBeDefined();
    expect(projectsForSkill(react!).length).toBeGreaterThan(0);
    expect(projectsForSkill({ name: 'React', tag: 'No Such Tag' })).toEqual([]);
  });

  test('skills without a demonstrating project have no invented tie', () => {
    for (const name of ['Rust', 'Docker', 'Kubernetes']) {
      const skill = allSkills.find((candidate) => candidate.name === name);
      expect(skill).toBeDefined();
      expect(projectsForSkill(skill!)).toEqual([]);
      expect(skill!.roles).toBeUndefined();
    }
  });

  test('every role is a company in the experience list', () => {
    const companies = experience.map((role) => role.company);
    for (const skill of allSkills) {
      for (const company of skill.roles ?? []) {
        expect(companies).toContain(company);
      }
    }
  });
});
