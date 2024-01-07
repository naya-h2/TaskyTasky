import { useRouter } from 'next/navigation';
import styled, { css } from 'styled-components';
import { useStore } from '@/context/stores';
import { GRAY, VIOLET } from '@/styles/ColorStyles';
import { FONT_14, FONT_16 } from '@/styles/FontStyles';
import { DEVICE_SIZE } from '@/styles/DeviceSize';

function HeaderDropDown() {
  const router = useRouter();
  const { setUser, setAuthToken } = useStore((state) => ({ setUser: state.setUser, setAuthToken: state.setAuthToken }));

  const logout = () => {
    window.localStorage.removeItem('login');
    setUser(null);
    setAuthToken('');
    router.push('/');
  };

  return (
    <StyledContainer>
      <StyledList $where="top" onClick={() => router.push('/mypage')}>
        내 정보
      </StyledList>
      <StyledList onClick={() => router.push('/myboard')}>내 대시보드</StyledList>
      <StyledList $where="bottom" onClick={logout}>
        로그아웃
      </StyledList>
    </StyledContainer>
  );
}

export default HeaderDropDown;

const borderTop = css`
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
`;

const borderBottom = css`
  border-bottom-right-radius: 12px;
  border-bottom-left-radius: 12px;
`;

const StyledContainer = styled.div`
  width: 130px;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: white;
  border: 2px solid ${GRAY[30]};
  border-radius: 12px;
  box-shadow: 0px 0px 10px ${GRAY[30]};

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    width: 110px;
  }
`;

const StyledList = styled.div<{ $where?: string }>`
  width: 100%;
  padding: 7px 10px;

  ${FONT_16};
  text-align: center;
  ${({ $where }) => {
    if ($where === 'top') return borderTop;
    if ($where === 'bottom') return borderBottom;
  }};

  &:hover {
    background-color: ${VIOLET[8]};
    color: ${VIOLET[1]};
  }

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    ${FONT_14};
  }
`;
