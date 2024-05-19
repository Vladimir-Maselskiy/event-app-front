import { useEffect, useState } from 'react';
import { getParticipants } from '../../utils/api';
import { IUser } from '../../interfaces/interfaces';
import { Card, Divider, Flex, List } from 'antd';
import { BackButton } from '../UI/BackButton/BackButton';
import { ParticipantFilter } from '../ParticipantFilter/ParticipantFilter';
import { ParticipantContent } from '../ParticipantContent/ParticipantContent';

export const Participant = () => {
  const [participant, setParticipant] = useState<IUser[]>([]);
  const [filteredParticipant, setFilteredParticipant] = useState<IUser[]>([]);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const eventId = queryParams.get('eventId');
    if (!eventId) return;
    getParticipants(eventId).then(res => {
      setParticipant(res);
      setFilteredParticipant(res);
    });
  }, []);
  return (
    <Flex vertical style={{ paddingTop: 40 }}>
      <Flex style={{ width: '300px' }}>
        <BackButton />
      </Flex>
      <Divider />
      <ParticipantFilter
        patisipant={participant}
        setFilteredParticipant={setFilteredParticipant}
      />
      <Divider />
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
        dataSource={filteredParticipant}
        renderItem={item => (
          <List.Item>
            <Card
              title={item.username}
              style={{
                minWidth: 300,
                maxWidth: '500px',
                margin: '0 auto',
              }}
              styles={{ body: { height: 200 } }}
            >
              <ParticipantContent user={item} />
            </Card>
          </List.Item>
        )}
      ></List>
    </Flex>
  );
};
