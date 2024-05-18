import { useState } from 'react';
import { Flex, List, Card } from 'antd';
import data from '../public/mock.json';
import { CardContent } from './CardContent/CardContent';

function App() {
  const [count, setCount] = useState(0);

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
          dataSource={data}
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
