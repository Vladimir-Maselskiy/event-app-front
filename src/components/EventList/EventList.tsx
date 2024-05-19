import { useEffect, useState } from 'react';
import { IEvent } from '../../interfaces/interfaces';
import { getEvents } from '../../utils/api';
import { Card, Divider, List, Skeleton } from 'antd';
import { CardContent } from '../CardContent/CardContent';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useWindowWidth } from '../../hooks/mediascreen';
import { SkeletonLoader } from '../SkeletonLoader/SkeletonLoader';

export const EventList = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [currentEvents, setCurrentEvents] = useState<IEvent[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const { windowWidth } = useWindowWidth();

  // Load more events, pagination
  const loadMoreData = () => {
    setPage(prev => prev + 1);
  };

  // Set current events per page
  useEffect(() => {
    if (!events?.length) return;

    const timerId = setTimeout(() => {
      setCurrentEvents(events.slice(0, page * limit));
    }, 2000);

    return () => clearTimeout(timerId);
  }, [events, page, limit]);

  // Get all events
  useEffect(() => {
    setIsLoading(true);
    getEvents()
      .then(res => {
        setEvents(res);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  // Set count of events per page in dependence of window width
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

  return isLoading || !currentEvents.length ? (
    <SkeletonLoader rows={limit} widthValue={300 / limit} />
  ) : (
    <InfiniteScroll
      dataLength={currentEvents.length}
      next={loadMoreData}
      hasMore={currentEvents.length < 100}
      loader={<SkeletonLoader rows={limit / 3} widthValue={300 / limit} />}
      endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
      scrollableTarget="scrollableDiv"
      style={{ overflowX: 'hidden' }}
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
              style={{
                minWidth: 300,
                maxWidth: '500px',
                margin: '0 auto',
              }}
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
