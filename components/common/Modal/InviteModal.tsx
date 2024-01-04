import { FormEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useStore } from '@/context/stores';
import Input from '@/components/common/Input/Input';
import { emailRules } from '@/lib/constants/inputErrorRules';
import { inviteDashboard } from '@/api/dashboards/inviteDashboard';
import ModalFrame from './ModalFrame';
import AlertModal from './AlertModal';
import { useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  dashboardId: number;
}

function InviteModal({ dashboardId }: Props) {
  const [errorMsg, setErrorMsg] = useState();
  const { modals, showModal, clearModal, hideModal } = useStore((state) => ({
    modals: state.modals,
    showModal: state.showModal,
    clearModal: state.clearModal,
    hideModal: state.hideModal,
  }));
  const {
    register,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });
  const email = watch('email');


  const router = useRouter();

  const handleInviteClick = async (event?: FormEvent) => {
    if (event) event.preventDefault();

    const response = await inviteDashboard(dashboardId, { email });
    if (response.status !== 201) {
      setErrorMsg(response.data?.message);
      showModal('inviteAlert');
    } else {
      const toastId = toast.success('초대가 완료되었습니다.', {
        autoClose: 1700,
      });
      clearModal();

      const delayInMilliseconds = 1800;
      setTimeout(() => {
        router.reload();
      }, delayInMilliseconds);
    }
  };

  return (
    <>
      <ModalFrame
        type="invite"
        title="초대하기"
        height="Mid"
        disabledBtn={errors.email || !email ? true : false}
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
