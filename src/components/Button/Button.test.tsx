import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Button } from './Button';

describe('Button', () => {
  it('renders with provided label', () => {
    render(<Button>Reservar</Button>);
    expect(screen.getByRole('button', { name: /reservar/i })).toBeInTheDocument();
  });

  it('supports variants', () => {
    render(
      <Button variant="ghost" data-testid="button">
        Fantasma
      </Button>
    );
    const button = screen.getByTestId('button');
    expect(button.dataset.variant).toBe('ghost');
  });

  it('indicates loading state accessibly', () => {
    render(
      <Button isLoading loadingLabel="Cargando reserva">
        Espera
      </Button>
    );

    const button = screen.getByRole('button', { name: /cargando reserva/i });
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toBeDisabled();
  });

  it('triggers onClick when enabled', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Acción</Button>);
    fireEvent.click(screen.getByRole('button', { name: /acción/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
