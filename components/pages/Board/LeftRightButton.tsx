import styled, { keyframes } from 'styled-components';
import ArrowToFrontIcon from '@/public/icon/double-small-left.svg';
import ArrowToBackIcon from '@/public/icon/double-small-right.svg';
import { useEffect, useState } from 'react';
import { Z_INDEX } from '@/styles/ZIndexStyles';
import { GRAY, VIOLET } from '@/styles/ColorStyles';
import { DEVICE_SIZE } from '@/styles/DeviceSize';

function ScrollableContent() {
  const [isFront, setIsFront] = useState(true);
  const [isBack, setIsBack] = useState(false);

  const scrollToStart = () => {
    window.scrollTo({ left: 0, behavior: 'smooth' });
  };

  const scrollToEnd = () => {
    const totalWidth = document.documentElement.scrollWidth;
    const windowWidth = document.documentElement.clientWidth;
    window.scrollTo({ left: totalWidth - windowWidth, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentX = document.documentElement.scrollLeft || document.body.scrollLeft;
      const totalWidth = document.documentElement.scrollWidth || document.body.scrollWidth;
      const windowWidth = document.documentElement.clientWidth || document.body.clientWidth;

      setIsFront(currentX <= 10);
      setIsBack(currentX >= totalWidth - windowWidth);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Wrapper>
      <FrontBtn isFront={isFront} onClick={scrollToStart}>
        <ArrowToFrontIcon />
      </FrontBtn>
      <BackBtn isBack={isBack} onClick={scrollToEnd}>
        <ArrowToBackIcon />
      </BackBtn>
    </Wrapper>
  );
}

export default ScrollableContent;

const toRight = keyframes`
 50% {
  transform: translateX(10px);
 }
`;

const toLeft = keyframes`
 50% {
  transform: translateX(-10px);
 }
`;

const Wrapper = styled.div`
  width: calc(100vw - 300px);
  height: 50px;
  padding: 0 20px 0;

  position: fixed;
  top: 70px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  z-index: ${Z_INDEX['LeftRightScroll_Button']};

  background-color: ${VIOLET[9]};

  @media (max-width: ${DEVICE_SIZE.tablet}) {
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

const FrontBtn = styled(Btn)<{ isFront: boolean }>`
  animation: ${toRight} 2s 0.5s infinite;
  opacity: ${(props) => (props.isFront ? 0 : 1)};
`;

const BackBtn = styled(Btn)<{ isBack: boolean }>`
  animation: ${toLeft} 2s 0.5s infinite;
  opacity: ${(props) => (props.isBack ? 0 : 1)};
`;
