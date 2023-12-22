import { modalType } from '@/lib/types/zustand';
import Input from '../Input/Input';
import ModalFrame from './ModalFrame';

interface Props {
  type: modalType;
}

function DashboardModal({ type }: Props) {
  const handleButtonClick = () => {};

  return (
    <ModalFrame type={type} title={'새로운 대시보드'} height="Low" btnFnc={handleButtonClick}>
      <Input type="dashboard" />
    </ModalFrame>
  );
}

export default DashboardModal;
