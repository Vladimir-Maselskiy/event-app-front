import { Flex, Image } from 'antd';
import successImage from '../../../public/tasks.svg';

export const ThanksPage = () => {
  return (
    <Flex justify="center">
      <Flex vertical align="center" style={{ width: 320, paddingTop: 40 }}>
        <p>Thank you!</p>
        <p>You have successfully registered for the event</p>
        <Image style={{ width: 300 }} src={successImage} preview={false} />
      </Flex>
    </Flex>
  );
};
