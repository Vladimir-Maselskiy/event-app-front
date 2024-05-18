import { Divider, Flex, Typography } from 'antd';
import { IEvent } from '../../interfaces/interfaces';

interface IProps {
  event: IEvent;
}

const { Link } = Typography;

export const CardContent = ({ event }: IProps) => {
  return (
    <>
      <p style={{ minHeight: 50, fontWeight: 600 }}>{event.description}</p>
      <Divider />
      <p>Organizer: {event.organizer}</p>
      <p>Date: {event.event_date}</p>
      <Flex justify="space-between">
        <Link href={`/register/${event.id}`}>Register</Link>
        <Link href={`/view/${event.id}`}>View</Link>
      </Flex>
    </>
  );
};
