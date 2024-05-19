export interface IEvent {
  id: number;
  title: string;
  description: string;
  event_date: string;
  organizer: string;
}

export interface IUser {
  username: string;
  password: string;
  source: string;
  birthday: string;
}
