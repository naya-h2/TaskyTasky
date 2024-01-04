import { BLACK, GRAY } from '@/styles/ColorStyles';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import { FONT_14, FONT_16, FONT_20_B, FONT_22 } from '@/styles/FontStyles';
import styled from 'styled-components';
import Image from 'next/image';

function MiniSection() {
  return (
    <StyledContainer>
      <StyledTitle>생산성을 높이는 다양한 설정들⚡</StyledTitle>
      <StyledBoxWrapper>
        <StyledBox>
          <StyledImgBox>
            <StyledImage alt="대시보드 생성 모달 이미지" src="/images/home_mini_1.png" width={300} height={230} />
          </StyledImgBox>
          <StyledTextWrapper>
            <StyledBoxTitle>대시보드 설정</StyledBoxTitle>
            <StyledDetail>대시보드 색상과 이름을 변경할 수 있어요.</StyledDetail>
          </StyledTextWrapper>
        </StyledBox>
        <StyledBox>
          <StyledImgBox>
            <StyledImage alt="대시보드 초대 내역 이미지" src="/images/home_mini2.png" width={300} height={230} />
          </StyledImgBox>
          <StyledTextWrapper>
            <StyledBoxTitle>초대</StyledBoxTitle>
            <StyledDetail>새로운 팀원을 초대할 수 있어요.</StyledDetail>
          </StyledTextWrapper>
        </StyledBox>
        <StyledBox>
          <StyledImgBox>
            <StyledImage alt="대시보드 구성원 목록 이미지" src="/images/home_mini3.png" width={300} height={196} />
          </StyledImgBox>
          <StyledTextWrapper>
            <StyledBoxTitle>구성원</StyledBoxTitle>
            <StyledDetail>구성원을 초대하고 내보낼 수 있어요.</StyledDetail>
          </StyledTextWrapper>
        </StyledBox>
      </StyledBoxWrapper>
    </StyledContainer>
  );
}

export default MiniSection;

const StyledContainer = styled.div`
  width: 100%;
  margin-bottom: 150px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    flex-direction: row;
    justify-content: space-between;
  }
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    flex-direction: column;
  }
`;

const StyledTitle = styled.div`
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: 55px;
  color: ${BLACK[1]};

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    width: 250px;
    text-align: center;
    word-wrap: break-word;
    word-break: keep-all;
  }

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    width: 100%;
    ${FONT_22};
    font-weight: 700;
  }
`;

const StyledBoxWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 33px;

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    width: 378px;

    display: flex;
    flex-direction: column;
  }

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    width: 100%;
  }
`;

const StyledBox = styled.div`
  padding: 20px;

  display: flex;
  flex-direction: column;
  gap: 30px;

  background: white;
  border-radius: 30px;
  box-shadow: 4px 12px 30px 6px rgba(0, 0, 0, 0.09);

  &:hover {
    transition: all 0.3s ease;
    transform: translateY(-5px);
    box-shadow: 4px 12px 20px 6px rgba(0, 0, 0, 0.18);
  }
`;

const StyledImgBox = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledImage = styled(Image)`
  border-radius: 10px;
  box-shadow: 4px 0px 15px 4px rgba(0, 0, 0, 0.18);
`;

const StyledBoxTitle = styled.div`
  ${FONT_20_B};
`;

const StyledDetail = styled.div`
  word-break: keep-all;

  ${FONT_16};
  color: ${GRAY[50]};

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    ${FONT_14};
  }
`;

const StyledTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
