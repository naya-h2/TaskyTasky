import styled from 'styled-components';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import { GRAY, WHITE } from '@/styles/ColorStyles';
import SearchIcon from '@/public/icon/search.svg';
import InviteList from './InviteList';
import { FONT_16, FONT_20_B, FONT_24_B } from '@/styles/FontStyles';
import NullInviteList from './NullInviteList';
import { GetInvitationResponseType } from '@/lib/types/invitations';
import { useForm } from 'react-hook-form';
import { useStore } from '@/context/stores';
import RefreshIcon from '@/public/icon/close_circle.svg';
import { FormEvent, useRef, useState } from 'react';
import Image from 'next/image';

interface Props {
  inviteList: GetInvitationResponseType;
}

function InviteDash({ inviteList }: Props) {
  const { cursorId, invitations } = inviteList;
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

  if (invitations.length === 0 && !search) {
    return <NullInviteList />;
  }

  return (
    <Container>
      <InviteDashTitle> 초대받은 대시보드</InviteDashTitle>
      <InviteInputLayout>
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
      </InviteInputLayout>
      <InviteListHead>
        <Subject>이름</Subject>
        <Subject>초대자</Subject>
        <Subject>수락여부</Subject>
      </InviteListHead>
      <InviteContent>
        {invitations.map((list) => (
          <InviteList key={list.id} invite={list} />
        ))}
      </InviteContent>
    </Container>
  );
}

export default InviteDash;

const Container = styled.div`
  width: 100%;
  height: 600px;
  padding-top: 32px;
  background-color: ${[WHITE]};

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    /* width: 504px; */
    height: 592px;
  }

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    /* width: 260px; */
    height: 836px;
  }
`;

const InviteDashTitle = styled.div`
  ${[FONT_24_B]}
  padding: 0 28px;

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    ${[FONT_20_B]}
    padding: 0 16px;
  }
`;
const InviteInputLayout = styled.div`
  margin: 20px 0 24px;
  padding: 0 28px;
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    padding: 0 16px;
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
  border: 1px solid ${GRAY[30]};
  border-radius: 6px;
  display: flex;

  position: relative;
`;

const InviteContent = styled.div`
  width: 100%;
`;

const InviteListHead = styled.div`
  display: flex;
  padding: 20px 32px;
  color: ${GRAY[40]};

  & > div:nth-child(1) {
    flex-basis: 38%;
    @media (max-width: ${DEVICE_SIZE.tablet}) {
      flex-basis: 41%;
    }
  }
  & > div:nth-child(2) {
    flex-basis: 41%;
    @media (max-width: ${DEVICE_SIZE.tablet}) {
      flex-basis: 25%;
    }
  }
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    display: none;
  }
`;

const Subject = styled.div`
  ${[FONT_16]};
`;
