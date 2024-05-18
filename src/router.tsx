import { createBrowserRouter } from 'react-router-dom';
import { Register } from './components/Register/Register';
import App from './App';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/register/:id',
    element: <Register />,
  },
]);
