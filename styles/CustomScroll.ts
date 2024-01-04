import { css } from 'styled-components';
import { GRAY } from './ColorStyles';
import { DEVICE_SIZE } from './DeviceSize';

export const customScroll = css`
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    height: 30%;
    border-radius: 10px;
    background-color: ${GRAY[30]};
  }
  @media (max-width: ${DEVICE_SIZE.tablet}) {
    padding-right: 6px;
    &::-webkit-scrollbar {
      width: 6px;
    }
  }
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    padding-right: 7px;
    &::-webkit-scrollbar {
      width: 4px;
    }
  }
`;
