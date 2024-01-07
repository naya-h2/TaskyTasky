import { modalType } from '@/lib/types/zustand';
import Input from '../Input/Input';
import ModalFrame from './ModalFrame';

interface Props {
  type: modalType;
}

function ImgUrlModal({ type }: Props) {
  const handleButtonClick = () => {};

  return (
    <ModalFrame type={type} title={'외부 이미지 가져오기'} height="Top" btnFnc={handleButtonClick}>
      <Input type="imgUrl" initPlaceholder="링크 붙여넣기" initLabel="외부 URL" />
    </ModalFrame>
  );
}

export default ImgUrlModal;
