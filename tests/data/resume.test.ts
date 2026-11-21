import { expect, test, describe } from '@rstest/core';
import { activities, currentRoles, dateRange, education, experience, resumeProjects } from '../../src/data/resume';

describe('resume data', () => {
  test('lists the resume document\'s four roles newest first', () => {
    expect(experience.map((role) => role.company)).toEqual([
      'Tagup',
      'Saga Healthcare Co',
      'aRoboticsCompany',
      'Tompkins Consolidated Area Transit',
    ]);
  });

  test('describes the Argus work as a contribution, not sole authorship', () => {
    const tagup = experience.find((role) => role.company === 'Tagup');
    const argus = tagup?.highlights.filter((highlight) => highlight.includes('Argus'));
    expect(argus).toHaveLength(1);
    expect(argus![0]).toMatch(/^Contributed to the agent harness/);
  });

  test('marks the part-time and contract roles', () => {
    expect(experience.filter((role) => role.partTime).map((role) => role.company)).toEqual(['Saga Healthcare Co']);
    expect(experience.filter((role) => role.contract).map((role) => role.company)).toEqual([
      'Tompkins Consolidated Area Transit',
    ]);
  });

  test('lists the resume projects with their repositories', () => {
    expect(resumeProjects.map((project) => project.name)).toEqual(['Campaign Master', 'C1C0']);
    for (const project of resumeProjects) {
      expect(project.repos.length).toBeGreaterThan(0);
      expect(project.highlights.length).toBeGreaterThan(0);
    }
  });

  test('dateRange joins the known dates', () => {
    expect(dateRange({ start: 'Jan 2024', end: 'Present' })).toBe('Jan 2024 – Present');
    expect(dateRange({})).toBe('');
  });

  test('every role has a title and non-empty highlights', () => {
    for (const role of experience) {
      expect(role.title.trim()).not.toBe('');
      expect(role.highlights.length).toBeGreaterThan(0);
      for (const highlight of role.highlights) {
        expect(highlight.trim()).not.toBe('');
      }
    }
  });

  test('has exactly two current roles, both started in Mar 2026', () => {
    const current = currentRoles();
    expect(current.map((role) => role.company)).toEqual(['Tagup', 'Saga Healthcare Co']);
    for (const role of current) {
      expect(role.start).toBe('Mar 2026');
      expect(role.end).toBe('Present');
    }
    expect(current.find((role) => role.company === 'Saga Healthcare Co')?.partTime).toBe(true);
  });

  test('keeps the dated past roles', () => {
    const arobotics = experience.find((role) => role.company === 'aRoboticsCompany');
    expect(arobotics?.start).toBe('Sept 2023');
    expect(arobotics?.end).toBe('June 2025');
  });

  test('describes the degree', () => {
    expect(education.school).toBe('Cornell University');
    expect(education.degree).toBe('B.A. Psychology (Computational Focus), Minor in Computer Science');
    expect(education.graduation).toBe('Class of 2023');
    expect(education.coursework.length).toBeGreaterThan(0);
  });

  test('carries no contact details', () => {
    const text = JSON.stringify({ experience, education, activities, resumeProjects });
    expect(text).not.toMatch(/\(\d{3}\)\s?\d{3}/);
    expect(text).not.toMatch(/@[a-z0-9-]+\.[a-z]{2,}/i);
  });
});
