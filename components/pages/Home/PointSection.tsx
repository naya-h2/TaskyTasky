import { BLACK, GRAY, VIOLET } from '@/styles/ColorStyles';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import { FONT_14, FONT_16, FONT_18_B, FONT_22 } from '@/styles/FontStyles';
import styled from 'styled-components';

function PointSection() {
  return (
    <SectionContainer>
      <FirstSection>
        <Text>
          <Point>🗂️ Point 1</Point>
          <Content>
            자유자재로
            <br />
            관리하는 <SPAN>칼럼</SPAN>
          </Content>
          <Detail>칼럼을 이용해 할 일을 단계별로 구분하거나 카테고리로 정리할 수 있어요.</Detail>
        </Text>
        <SectionImg src="/images/home_section1.png" alt="대시보드 페이지 예시 사진" />
      </FirstSection>
      <SecondSection>
        <Text>
          <Point>✏️ Point 2</Point>
          <Content>
            디테일한 정보를
            <br /> 담는 <SPAN>할 일 카드</SPAN>
          </Content>
          <Detail>설명뿐만 아니라 마감일, 태그, 사진 등을 이용해 다양하게 할 일을 기록할 수 있어요.</Detail>
        </Text>
        <SectionSecondImg src="/images/home_section2.png" alt="할일 카드 생성 예시 사진" />
      </SecondSection>
    </SectionContainer>
  );
}

export default PointSection;

const SectionContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 100px auto;
  padding: 0 30px;

  display: flex;
  justify-content: center;
  gap: 70px;

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    margin: 60px auto;
    gap: 25px;
  }

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    flex-direction: column;
  }
`;

const Section = styled.div`
  width: 500px;
  height: 680px;
  padding: 50px;

  display: flex;
  flex-direction: column;
  gap: 30px;

  position: relative;

  background: white;
  border-radius: 30px;
  box-shadow: 4px 12px 30px 6px rgba(0, 0, 0, 0.09);

  &:hover {
    transition: all 0.3s ease;
    transform: translateY(-5px);
    box-shadow: 4px 12px 20px 6px rgba(0, 0, 0, 0.18);
  }

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    width: 100%;
    height: 560px;
    padding: 30px;
  }

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    min-width: 300px;
    height: 500px;
  }
`;

const FirstSection = styled(Section)`
  min-width: 400px;
`;

const SecondSection = styled(Section)`
  min-width: 320px;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    gap: 15px;
  }
`;

const Point = styled.div`
  width: 135px;
  padding: 0 10px;

  ${FONT_22};
  font-weight: 700;
  color: ${VIOLET[1]};
  text-align: center;

  border: 3px solid ${GRAY[30]};
  border-radius: 30px;

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    width: 120px;

    ${FONT_18_B};
  }
`;

const Content = styled.p`
  font-size: 48px;
  font-style: normal;
  font-weight: 700;
  line-height: 55px;
  color: ${BLACK[1]};

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    font-size: 36px;
    line-height: 40px;
  }
`;

const SPAN = styled.span`
  color: ${VIOLET[1]};
`;

const SectionImg = styled.img`
  width: 430px;

  position: absolute;
  bottom: 0;
  right: 0;

  border-top-left-radius: 10px;
  border-bottom-right-radius: 30px;
  box-shadow: 4px 0px 20px 6px rgba(0, 0, 0, 0.18);

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    width: 370px;
  }

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    width: 290px;
  }
`;

const SectionSecondImg = styled.img`
  width: 300px;

  position: absolute;
  bottom: 0;
  right: 50px;

  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  box-shadow: 4px 0px 20px 6px rgba(0, 0, 0, 0.18);

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    width: 260px;

    right: 35px;
  }
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    width: 217px;
  }
`;

const Detail = styled.div`
  width: 300px;

  word-break: keep-all;

  ${FONT_16};
  color: ${GRAY[50]};

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    width: 250px;
    ${FONT_14};
  }
`;
