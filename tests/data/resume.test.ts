import { expect, test, describe } from '@rstest/core';
import { activities, currentRoles, education, experience } from '../../src/data/resume';

describe('resume data', () => {
  test('lists the six roles newest first', () => {
    expect(experience.map((role) => role.company)).toEqual([
      'Tagup',
      'Saga Healthcare Co',
      'aRoboticsCompany',
      'Tompkins Consolidated Area Transit',
      'Computational Physiology Lab, Cornell University',
      'Cornell B.A.B.Y. Lab',
    ]);
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
    const babyLab = experience.find((role) => role.company === 'Cornell B.A.B.Y. Lab');
    expect(babyLab?.start).toBeUndefined();
    expect(babyLab?.end).toBeUndefined();
  });

  test('describes the degree', () => {
    expect(education.school).toBe('Cornell University');
    expect(education.degree).toBe('B.A. Psychology (Computational Focus), Minor in Computer Science');
    expect(education.graduation).toBe('Class of 2023');
    expect(education.coursework.length).toBeGreaterThan(0);
  });

  test('carries no contact details', () => {
    const text = JSON.stringify({ experience, education, activities });
    expect(text).not.toMatch(/\(\d{3}\)\s?\d{3}/);
    expect(text).not.toMatch(/@[a-z0-9-]+\.[a-z]{2,}/i);
  });
});
