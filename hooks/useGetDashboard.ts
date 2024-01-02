import { useEffect, useState } from 'react';
import { useStore } from '@/context/stores';
import { getDashboardList } from '@/api/dashboards/getDashboardList';
import { DashboardType } from '@/lib/types/dashboards';

/**
 * 페이지네이션을 이용해 대시보드 목록을 넘겨주는 커스텀훅
 * @returns 해당 페이지에 맞는 대시보드 목록
 */
export const useGetDashboard = () => {
  const { page, setTotal } = useStore((state) => ({
    page: state.myboardPageNumber,
    setTotal: state.calcTotalPage,
  }));
  const [dashboardList, setDashboardList] = useState<DashboardType[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const dashboardData = await getDashboardList('pagination', 5, undefined, page);
      setDashboardList(dashboardData?.dashboards);
      setTotal(Math.ceil(dashboardData?.totalCount / 5));
    };

    fetchDashboardData();
  }, [page]);

  return dashboardList;
};
