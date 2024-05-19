import {
  SortAscendingOutlined,
  SortDescendingOutlined,
} from '@ant-design/icons';
import { Button, Flex, Select, Switch } from 'antd';
import { useState } from 'react';
import { IEvent } from '../../interfaces/interfaces';

const selectOptions = [
  { value: 'title', label: 'Title' },
  { value: 'date', label: 'Event date' },
  { value: 'organizer', label: 'Organizer' },
];

interface IProps {
  sortEvents: ({
    selectValue,
    sortValue,
  }: {
    selectValue: keyof IEvent;
    sortValue: 'asc' | 'desc';
  }) => void;
}

export const EventsFilter = ({ sortEvents }: IProps) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isApplyButtonDisabled, setIsApplyButtonDisabled] = useState(true);
  const [selectValue, setSelectValue] = useState<keyof IEvent>('title');
  const [sortValue, setSortValue] = useState<'asc' | 'desc'>('asc');

  const onSwithChange = (checked: boolean) => {
    setIsApplyButtonDisabled(!checked);

    setIsDisabled(!checked);
  };

  const onSelectChange = (value: keyof IEvent) => {
    setIsApplyButtonDisabled(false);
    setSelectValue(value);
  };

  const onSortValueClick = (value: 'asc' | 'desc') => {
    setIsApplyButtonDisabled(false);
    setSortValue(value === 'asc' ? 'desc' : 'asc');
  };

  const onApplyButtonClick = () => {
    console.log('selectValue', selectValue);
    sortEvents({ selectValue, sortValue });
    setIsApplyButtonDisabled(true);
  };

  return (
    <Flex gap="large" align="center">
      <p>Sort</p>
      <Switch size="small" checked={!isDisabled} onChange={onSwithChange} />
      <Select
        defaultValue={selectValue as keyof IEvent}
        style={{ width: 120 }}
        disabled={isDisabled}
        options={selectOptions}
        onChange={onSelectChange}
      />
      <Button
        icon={
          sortValue === 'asc' ? (
            <SortAscendingOutlined />
          ) : (
            <SortDescendingOutlined />
          )
        }
        onClick={() => onSortValueClick(sortValue)}
        disabled={isDisabled}
      ></Button>

      <Button
        onClick={onApplyButtonClick}
        disabled={isApplyButtonDisabled}
        type="primary"
      >
        Apply
      </Button>
    </Flex>
  );
};
