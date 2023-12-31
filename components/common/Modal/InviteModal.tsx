import { FormEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useStore } from '@/context/stores';
import Input from '@/components/common/Input/Input';
import { emailRules } from '@/lib/constants/inputErrorRules';
import { inviteDashboard } from '@/api/dashboards/inviteDashboard';
import ModalFrame from './ModalFrame';
import AlertModal from './AlertModal';

interface Props {
  dashboardId: number;
}

function InviteModal({ dashboardId }: Props) {
  const [errorMsg, setErrorMsg] = useState();
  const { modals, showModal, clearModal } = useStore((state) => ({
    modals: state.modals,
    showModal: state.showModal,
    clearModal: state.clearModal,
  }));
  const {
    register,
    getValues,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });
  const email = getValues('email');

  const handleInviteClick = async (event: FormEvent) => {
    event.preventDefault();
    const response = await inviteDashboard(dashboardId, { email });
    if (response.status !== 201) {
      setErrorMsg(response.data?.message);
      showModal('inviteAlert');
    } else clearModal();
  };

  return (
    <>
      <ModalFrame
        type="invite"
        title="초대하기"
        height="Mid"
        disabledBtn={errors.email ? true : false}
        btnFnc={handleInviteClick}
      >
        <form onSubmit={handleInviteClick}>
          <Input
            type="etc"
            register={register('email', emailRules)}
            error={errors.email}
            initLabel="이메일"
            initPlaceholder="초대할 이메일을 입력하세요"
            isHookForm
          />
        </form>
      </ModalFrame>
      {modals[modals.length - 1] === 'inviteAlert' && (
        <AlertModal type="customAlert" customName="inviteAlert">
          {errorMsg}
        </AlertModal>
      )}
    </>
  );
}

export default InviteModal;
