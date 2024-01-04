import Image from 'next/image';
import { RefObject } from 'react';
import styled, { keyframes } from 'styled-components';
import ModalPortal from './ModalPortal';
import useNotScroll from '@/hooks/useNotScroll';
import { Z_INDEX } from '@/styles/ZIndexStyles';
import spinnerImg from '@/public/images/spinner.png';
import { DEVICE_SIZE } from '@/styles/DeviceSize';

interface Props {
  anchorRef: RefObject<HTMLElement>;
}

function LoadingModal({ anchorRef }: Props) {
  useNotScroll();

  return (
    <>
      <ModalPortal container={anchorRef.current}>
        <StyledMask>
          <StyledSpinner src={spinnerImg} alt={'Spinner'} />
        </StyledMask>
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
  width: 440px;
  height: 200px;

  position: fixed;
  z-index: ${Z_INDEX.modalFrame_Mask_Mid};

  background-color: black;
  opacity: 0.1;

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    width: 240px;
  }
`;

const StyledSpinner = styled(Image)`
  animation: ${placeholderRotate} 1.5s linear infinite;
  z-index: ${Z_INDEX.modalFrame_Body_Mid};
  position: absolute;
  top: 30%;
  left: 40%;
  width: 100px;
  height: 100px;
`;
