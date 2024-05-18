import { useEffect, useState } from 'react';
import { Flex, List, Card } from 'antd';
import { CardContent } from './components/CardContent/CardContent';
import { IEvent } from './interfaces/interfaces';
import { getEvents } from './utils/api';

function App() {
  const [events, setEvents] = useState<IEvent[]>([]);

  console.log('events', events);

  useEffect(() => {
    getEvents().then(res => {
      console.log('res', res);
      setEvents(res);
    });
  }, []);

  return (
    <Flex style={{ padding: 40, maxWidth: '1920px' }}>
      <Flex gap="small">
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 3,
            xl: 3,
            xxl: 3,
          }}
          dataSource={events}
          renderItem={item => (
            <List.Item>
              <Card
                title={item.title}
                style={{ minWidth: 300, maxWidth: '500px', margin: '0 auto' }}
                styles={{ body: { height: 260 } }}
              >
                <CardContent event={item} />
              </Card>
            </List.Item>
          )}
        ></List>
      </Flex>
    </Flex>
  );
}

export default App;
