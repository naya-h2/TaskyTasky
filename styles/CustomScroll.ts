import { css } from 'styled-components';
import { GRAY } from './ColorStyles';

export const customScroll = css`
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    height: 30%;
    border-radius: 10px;
    background-color: ${GRAY[30]};
  }
`;
