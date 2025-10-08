import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SortControls from './SortControls';
import { isSortType } from '@/lib/utils';

jest.mock('@/lib/utils', () => ({
  isSortType: jest.fn(),
}));

jest.mock('@/types', () => ({
  SortTypeOptions: ['score', 'karma'],
}));

describe('WHEN rendering the SortControls component', () => {
  const mockOnSort = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (isSortType as unknown as jest.Mock).mockReturnValue(true);
  });

  it('THEN should render the label', () => {
    render(<SortControls onSort={mockOnSort} />);
    expect(screen.getByText('Sort by:')).toBeInTheDocument();
  });

  it('THEN should render the select dropdown', () => {
    render(<SortControls onSort={mockOnSort} />);
    expect(screen.getByRole('combobox', { name: /sort by/i })).toBeInTheDocument();
  });

  it('THEN should have "score" as default value', () => {
    render(<SortControls onSort={mockOnSort} />);
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('score');
  });

  it('THEN should render all sort options', () => {
    render(<SortControls onSort={mockOnSort} />);

    expect(screen.getByRole('option', { name: 'Score' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Author Karma' })).toBeInTheDocument();
  });

  it('THEN should call onSort with "score" when score option is selected', async () => {
    const user = userEvent.setup();
    render(<SortControls onSort={mockOnSort} />);

    const select = screen.getByRole('combobox');
    await user.selectOptions(select, 'score');

    expect(isSortType).toHaveBeenCalledWith('score');
    expect(mockOnSort).toHaveBeenCalledWith('score');
  });

  it('THEN should call onSort with "karma" when karma option is selected', async () => {
    const user = userEvent.setup();
    render(<SortControls onSort={mockOnSort} />);

    const select = screen.getByRole('combobox');
    await user.selectOptions(select, 'karma');

    expect(isSortType).toHaveBeenCalledWith('karma');
    expect(mockOnSort).toHaveBeenCalledWith('karma');
  });
});
