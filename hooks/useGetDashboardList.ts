import { useEffect, useState } from 'react';
import { useStore } from '@/context/stores';
import { getDashboardList } from '@/api/dashboards/getDashboardList';
import { DashboardType } from '@/lib/types/dashboards';

export const useGetDashboardList = () => {
  const { setTotal } = useStore((state) => ({
    setTotal: state.calcTotalPage,
  }));

  const [dashboardList, setDashboardList] = useState<DashboardType[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchDashboardData = async () => {
    if (loading) return; // 이미 요청이 진행 중이라면 요청을 보내지 않음
    setLoading(true);

    const dashboardData = await getDashboardList('pagination', 15, null, page);
    if (dashboardData?.dashboards.length < 10) {
      setTotal(page);
      setHasMore(false); // 더 이상 불러올 데이터가 없을 경우, hasMore를 false로 설정
    } else {
      setPage(page + 1);
      setHasMore(true); // 아직 더 불러올 데이터가 있을 경우, hasMore를 true로 설정
    }

    // 중복 제거 로직을 여기에 추가
    const newDashboardList = [...dashboardList, ...dashboardData?.dashboards];
    const uniqueDashboardList = Array.from(new Set(newDashboardList.map((dashboard) => dashboard.id))).map((id) => {
      return newDashboardList.find((dashboard) => dashboard.id === id);
    });

    setDashboardList(uniqueDashboardList);
    setLoading(false);
  };

  useEffect(() => {
    fetchDashboardData();
  }, [page]);

  useEffect(() => {
    const fetch = async () => {
      await fetchDashboardData();
      const uniqueDashboardList = Array.from(new Set(dashboardList.map((dashboard) => dashboard.id))).map((id) => {
        return dashboardList.find((dashboard) => dashboard.id === id);
      });
      console.log(uniqueDashboardList);
    };
    fetch();
  }, []);

  return { dashboardList, fetchDashboardData, hasMore };
};
