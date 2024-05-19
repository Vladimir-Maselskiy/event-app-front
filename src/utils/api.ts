import { IUser } from '../interfaces/interfaces';

// const API = 'https://event-app-back.onrender.com/api';
const API = 'http://localhost:3000/api';
export const getEvents = async () => {
  try {
    const res = await fetch(`${API}/events`).then(res => res.json());
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const createRegistration = async (data: {
  user: IUser;
  eventId: number;
  registrationDate: string;
}) => {
  const { user, eventId, registrationDate } = data;
  const body = { ...user, eventId, registrationDate };
  try {
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    const res = await fetch(`${API}/registrations`, params).then(res =>
      res.json()
    );
  } catch (error) {
    console.log(error);
  }
};

export const getParticipants = async (eventId: string) => {
  try {
    const res = await fetch(`${API}/registrations/${eventId}`).then(res => res.json());
    return res as IUser[] | [];
  } catch (error) {
    console.log(error);
    return [];
  }
};
