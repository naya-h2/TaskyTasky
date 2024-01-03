import { RefObject } from 'react';
import styled, { keyframes } from 'styled-components';
import ModalPortal from './ModalPortal';
import useNotScroll from '@/hooks/useNotScroll';
import { Z_INDEX } from '@/styles/ZIndexStyles';
import spinnerImg from '@/public/images/spinner.png';

interface Props {
  anchorRef: RefObject<HTMLElement>;
}

function LoadingModal({ anchorRef }: Props) {
  useNotScroll();

  return (
    <>
      <ModalPortal container={anchorRef.current}>
        <StyledMask />
        <Spinner />
      </ModalPortal>
    </>
  );
}

export default LoadingModal;

const placeholderRotate = keyframes`
  100% {
      transform: rotate(360deg);
  }
`;

const StyledMask = styled.div`
  width: 100%;
  height: 100%;

  position: fixed;
  top: 0;
  left: 0;
  z-index: ${Z_INDEX.modalFrame_Mask_Mid};

  background-color: black;
  opacity: 0.4;
`;

export const Spinner = styled.div`
  animation: ${placeholderRotate} 1.5s linear infinite;
  z-index: ${Z_INDEX.modalFrame_Body_Mid};
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  background-image: url(${`${spinnerImg}`});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;
