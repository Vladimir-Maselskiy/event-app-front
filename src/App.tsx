import { Flex } from 'antd';
import { EventList } from './components/EventList/EventList';

function App() {
  return (
    <Flex style={{ padding: 40, maxWidth: '1920px' }}>
      <Flex gap="small">
        <EventList />
      </Flex>
    </Flex>
  );
}

export default App;
