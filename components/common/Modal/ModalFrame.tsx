import { ReactNode } from 'react';
import styled from 'styled-components';
import useNotScroll from '@/hooks/useNotScroll';
import { useStore } from '@/context/stores';
import CloseIcon from '@/public/icon/close.svg';
import ModalPortal from './ModalPortal';
import Button from '../Button';
import DropDown from '@/components/common/DropDown/DropDown';
import { Z_INDEX } from '@/styles/ZIndexStyles';
import { FONT_14, FONT_16, FONT_24_B } from '@/styles/FontStyles';
import { BLACK } from '@/styles/ColorStyles';
import { modalType } from '@/lib/types/zustand';
import { DEVICE_SIZE } from '@/styles/DeviceSize';

interface Props {
  height: 'Low' | 'Mid' | 'High' | 'Top';
  type: modalType;
  title?: string;
  children: ReactNode;
  btnFnc?: () => void;
  disabledBtn?: boolean;
}

function ModalFrame({ height, type, title, children, btnFnc, disabledBtn = false }: Props) {
  const modal = useStore((state) => state.modals);
  const clearModal = useStore((state) => state.clearModal);
  const hideModal = useStore((state) => state.hideModal);

  useNotScroll();

  if (!modal.length) {
    return null;
  }

  return (
    <ModalPortal>
      <StyledMask $height={height} onClick={() => hideModal(modal[modal.length - 1])} />
      <StyledBody $height={height} $type={type}>
        <StyledTitle>{title}</StyledTitle>
        {type === 'card' && (
          <StyledToolBox>
            <DropDown type="kebab" />
            <StyledCloseBtn alt="모달 닫기 버튼" onClick={clearModal} />
          </StyledToolBox>
        )}
        <StyledContainer>{children}</StyledContainer>
        {type === 'card' || (
          <StyledButtonBox>
            {type === 'incorrectPWAlert' ||
              (type !== 'customAlert' && (
                <StyledButtonWrapper>
                  <Button.Plain style="outline" roundSize="L" onClick={() => hideModal(modal[modal.length - 1])}>
                    <StyledButtonText>취소</StyledButtonText>
                  </Button.Plain>
                </StyledButtonWrapper>
              ))}
            <StyledButtonWrapper>
              <Button.Plain style="primary" roundSize="L" onClick={btnFnc} isNotActive={disabledBtn}>
                <StyledButtonText>
                  {type === 'manageColumn' && '변경'}
                  {(type === 'createColumn' || type === 'dashBoard' || type === 'createTodo') && '생성'}
                  {(type === 'deleteColumnAlert' || type === 'deleteCardAlert' || type === 'deleteCommentAlert') &&
                    '삭제'}
                  {(type === 'incorrectPWAlert' || type === 'imgUrl' || type === 'customAlert') && '확인'}
                  {type === 'editTodo' && '수정'}
                  {type === 'invite' && '초대'}
                  {type === 'deleteMember' && '확인'}
                  {type === 'cancelInvite' && '확인'}
                  {type === 'deleteDashboard' && '확인'}
                  {type === 'EditDashboard' && '확인'}
                </StyledButtonText>
              </Button.Plain>
            </StyledButtonWrapper>
          </StyledButtonBox>
        )}
      </StyledBody>
    </ModalPortal>
  );
}

export default ModalFrame;

const StyledMask = styled.div<{ $height: 'Low' | 'Mid' | 'High' | 'Top' }>`
  width: 100vw;
  height: 100vh;

  position: fixed;
  top: 0;
  left: 0;
  ${(props) => props.$height === 'Low' && `z-index: ${Z_INDEX.modalFrame_Mask_Low}`};
  ${(props) => props.$height === 'Mid' && `z-index: ${Z_INDEX.modalFrame_Mask_Mid}`};
  ${(props) => props.$height === 'High' && `z-index: ${Z_INDEX.modalFrame_Mask_High}`};
  ${(props) => props.$height === 'Top' && `z-index: ${Z_INDEX.modalFrame_Mask_Top}`};

  background-color: black;
  opacity: 0.4;
`;

const StyledBody = styled.div<{ $height: 'Low' | 'Mid' | 'High' | 'Top'; $type: modalType }>`
  width: 540px;
  ${({ $type }) =>
    ($type === 'card' || $type === 'editTodo' || $type === 'createTodo') &&
    `
    width: 720px;
    height: 650px;
    overflow-y: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  `};
  ${({ $type }) => ($type === 'editTodo' || $type === 'createTodo') && 'width: 506px'};

  padding: ${({ $type }) =>
    $type === 'incorrectPWAlert' || $type === 'deleteCardAlert' || $type === 'deleteColumnAlert'
      ? '26px 28px 32px 28px'
      : $type === 'card'
        ? '32px 28px 64px'
        : '32px 28px'};

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  ${(props) => props.$height === 'Low' && `z-index: ${Z_INDEX.modalFrame_Body_Low}`};
  ${(props) => props.$height === 'Mid' && `z-index: ${Z_INDEX.modalFrame_Body_Mid}`};
  ${(props) => props.$height === 'High' && `z-index: ${Z_INDEX.modalFrame_Body_High}`};
  ${(props) => props.$height === 'Top' && `z-index: ${Z_INDEX.modalFrame_Body_Top}`};

  border-radius: 12px;
  background: white;
`;

const StyledTitle = styled.h1`
  ${FONT_24_B};
  color: ${BLACK[2]};
`;

const StyledToolBox = styled.div`
  position: absolute;
  top: 32px;
  right: 30px;
  display: flex;
  align-items: center;
  gap: 15px;
`;

const StyledCloseBtn = styled(CloseIcon)`
  &:hover {
    cursor: pointer;
  }
`;

const StyledContainer = styled.div`
  width: 100%;
  padding: 32px 0 0;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 28px;
`;

const StyledButtonWrapper = styled.div`
  width: 120px;
  height: 48px;
`;

const StyledButtonText = styled.span`
  ${FONT_16};

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    ${FONT_14};
  }
`;
