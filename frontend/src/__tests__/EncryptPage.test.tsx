import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import EncryptPage from '../components/EncryptPage';
import { vi } from 'vitest';

// Mock axios
vi.mock('axios');
const mockedAxios = axios as any;

describe('EncryptPage', () => {
  beforeEach(() => {
    mockedAxios.post.mockClear();
  });

  test('renders form elements', () => {
    render(<EncryptPage />);
    expect(screen.getByLabelText(/plaintext/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /encrypt/i })).toBeInTheDocument();
  });

  test('submits form and displays result', async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: { encrypted: 'encrypted::data' } });

    render(<EncryptPage />);

    fireEvent.change(screen.getByLabelText(/plaintext/i), { target: { value: 'test text' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /encrypt/i }));

    await waitFor(() => {
      expect(screen.getByText('Encrypted Result:')).toBeInTheDocument();
    });

    expect(mockedAxios.post).toHaveBeenCalledWith('/api/encrypt', { plaintext: 'test text', password: 'password' });
  });

  test('displays error on failure', async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error('Network error'));

    render(<EncryptPage />);

    fireEvent.change(screen.getByLabelText(/plaintext/i), { target: { value: 'test' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'pass' } });
    fireEvent.click(screen.getByRole('button', { name: /encrypt/i }));

    await waitFor(() => {
      expect(screen.getByText(/encryption failed/i)).toBeInTheDocument();
    });
  });
});