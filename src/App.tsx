import { Flex } from 'antd';
import { EventList } from './components/EventList/EventList';

function App() {
  return (
    <Flex style={{ padding: 40, maxWidth: '1920px', height: '100vh' }}>
      <Flex gap="small" style={{ width: '100%' }}>
        <EventList />
      </Flex>
    </Flex>
  );
}

export default App;
