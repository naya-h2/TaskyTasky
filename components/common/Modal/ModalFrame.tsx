import { ReactNode } from 'react';
import styled from 'styled-components';
import { Z_INDEX } from '@/styles/ZIndexStyles';
import useNotScroll from '@/hooks/useNotScroll';
import ModalPortal from './ModalPortal';

interface Props {
  children: ReactNode;
  onClickClose: () => void;
}

function ModalFrame({ children, onClickClose }: Props) {
  useNotScroll();

  return (
    <>
      <ModalPortal>
        <Mask onClick={onClickClose} />
        <Body>
          {/* <CloseIcon src={closeBtn} alt="모달 닫기 버튼" onClick={onClickClose} />
          <Container>{children}</Container> */}
        </Body>
      </ModalPortal>
    </>
  );
}

export default ModalFrame;

const { modalFrame_Mask, modalFrame_Body } = Z_INDEX;

const Mask = styled.div`
  width: 100%;
  height: 100%;
  
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${modalFrame_Mask};

  background-color: black;
  opacity: 0.4;
`;

const Body = styled.div`
  width: 360px;
  
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: ${modalFrame_Body};

  border-radius: 8px;
  background: white;
`;