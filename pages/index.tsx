import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/pages/home/Layout';
import Button from '@/components/common/Button';
import landing1 from '@/public/images/resource/desktop/landging1.png';
import landing2 from '@/public/images/resource/desktop/landging2.png';
import landing3 from '@/public/images/resource/desktop/landging3.png';
import landing4 from '@/public/images/resource/desktop/landging4.png';
import landing5 from '@/public/images/resource/desktop/landging5.png';
import { BLACK, WHITE, GRAY, VIOLET } from '@/styles/ColorStyles';
import { FONT_16, FONT_18, FONT_18_B, FONT_22, FONT_28_B } from '@/styles/FontStyles';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import PointSection from '@/components/pages/home/PointSection';
import MainIntro from '@/components/pages/home/MainIntro';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function Home() {
  const router = useRouter();

  useEffect(() => {
    if (window && window.localStorage.getItem('login')) router.push('/myboard');
  }, []);

  return (
    <Layout>
      <Container>
        <MainIntro />
        <PointSection />
        {/* <SecondSection>
            <Image src={landing2} alt="랜딩 2" />
            <Text>
              <Point>Point 2</Point>
              <Content>해야 할 일을 등록하세요</Content>
            </Text>
          </SecondSection>
          <ThirdSection>
            <ThirdSectionTitle>생산성을 높이는 다양한 설정 ⚡</ThirdSectionTitle>
            <ThirdContainer>
              <WrapperBox>
                <ImageBox>
                  <Image src={landing3} alt="랜딩 3" height="133" />
                </ImageBox>
                <TextBox>
                  <Text1>대시보드 설정</Text1>
                  <Text2>대시보드 사진과 이름을 변경할 수 있어요.</Text2>
                </TextBox>
              </WrapperBox>
              <WrapperBox>
                <ImageBox>
                  <Image src={landing4} alt="랜딩 4" width="323" height="176" />
                </ImageBox>
                <TextBox>
                  <Text1>초대</Text1>
                  <Text2>새로운 팀원을 초대할 수 있어요.</Text2>
                </TextBox>
              </WrapperBox>
              <WrapperBox>
                <ImageBox>
                  <Image src={landing5} alt="랜딩 5" height="210" />
                </ImageBox>
                <TextBox>
                  <Text1>구성원</Text1>
                  <Text2>구성원을 초대하고 내보낼 수 있어요.</Text2>
                </TextBox>
              </WrapperBox>
            </ThirdContainer>
          </ThirdSection> */}
      </Container>
    </Layout>
  );
}

export default Home;

const Container = styled.div`
  margin: 120px auto 0;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    margin-top: 100px;
  }
`;

const SectionContainer = styled.div`
  max-width: 1200px;
  margin: 100px auto;
  display: flex;
  justify-content: center;
  gap: 70px;
`;

const FirstSection = styled.div`
  width: 500px;
  height: 680px;
  padding: 50px 50px;

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
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
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
`;

const Content = styled.p`
  font-size: 48px;
  font-style: normal;
  font-weight: 700;
  line-height: 55px;
  color: ${BLACK[1]};
`;

const SPAN = styled.span`
  color: ${VIOLET[1]};
`;

const SecondSection = styled.div`
  width: 100%;
  height: 600px;
  padding: 98px 310px 0 108px;
  position: relative;
  display: flex;
  gap: 100px;
  background: #f7f0fa;
  border-radius: 8px;
`;

const ThirdSection = styled.div`
  width: 100%;
  height: 600px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 36px;
  background: ${WHITE}; //배경 색이랑 똑같게
  border-radius: 8px;
`;

const ThirdSectionTitle = styled.p`
  ${FONT_28_B};
  color: ${BLACK[1]};
  font-feature-settings:
    'clig' off,
    'liga' off;
`;

const ThirdContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 33px;
`;

const WrapperBox = styled.div`
  width: 378px;
  display: flex;
  flex-direction: column;
  background-color: ${VIOLET[1]};
`;

const ImageBox = styled.div`
  width: 100%;
  height: 260px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextBox = styled.div`
  background: #f7f0fa;
  width: 100%;
  height: 124px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Text1 = styled.p`
  color: ${BLACK[1]};
  ${FONT_18_B};
`;

const Text2 = styled.p`
  color: ${BLACK[1]};
  ${FONT_16};
`;

const Detail = styled.div`
  ${FONT_16};
  color: ${GRAY[50]};
`;
