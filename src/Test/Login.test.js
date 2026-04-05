import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import LoginForm from '../Components/Login'; // Path to your component
import * as router from 'react-router-dom';

// Mock the axios module
jest.mock('axios');
const mockedUsedNavigate = jest.fn();

// 2. Mock the entire module
jest.mock('react-router-dom', () => ({
  // Spread the actual module to keep components like <Link /> working
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));
test('displays error message on incorrect credentials', async () => {
  // 1. Mock a 401 Unauthorized response from the server
   
  axios.post.mockRejectedValueOnce({
    response: {
      status: 401,
      data: { message: 'Invalid email or password' }
    }
  });

  render(<LoginForm />);

  // 2. Simulate user entering incorrect details
  fireEvent.change(screen.getByPlaceholderText(/Email/i), {
    target: { value: 'wrong@test.com' }
  });
  fireEvent.change(screen.getByPlaceholderText(/Password/i), {
    target: { value: 'wrongpass' }
  });

  // 3. Click the login button
  fireEvent.click(screen.getByRole('button', { name: /Login/i }));

  // 4. Wait for the error message to appear in the UI
  const errorMessage = await screen.findByText(/Invalid credentials/i);
  expect(errorMessage).toBeInTheDocument();
  
  // Verify the API was called with the correct details
  expect(axios.post).toHaveBeenCalledWith(expect.any(String), {
    email: 'wrong@test.com',
    password: 'wrongpass'
  });
});
