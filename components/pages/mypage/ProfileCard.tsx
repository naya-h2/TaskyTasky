import Input from '@/components/common/Input/Input';
import { BLACK, WHITE } from '@/styles/ColorStyles';
import { FONT_24_B } from '@/styles/FontStyles';
import styled from 'styled-components';
import AddProfileImg from './AddProfileImg';
import Button from '@/components/common/Button';
import { DEVICE_SIZE } from '@/styles/DeviceSize';

/**
 * Todo: data type 추가 (12/22 추가 예정)
 */
function ProfileCard({ data }) {
  return (
    <StyledBody>
      <StyledTitle>프로필</StyledTitle>
      <StyledInfoSection>
        <AddProfileImg profileImgUrl={data.profileImageUrl} />
        <StyledWrapper>
          <Input type="email" />
          <Input type="nickname" />
        </StyledWrapper>
      </StyledInfoSection>
      <StyledButtonSection>
        <StyledButtonWrapper>
          <Button.Plain style="primary" roundSize="S">
            저장
          </Button.Plain>
        </StyledButtonWrapper>
      </StyledButtonSection>
    </StyledBody>
  );
}

export default ProfileCard;

const StyledBody = styled.div`
  width: 100%;
  max-width: 620px;
  padding: 32px 28px 28px;

  display: flex;
  flex-direction: column;
  gap: 24px;

  background-color: ${WHITE};
  border-radius: 8px;
`;

const StyledTitle = styled.div`
  color: ${BLACK[2]};
  ${FONT_24_B};
`;

const StyledInfoSection = styled.div`
  display: flex;
  gap: 16px;

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    flex-direction: column;
    align-items: normal;
    gap: 24px;
  }
`;

const StyledWrapper = styled.div`
  width: 336px;

  display: flex;
  flex-direction: column;
`;

const StyledButtonSection = styled.div`
  width: 100%;

  display: flex;
  justify-content: flex-end;
`;

const StyledButtonWrapper = styled.div`
  width: 84px;
  height: 32px;

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    height: 28px;
  }
`;
