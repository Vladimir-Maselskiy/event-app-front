import { AutoComplete, Flex } from 'antd';
import { IUser } from '../../interfaces/interfaces';
import { useState } from 'react';

interface IProps {
  patisipant: IUser[];
  setFilteredParticipant: React.Dispatch<React.SetStateAction<IUser[]>>;
}

export const ParticipantFilter = ({
  patisipant,
  setFilteredParticipant,
}: IProps) => {
  const options = patisipant.map(item => ({
    value: item.username,
  }));

  const onChangeFilterValue = (value: string) => {
    console.log('value', value);
    if (!value) {
      setFilteredParticipant(patisipant);
      return;
    }
    setFilteredParticipant(
      patisipant.filter(item =>
        item.username.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  return (
    <Flex align="center" gap={'small'}>
      <p>Filter:</p>
      <AutoComplete
        style={{ width: 200 }}
        options={options}
        placeholder="try to type User Name"
        filterOption={(inputValue, option) =>
          option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
        onChange={onChangeFilterValue}
      />
    </Flex>
  );
};
