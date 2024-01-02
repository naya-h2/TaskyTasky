import { useEffect, useState } from 'react';
import { useStore } from '@/context/stores';
import { getInvitationList } from '@/api/invitations/getInvitationList';
import { GetInvitationResponseType } from '@/lib/types/invitations';

export const useGetInvitationList = () => {
  const { search } = useStore((state) => ({
    search: state.dashboardSearch,
  }));
  const [invitationList, setInvitationList] = useState<GetInvitationResponseType>({ cursorId: null, invitations: [] });

  useEffect(() => {
    const fetchInviteListData = async () => {
      const searchResult = await getInvitationList(10, null, search);
      setInvitationList(searchResult);
    };

    fetchInviteListData();
  }, [search]);

  return invitationList;
};
