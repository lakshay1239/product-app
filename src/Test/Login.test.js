import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import LoginForm from '../Components/Login'; // Path to your component
import * as router from 'react-router-dom';


jest.mock('axios');
const mockedUsedNavigate = jest.fn();


jest.mock('react-router-dom', () => ({
  
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));
test('displays error message on incorrect credentials', async () => {

   
  axios.post.mockRejectedValueOnce({
    response: {
      status: 401,
      data: { message: 'Invalid email or password' }
    }
  });

  render(<LoginForm />);

  
  fireEvent.change(screen.getByPlaceholderText(/Email/i), {
    target: { value: 'wrong@test.com' }
  });
  fireEvent.change(screen.getByPlaceholderText(/Password/i), {
    target: { value: 'wrongpass' }
  });

  
  fireEvent.click(screen.getByRole('button', { name: /Login/i }));

 
  const errorMessage = await screen.findByText(/Invalid credentials/i);
  expect(errorMessage).toBeInTheDocument();
  
 
  expect(axios.post).toHaveBeenCalledWith(expect.any(String), {
    email: 'wrong@test.com',
    password: 'wrongpass'
  });
});
