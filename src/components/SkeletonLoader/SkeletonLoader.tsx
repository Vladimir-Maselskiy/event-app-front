import { Flex, Skeleton } from 'antd';

interface IProps {
  rows: number;
  widthValue?: number;
}

export const SkeletonLoader = ({ rows, widthValue }: IProps) => {
  const rowsArray = new Array(rows).fill(0);
  return (
    <Flex wrap="wrap" style={{ minWidth: '100%' }}>
      {rowsArray.map((_, index) => (
        <Skeleton
          style={{ width: widthValue ? widthValue + '%' : 'auto' }}
          key={index}
          avatar
          paragraph={{ rows: 3 }}
          active
        />
      ))}
    </Flex>
  );
};
