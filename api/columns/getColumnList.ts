import instance from '@/lib/axios';

/**
 * 칼럼 목록 조회
 */
export const getColumnList = async (dashboardId: number) => {
  try {
    const response = await instance.get(`/api/vercel/columns?dashboardId=${dashboardId}`);
    return response.data;
  } catch (error) {}
};
