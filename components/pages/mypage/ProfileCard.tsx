import styled from 'styled-components';
import Input from '@/components/common/Input/Input';
import AddProfileImg from './AddProfileImg';
import CardFrame from './CardFrame';

/**
 * Todo: data type 추가 (12/22 추가 예정)
 */
function ProfileCard({ data }) {
  return (
    <CardFrame title="프로필" buttonText="저장">
      <AddProfileImg profileImgUrl={data.profileImageUrl} />
      <StyledWrapper>
        <Input type="email" />
        <Input type="nickname" />
      </StyledWrapper>
    </CardFrame>
  );
}

export default ProfileCard;

const StyledWrapper = styled.div`
  width: 336px;

  display: flex;
  flex-direction: column;
`;
