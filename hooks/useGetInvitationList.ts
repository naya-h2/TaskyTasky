import { useEffect, useState } from 'react';
import { useStore } from '@/context/stores';
import { getInvitationList } from '@/api/invitations/getInvitationList';
import { InvitationType } from '@/lib/types/invitations';

export const useGetInvitationList = () => {
  const { search, setDashboardSearch } = useStore((state) => ({
    search: state.dashboardSearch,
    setDashboardSearch: state.setDashboardSearch,
  }));
  const [invitationList, setInvitationList] = useState<InvitationType[]>([]);
  const [cursorId, setCursorId] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async () => {
    const searchResult = await getInvitationList(6, cursorId, search);
    if (!searchResult.cursorId) setHasMore(false);
    setCursorId(searchResult.cursorId);
    if (!cursorId) return setInvitationList(searchResult.invitations);
    setInvitationList((prev) => [...prev, ...searchResult.invitations]);
  };

  const fetchMore = () => {
    if (cursorId) return fetchData();
    setHasMore((prev) => !prev);
  };

  useEffect(() => {
    setHasMore(true);
    setCursorId(null);
    setInvitationList([]);
  }, [search]);

  useEffect(() => {
    if (!invitationList.length) fetchData();
  }, [invitationList]);

  useEffect(() => {
    fetchData();
  }, []);

  return { fetchMore, hasMore, invitationList, search, setDashboardSearch };
};
