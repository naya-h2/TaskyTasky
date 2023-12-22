import styled from 'styled-components';
import ColumnModal from '@/components/common/Modal/ColumnModal';
import { useStore } from '@/context/stores';
import { modalType } from '@/lib/types/zustand';

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
      <Button onClick={() => handleButtonClick('dashBoard')}>새 컬럼 생성</Button>
      <Button onClick={() => handleButtonClick('manageColumn')}>칼럼 삭제</Button>
      {modal.length > 0 && <ColumnModal type={modal[modal.length - 1]} />}
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
