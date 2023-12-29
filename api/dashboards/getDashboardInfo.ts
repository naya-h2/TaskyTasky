<<<<<<< HEAD
import authInstance from '@/lib/axios';
=======
import instance from '@/lib/axios';
>>>>>>> 6398922 (Feat: 새컬럼추가 API 연결 완료)

/**
 * 대시보드 상세 조회
 */
export const getDashboardInfo = async (dashboardId: number) => {
<<<<<<< HEAD
  const response = await authInstance.get(`/api/dashboards/${dashboardId}`);
=======
  const response = await instance.get(`/api/dashboards/${dashboardId}`);
>>>>>>> 6398922 (Feat: 새컬럼추가 API 연결 완료)
  return response.data;
};
