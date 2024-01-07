import { MemberListType } from '@/lib/types/members';
import Profile from '../Profile/Profile';
import styled from 'styled-components';
import { GRAY } from '@/styles/ColorStyles';
import { customScroll } from '@/styles/CustomScroll';

interface Props {
  memberList: MemberListType[];
}

function MemberDropDown({ memberList }: Props) {
  return (
    <StyledContainer>
      <StyledScroll>
        {memberList.map(({ id, nickname, profileImageUrl }) => (
          <Profile type="member" id={id} name={nickname} profileImg={profileImageUrl} />
        ))}
      </StyledScroll>
    </StyledContainer>
  );
}

export default MemberDropDown;

const StyledContainer = styled.div`
  width: 200px;
  padding: 10px;
  padding-right: 0;

  display: flex;
  flex-direction: column;
  gap: 4px;

  background-color: white;
  border: 2px solid ${GRAY[30]};
  border-radius: 12px;
  box-shadow: 0px 0px 10px ${GRAY[30]};
`;

const StyledScroll = styled.div`
  height: 200px;
  overflow-y: scroll;

  ${customScroll};
`;
