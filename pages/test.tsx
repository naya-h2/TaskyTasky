import styled from 'styled-components';
import ColumnModal from '@/components/common/Modal/ColumnModal';
import { useStore } from '@/context/stores';
import { modalType } from '@/lib/types/zustand';
import DashboardModal from '@/components/common/Modal/DashboardModal';
import AlertModal from '@/components/common/Modal/AlertModal';

/**
 * 컴포넌트 실험용 페이지입니다. (컴포넌트 구현 완료 후 삭제 예정)
 */

export default function Test() {
  const modal = useStore((state) => state.modals);
  const showModal = useStore((state) => state.showModal);

  const handleButtonClick = (type: modalType) => {
    if (modal.includes(type)) return;
    showModal(type);
  };

  return (
    <Div>
      <Button onClick={() => handleButtonClick('dashBoard')}>새로운 대시보드</Button>
      <Button onClick={() => handleButtonClick('manageColumn')}>칼럼 관리</Button>
      <Button onClick={() => handleButtonClick('createColumn')}>새 칼럼 생성</Button>
      <Button onClick={() => handleButtonClick('incorrectPWAlert')}>일치하지 않는 비밀번호</Button>
      <Button onClick={() => handleButtonClick('deleteColumnAlert')}>칼럼 삭제</Button>
      <Button onClick={() => handleButtonClick('deleteCardAlert')}>카드 삭제</Button>
      {modal[modal.length - 1] === 'dashBoard' && <DashboardModal type={'dashBoard'} />}
      {modal.length > 0 && <ColumnModal type={modal[modal.length - 1]} />}
      {modal[modal.length - 1] === 'createColumn' && <ColumnModal type={'createColumn'} />}
      {modal[modal.length - 1] === 'incorrectPWAlert' && <AlertModal type={'incorrectPWAlert'} />}
      {modal[modal.length - 1] === 'deleteColumnAlert' && <AlertModal type={'deleteColumnAlert'} />}
      {modal[modal.length - 1] === 'deleteCardAlert' && <AlertModal type={'deleteCardAlert'} />}
    </Div>
  );
}

const Div = styled.div`
  margin-bottom: 30px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 80px;
`;

const Button = styled.button`
  height: 20px;
  background-color: white;
`;
