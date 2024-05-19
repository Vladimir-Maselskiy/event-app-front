export interface IEvent {
  id: number;
  title: string;
  description: string;
  event_date: string;
  organizer: string;
}

export interface IUser {
  username: string;
  email: string;
  source: string;
  birthday: string;
  registrationDate: string;
}
