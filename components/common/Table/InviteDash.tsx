import styled from 'styled-components';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import { GRAY, WHITE } from '@/styles/ColorStyles';
import SearchIcon from '@/public/icon/search.svg';
import InviteList from './InviteList';
import { FONT_16, FONT_20_B, FONT_24_B } from '@/styles/FontStyles';
import NullInviteList from './NullInviteList';
import { InvitationType } from '@/lib/types/invitations';
import { useStore } from '@/context/stores';
import RefreshIcon from '@/public/icon/close_circle.svg';
import { FormEvent, useRef } from 'react';
import Image from 'next/image';

interface Props {
  inviteList: InvitationType[];
}

function InviteDash({ inviteList }: Props) {
  const { search, setDashboardSearch } = useStore((state) => ({
    setDashboardSearch: state.setDashboardSearch,
    search: state.dashboardSearch,
  }));
  const inputValue = useRef<HTMLInputElement>(null);

  const handleSearchSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (inputValue.current) setDashboardSearch(inputValue.current.value);
  };

  const handleRefreshClick = () => {
    setDashboardSearch('');
    if (inputValue.current) inputValue.current.value = '';
  };

  if (inviteList.length === 0 && !search) {
    return <NullInviteList />;
  }

  return (
    <Container>
      <InviteDashTitle>초대받은 대시보드</InviteDashTitle>
      <InviteDashInputWrap onSubmit={handleSearchSubmit}>
        <Search />
        <SearchInput ref={inputValue} placeholder="대시보드 이름을 검색해보세요." />
        {search && (
          <StyledRefreshIcon
            alt="검색 모드 취소"
            src="/icon/close_circle.svg"
            width={25}
            height={25}
            onClick={handleRefreshClick}
          />
        )}
      </InviteDashInputWrap>
      <InviteListHead>
        <Subject>이름</Subject>
        <Subject>초대자</Subject>
        <Subject>수락여부</Subject>
      </InviteListHead>
      {!inviteList.length && search && <StyledNoSearch>검색 결과가 없습니다.</StyledNoSearch>}
      <InviteContent>
        {inviteList.map((list) => (
          <InviteList key={list.id} invite={list} />
        ))}
      </InviteContent>
    </Container>
  );
}

export default InviteDash;

const Container = styled.div`
  width: 100%;
  min-height: 400px;
  padding: 32px 28px 0;

  background-color: ${[WHITE]};

  border-radius: 16px;
`;

const InviteDashTitle = styled.div`
  ${[FONT_24_B]};

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    ${[FONT_20_B]}
  }
`;

const Search = styled(SearchIcon)`
  width: 24px;
  height: 24px;
  margin: 8px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding-right: 40px;

  border-radius: 6px;
`;

const StyledRefreshIcon = styled(Image)`
  position: absolute;
  right: 6px;
  top: 8px;

  &:hover {
    cursor: pointer;
  }
`;

const InviteDashInputWrap = styled.form`
  margin: 20px 0 4px;

  border: 1px solid ${GRAY[30]};
  border-radius: 6px;
  display: flex;

  position: relative;

  &:focus-within {
    box-shadow: 0px 0px 5px ${GRAY[30]};
  }

  &:hover {
    box-shadow: 0px 0px 5px ${GRAY[30]};
  }
`;

const InviteContent = styled.div`
  width: 100%;
`;

const InviteListHead = styled.div`
  padding: 20px 28px 0;
  color: ${GRAY[40]};

  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    display: none;
  }
`;

const Subject = styled.div`
  ${[FONT_16]};
`;

const StyledNoSearch = styled.div`
  width: 100%;
  height: 180px;

  ${[FONT_16]};
  color: ${GRAY[50]};

  display: flex;
  align-items: center;
  justify-content: center;
`;
