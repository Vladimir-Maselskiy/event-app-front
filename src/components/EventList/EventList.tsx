import { useEffect, useState } from 'react';
import { IEvent } from '../../interfaces/interfaces';
import { getEvents } from '../../utils/api';
import { Card, Divider, List } from 'antd';
import { CardContent } from '../CardContent/CardContent';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useWindowWidth } from '../../hooks/mediascreen';

export const EventList = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [currentEvents, setCurrentEvents] = useState<IEvent[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [hasMore, setHasMore] = useState(true);

  const { windowWidth } = useWindowWidth();

  const loadMoreData = () => {
    setPage(prev => prev + 1);
  };

  useEffect(() => {
    if (!events?.length) return;
    const timerId = setTimeout(() => {
      setCurrentEvents(events.slice(0, page * limit));
    }, 2000);

    return () => clearTimeout(timerId);
  }, [events, page, limit]);

  useEffect(() => {
    getEvents().then(res => {
      setEvents(res);
    });
  }, []);

  useEffect(() => {
    console.log('useEffect windowWidth');
    if (windowWidth >= 992) {
      setLimit(9);
    } else if (windowWidth >= 768) {
      setLimit(6);
    } else {
      setLimit(3);
    }
    setPage(1);
  }, [windowWidth]);

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
