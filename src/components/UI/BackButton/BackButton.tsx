import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const onBackButtonClick = () => {
  window.history.back();
};

export const BackButton = () => {
  return (
    <Button
      type="primary"
      style={{ width: 300, margin: '0 auto' }}
      onClick={onBackButtonClick}
      icon={<ArrowLeftOutlined />}
    >
      Back to Events
    </Button>
  );
};
