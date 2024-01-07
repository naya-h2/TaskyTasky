import { useStore } from '@/context/stores';
import { modalType } from '@/lib/types/zustand';
import { useRouter } from 'next/router';
import ModalFrame from './ModalFrame';
import { toast } from 'react-toastify';
import { deleteDashboard } from '@/api/dashboards/deleteDashboard';
import { useCheckLogin } from '@/hooks/useCheckLogin';
import { deleteDashboardInvitation } from '@/api/dashboards/deleteDashboardInvitation';
import { deleteMember } from '@/api/members/deleteMember';
import { styled } from 'styled-components';
import { FONT_18 } from '@/styles/FontStyles';
import { BLACK } from '@/styles/ColorStyles';
import { editDashboard } from '@/api/dashboards/editDashboard';

interface Props {
  type: modalType;
  dashboardId: number;
  invitationId?: number;
  memberId?: number;
  dashTitle?: string;
  dashColor?: string;
}

function EditModal({ type, dashboardId, invitationId, memberId, dashTitle, dashColor }: Props) {
  useCheckLogin();
  const { clearModal } = useStore((state) => ({
    clearModal: state.clearModal,
  }));

  const setIsDashChanged = useStore((state) => state.setIsDashChanged);
  const router = useRouter();
  const delayInMilliseconds = 1000;
  const getEditMsg = (type: modalType): string | undefined => {
    let EditMsg;
    switch (type) {
      case 'EditDashboard':
        EditMsg = '대시보드 정보를 수정하겠습니까?';
        break;
      case 'deleteMember':
        EditMsg = '해당 멤버를 삭제하시겠습니까?';
        break;
      case 'cancelInvite':
        EditMsg = '초대를 취소하시겠습니까?';
        break;
      case 'deleteDashboard':
        EditMsg = '현재 대시보드를 삭제하시겠습니까?';
        break;
      default:
        break;
    }
    return EditMsg;
  };
  const handleButtonClick = async () => {
    if (type === 'deleteMember') {
      const deleteMemberToast = toast.success('해당 멤버가 삭제되었습니다.', {
        autoClose: 1000,
      });
      await deleteMember(memberId);

      clearModal();
    } else if (type === 'EditDashboard') {
      const EditDashToast = toast.success('대시보드 정보를 수정했습니다.', {
        autoClose: 1000,
      });
      const body = { title: dashTitle, color: dashColor };
      await editDashboard(dashboardId, body);

      clearModal();
    } else if (type === 'cancelInvite') {
      const cancelInviteToast = toast.success('초대를 취소했습니다.', {
        autoClose: 1000,
      });
      await deleteDashboardInvitation(dashboardId, invitationId);

      clearModal();
    } else if (type === 'deleteDashboard') {
      const deleteDashboardToast = toast.success('현재 대시보드를 삭제했습니다.', {
        autoClose: 1000,
      });

      await deleteDashboard(dashboardId);

      clearModal();
    }
    setTimeout(() => {
      if (type === 'deleteDashboard') {
        return router.push('/myboard');
      }
      setIsDashChanged();
    }, delayInMilliseconds);
  };

  return (
    <>
      <ModalFrame type={type} title="" height="High" btnFnc={handleButtonClick}>
        <EditMsg>{getEditMsg(type)}</EditMsg>
      </ModalFrame>
    </>
  );
}

export default EditModal;

const EditMsg = styled.div`
  ${FONT_18};
  color: ${BLACK[2]};
  text-align: center;
`;
