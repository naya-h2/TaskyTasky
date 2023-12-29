import styled from 'styled-components';
import Input from '@/components/common/Input/Input';
import CardFrame from './CardFrame';

function PasswordCard() {
  return (
    <CardFrame title="비밀번호 변경" buttonText="변경">
      <StyledWrapper>
        <Input type="password" />
        <Input type="password" />
        <Input type="password" />
      </StyledWrapper>
    </CardFrame>
  );
}

export default PasswordCard;

const StyledWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
`;
