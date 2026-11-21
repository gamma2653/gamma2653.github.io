import { expect, test, describe } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import SkillGroups from '../../src/components/skill-groups';
import { skillGroups } from '../../src/data/skills';

describe('SkillGroups', () => {
  test('renders one line per group: the name, then its skills in bold', () => {
    render(<SkillGroups />);
    const items = screen.getAllByRole('listitem');
    expect(items.map((item) => item.textContent)).toEqual(
      skillGroups.map((group) => `${group.name}: ${group.skills.join(', ')}`),
    );
    expect(items[0]).toHaveTextContent('Languages: Python, TypeScript, Rust, C++, SQL');
    expect(items[0].querySelector('strong')).toHaveTextContent('Python, TypeScript, Rust, C++, SQL');
  });

  test('shows no numeric ratings', () => {
    render(<SkillGroups />);
    expect(screen.getByRole('list')).not.toHaveTextContent(/\d+\/10/);
  });
});
