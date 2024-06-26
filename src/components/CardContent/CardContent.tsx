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
        <Link href={`/register?eventId=${event.id}&eventTitle=${event.title}`}>
          Register
        </Link>
        <Link href={`/view?eventId=${event.id}&eventTitle=${event.title}`}>
          View
        </Link>
      </Flex>
    </>
  );
};
