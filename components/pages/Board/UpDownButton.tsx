import styled, { keyframes } from 'styled-components';
import ArrowToFrontIcon from '@/public/icon/double-small-left.svg';
import { useEffect, useState } from 'react';
import { Z_INDEX } from '@/styles/ZIndexStyles';
import { GRAY, VIOLET } from '@/styles/ColorStyles';
import { DEVICE_SIZE } from '@/styles/DeviceSize';

function UpDownButton() {
  const [isTop, setIsTop] = useState(true);
  const [isBottom, setIsBottom] = useState(false);

  const scrollToStart = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToEnd = () => {
    const totalHeight = document.documentElement.scrollHeight;
    const windowHeight = document.documentElement.clientHeight;
    window.scrollTo({ top: totalHeight - windowHeight, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentX = document.documentElement.scrollTop || document.body.scrollTop;
      const totalHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      const windowHeight = document.documentElement.clientHeight || document.body.clientHeight;

      setIsTop(currentX <= 10);
      setIsBottom(currentX >= totalHeight - windowHeight);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Wrapper>
      <FrontBtn isTop={isTop} onClick={scrollToStart}>
        <ArrowToFrontIcon />
      </FrontBtn>
      <BackBtn isBottom={isBottom} onClick={scrollToEnd}>
        <ArrowToFrontIcon />
      </BackBtn>
    </Wrapper>
  );
}

export default UpDownButton;

const toBottom = keyframes`
 50% {
  transform: translateY(10px);
 }
`;

const toTop = keyframes`
 50% {
  transform: translateY(-10px);
 }
`;

const Wrapper = styled.div`
  width: 35px;
  height: calc(100vh - 70px);
  padding-bottom: 40px;

  position: fixed;
  right: 0;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  z-index: ${Z_INDEX['LeftRightScroll_Button']};

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    width: 25px;
    height: calc(100vh - 70px);
    padding: 10px 15px 20px;

    position: fixed;
    top: 70px;
  }

  @media (min-width: ${DEVICE_SIZE.tablet}) {
    display: none;
  }
`;

const Btn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  fill: ${GRAY[40]};

  svg {
    width: 30px;
    height: 30px;
  }
`;

const FrontBtn = styled(Btn)<{ isTop: boolean }>`
  animation: ${toBottom} 2s 0.5s infinite;
  opacity: ${(props) => (props.isTop ? 0 : 1)};
  svg {
    transform: rotate(90deg);
  }
`;

const BackBtn = styled(Btn)<{ isBottom: boolean }>`
  animation: ${toTop} 2s 0.5s infinite;
  opacity: ${(props) => (props.isBottom ? 0 : 1)};
  svg {
    transform: rotate(270deg);
  }
`;
