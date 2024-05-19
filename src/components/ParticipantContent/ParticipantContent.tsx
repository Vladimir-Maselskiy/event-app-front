import { Divider, Flex } from 'antd';
import { IUser } from '../../interfaces/interfaces';

interface IProps {
  user: IUser;
}

export const ParticipantContent = ({ user }: IProps) => {
  return (
    <Flex vertical>
      <p>Email: {user.email}</p>
      <Divider />
      <p>BirthDay: {user.birthday}</p>
    </Flex>
  );
};
