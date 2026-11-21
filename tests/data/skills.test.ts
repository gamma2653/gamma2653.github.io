import { expect, test, describe } from '@rstest/core';
import { skillGroups } from '../../src/data/skills';

describe('skills data', () => {
  test('has the resume document\'s three groups in order', () => {
    expect(skillGroups.map((group) => group.name)).toEqual(['Languages', 'Frameworks & Tools', 'Specialized']);
    for (const group of skillGroups) {
      expect(group.skills.length).toBeGreaterThan(0);
    }
  });

  test('lists the languages in the resume\'s order', () => {
    expect(skillGroups[0].skills).toEqual(['Python', 'TypeScript', 'Rust', 'C++', 'SQL']);
  });

  test('skill names are unique', () => {
    const names = skillGroups.flatMap((group) => group.skills);
    expect(new Set(names).size).toBe(names.length);
  });
});
