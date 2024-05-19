import { useEffect, useState } from 'react';
import { IEvent } from '../../interfaces/interfaces';
import { getEvents } from '../../utils/api';
import { Card, Divider, List } from 'antd';
import { CardContent } from '../CardContent/CardContent';
import InfiniteScroll from 'react-infinite-scroll-component';

export const EventList = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [currentEvents, setCurrentEvents] = useState<IEvent[]>([]);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const loadMoreData = () => {
    setPage(prev => prev + 1);
  };

  useEffect(() => {
    if (!events?.length) return;
    console.log('events in useEffect');
    console.log('page', page);
    setCurrentEvents(events.slice(0, page * limit));
  }, [events, page, limit]);

  useEffect(() => {
    getEvents().then(res => {
      setEvents(res);
    });
  }, []);

  return (
    <InfiniteScroll
      dataLength={currentEvents.length}
      next={loadMoreData}
      hasMore={currentEvents.length < 50}
      // loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
      loader={<p style={{ textAlign: 'center' }}>Loading...</p>}
      endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
      scrollableTarget="scrollableDiv"
    >
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
        dataSource={currentEvents}
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
    </InfiniteScroll>
  );
};
