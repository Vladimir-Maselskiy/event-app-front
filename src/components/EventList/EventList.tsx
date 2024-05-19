import { useEffect, useState } from 'react';
import { IEvent } from '../../interfaces/interfaces';
import { getEvents } from '../../utils/api';
import { Card, Divider, Flex, List } from 'antd';
import { CardContent } from '../CardContent/CardContent';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useWindowWidth } from '../../hooks/mediascreen';
import { SkeletonLoader } from '../SkeletonLoader/SkeletonLoader';
import { EventsFilter } from '../EventsFilter/EventsFilter';

export const EventList = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [sortedEvents, setSoretedEvents] = useState<IEvent[]>([]);
  const [currentEvents, setCurrentEvents] = useState<IEvent[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [isLoading, setIsLoading] = useState(false);

  const { windowWidth } = useWindowWidth();

  // Load more events, pagination
  const loadMoreData = () => {
    setPage(prev => prev + 1);
  };

  // Set current events per page
  useEffect(() => {
    if (!events?.length) return;
    const delay = page === 1 ? 0 : 2000;

    const timerId = setTimeout(() => {
      setCurrentEvents(sortedEvents.slice(0, page * limit));
    }, delay);

    return () => clearTimeout(timerId);
  }, [sortedEvents, page, limit]);

  // Get all events
  useEffect(() => {
    setIsLoading(true);
    getEvents()
      .then(res => {
        setEvents(res);
        setSoretedEvents(res);
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

  const sortEvents = ({
    selectValue,
    sortValue,
  }: {
    selectValue: keyof IEvent;
    sortValue: 'asc' | 'desc';
  }) => {
    const sortedEvents = [...events].sort((a, b) => {
      const sortOreder = sortValue === 'asc' ? 1 : -1;
      return a[selectValue] > b[selectValue] ? sortOreder : sortOreder * -1;
    });
    setSoretedEvents(sortedEvents);
    setPage(1);
  };

  return isLoading || !currentEvents.length ? (
    <SkeletonLoader rows={limit} widthValue={300 / limit} />
  ) : (
    <Flex vertical>
      <EventsFilter sortEvents={sortEvents} />
      <Divider />
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
    </Flex>
  );
};
