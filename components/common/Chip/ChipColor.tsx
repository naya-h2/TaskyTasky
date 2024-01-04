import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FONT_12, FONT_10 } from '@/styles/FontStyles';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import { TAG_BACKGROUND_COLOR, TAG_FONT_COLOR } from '@/styles/TagColorStyles';
import { BLACK } from '@/styles/ColorStyles';

interface Props {
  type?: string;
  tagList?: string[];
  setTagList?: Dispatch<SetStateAction<string[]>>;
  text: string;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

/**
 * @param background 배경 색상을 prop으로 받아온다
 * @param fontColor 폰트 색상을 prop으로 받아온다
 * @param text 텍스트를 prop으로 받아온다
 */

function ChipColor({ type, tagList, setTagList, text, setIsLoading }: Props) {
  const [fontColor, setFontColor] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');
  const baseUrl = process.env.NEXT_PUBLIC_HOST;

  const getRandomNumber = () => {
    const number = Math.floor(5 * Math.random());
    return number;
  };

  const postTagColor = async (tag: string) => {
    let colorId;
    setIsLoading(true);
    try {
      const resGet = await axios(`${baseUrl}/api/tag?tagName=${tag}`);
      const { colorID } = resGet.data;
      colorId = colorID;
    } catch (err) {
      const number = getRandomNumber();
      const resPost = await axios.post(`${baseUrl}/api/tag?tagName=${tag}&colorID=${number}`);
      const { colorID } = resPost.data;
      colorId = colorID;
    } finally {
      const fontColor = TAG_FONT_COLOR[colorId];
      const backgroundColor = TAG_BACKGROUND_COLOR[colorId];
      setFontColor(fontColor);
      setBackgroundColor(backgroundColor);
      setIsLoading(false);
    }
  };

  const handleDisplayNoneClick = () => {
    if (tagList && setTagList) {
      const filteredTagList = tagList.filter((item) => item !== text);
      setTagList(filteredTagList);
    }
  };

  useEffect(() => {
    postTagColor(text);
  }, []);

  return (
    <StyledContainer $backgroundColor={backgroundColor} $fontColor={fontColor}>
      {text}
      {type && <StyledBtnBox onClick={handleDisplayNoneClick}>x</StyledBtnBox>}
    </StyledContainer>
  );
}

export default ChipColor;

const StyledContainer = styled.div<{ $backgroundColor: string; $fontColor: string }>`
  height: 26px;
  padding: 4px 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
  background-color: ${(props) => props.$backgroundColor};
  color: ${(props) => props.$fontColor};
  border-radius: 4px;
  ${FONT_12};
  word-break: keep-all;

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    ${FONT_10};
  }
`;

const StyledBtnBox = styled.div`
  color: ${BLACK[2]};
  cursor: pointer;
`;
