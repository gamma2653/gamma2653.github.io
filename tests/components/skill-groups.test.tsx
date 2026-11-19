import { expect, test, describe } from '@rstest/core';
import { screen, within } from '@testing-library/react';
import SkillGroups from '../../src/components/skill-groups';
import { projects } from '../../src/data/projects';
import { renderWithRouter } from '../test-utils';

async function skillItem(group: string, name: string) {
  const list = await screen.findByRole('list', { name: group });
  const item = within(list).getByText(name, { selector: 'span' }).closest('li');
  expect(item).not.toBeNull();
  return item as HTMLElement;
}

describe('SkillGroups', () => {
  test('renders a heading and a list per group', async () => {
    renderWithRouter(<SkillGroups />);
    for (const group of ['Languages', 'Frameworks', 'Tooling']) {
      expect(await screen.findByRole('heading', { level: 3, name: group })).toBeInTheDocument();
      expect(screen.getByRole('list', { name: group })).toBeInTheDocument();
    }
  });

  test('links demonstrating projects to their category page, capped with "+N more"', async () => {
    renderWithRouter(<SkillGroups />);
    const python = await skillItem('Languages', 'Python');
    const pythonProjects = projects.filter((project) => project.tags.includes('Python'));
    const links = within(python).getAllByRole('link');

    expect(links).toHaveLength(Math.min(4, pythonProjects.length));
    links.forEach((link, index) => {
      expect(link).toHaveTextContent(pythonProjects[index].title);
      expect(link.getAttribute('href')).toContain(`/${pythonProjects[index].category}`);
    });
    expect(pythonProjects.length).toBeGreaterThan(4);
    expect(python).toHaveTextContent(`+${pythonProjects.length - 4} more`);
  });

  test('shows the roles a skill was used in as plain text', async () => {
    renderWithRouter(<SkillGroups />);
    const python = await skillItem('Languages', 'Python');
    expect(python).toHaveTextContent('used at aRoboticsCompany, Tompkins Consolidated Area Transit');

    const terraform = await skillItem('Tooling', 'Terraform');
    expect(terraform).toHaveTextContent('used at Saga Healthcare Co');
    expect(within(terraform).queryByRole('link')).not.toBeInTheDocument();
  });

  test('matches projects by the explicit tag', async () => {
    renderWithRouter(<SkillGroups />);
    const react = await skillItem('Frameworks', 'React/React Native');
    expect(within(react).getByRole('link', { name: 'Campaign Master' })).toBeInTheDocument();
  });

  test('shows a skill with no evidence on its own', async () => {
    renderWithRouter(<SkillGroups />);
    const rust = await skillItem('Languages', 'Rust');
    expect(within(rust).queryByRole('link')).not.toBeInTheDocument();
    expect(rust).toHaveTextContent(/^Rust$/);
  });

  test('shows no numeric ratings', async () => {
    renderWithRouter(<SkillGroups />);
    const list = await screen.findByRole('list', { name: 'Languages' });
    expect(list.parentElement?.parentElement).not.toHaveTextContent(/\d+\/10/);
  });
});
