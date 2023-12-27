import styled from 'styled-components';
import { useStore } from '@/context/stores';
import { modalType } from '@/lib/types/zustand';
import CardModal from '@/components/common/Modal/CardModal';
import AlertModal from '@/components/common/Modal/AlertModal';
import { cardInfo, columnLists, members } from '@/components/common/Modal/Mockup';
import TodoModal from '@/components/common/Modal/TodoModal';
import ImgUrlModal from '@/components/common/Modal/ImgUrlModal';

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
      <Button onClick={() => handleButtonClick('card')}>새로운 대시보드</Button>
      <Button onClick={() => handleButtonClick('createTodo')}>할 일 생성</Button>
      {modal.length > 0 && <CardModal type={'card'} cardInfo={cardInfo} columnTitle="To Do" teamId="tenten" />}
      {modal[modal.length - 1] === 'deleteCardAlert' && <AlertModal type={'deleteCardAlert'} />}
      {modal[modal.length - 1] === 'deleteCommentAlert' && <AlertModal type={'deleteCommentAlert'} />}
      {modal[modal.length - 1] === 'createTodo' && <TodoModal type={'createTodo'} />}
      {modal.includes('editTodo') && (
        <TodoModal
          type={'editTodo'}
          cardInfo={cardInfo}
          initialStatus="To Do"
          columnLists={columnLists}
          memberLists={members}
        />
      )}
      {modal[modal.length - 1] === 'imgUrl' && <ImgUrlModal type="imgUrl" />}
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