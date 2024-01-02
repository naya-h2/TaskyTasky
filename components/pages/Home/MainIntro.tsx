import Button from '@/components/common/Button';
import { BLACK, VIOLET } from '@/styles/ColorStyles';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import { FONT_14, FONT_16, FONT_18 } from '@/styles/FontStyles';
import Link from 'next/link';
import styled from 'styled-components';

function MainIntro() {
  return (
    <>
      <StyledMain src="/images/tasky_home_main.png" alt="메인 이미지" />
      <TitleContainer>
        <Title>새로운 일정 관리</Title>
        <TaskifyTitle>TaskyTasky</TaskifyTitle>
      </TitleContainer>
      <Subtitle>
        TaskyTasky와 함께 일상의 업무를 효율적으로 계획해 보세요!
        <br /> 날짜와 시간에 따라 할 일을 간편하게 정리하고 일정을 효과적으로 관리하세요.
      </Subtitle>
      <Link href="/login">
        <ButtonWrapper>
          <Button.Plain style="primary" roundSize="L">
            <ButtonText>바로 시작하기</ButtonText>
          </Button.Plain>
        </ButtonWrapper>
      </Link>
    </>
  );
}

export default MainIntro;

const StyledMain = styled.img`
  width: 722px;

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    width: 537px;
  }

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    width: 300px;
  }
`;

const TitleContainer = styled.div`
  padding: 30px 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    padding: 20px 0;
  }
`;

const Title = styled.h1`
  font-size: 76px;
  font-weight: 700;
  color: ${BLACK[1]};

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    font-size: 64px;
  }

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    font-size: 32px;
  }
`;

const TaskifyTitle = styled(Title)`
  font-family: Montserrat;
  font-size: 76px;
  font-weight: 700;
  color: ${VIOLET[1]};
  letter-spacing: -1px;

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    font-size: 64px;
  }

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    font-size: 48px;
  }
`;

const Subtitle = styled.span`
  margin-bottom: 55px;

  ${FONT_18};
  font-weight: 400;
  color: ${BLACK[1]};
  letter-spacing: -1px;
  text-align: center;

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    width: 310px;
    margin-bottom: 30px;

    word-break: keep-all;
    ${FONT_14};
  }
`;

const ButtonWrapper = styled.div`
  width: 450px;
  height: 60px;

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    width: 300px;
    height: 50px;
  }
`;

const ButtonText = styled.div`
  ${FONT_16};
`;
