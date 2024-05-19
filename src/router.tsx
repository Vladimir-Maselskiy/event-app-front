import { createBrowserRouter } from 'react-router-dom';
import { Register } from './components/Register/Register';
import App from './App';
import { Participant } from './components/ParticipantList/ParticipantList';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/view',
    element: <Participant />,
  },
]);
