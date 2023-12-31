import styled, { css } from 'styled-components';
import { useStore } from '@/context/stores';
import { modalType } from '@/lib/types/zustand';
import { BLACK, GRAY } from '@/styles/ColorStyles';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import { FONT_14_B, FONT_18 } from '@/styles/FontStyles';
import { ChangeEvent, SetStateAction, useEffect, useRef, useState } from 'react';
import { PostCardRequestType } from '@/lib/types/cards';
import { uploadCardImg } from '@/api/cards/uploadCardImg';

type Value = PostCardRequestType;

interface Props {
  type: 'card' | 'myPage';
  profileImgUrl: string | undefined | null;
  setValue: (value: SetStateAction<Value>) => void;
  columnId?: number;
}

function AddProfileImg({ type = 'myPage', profileImgUrl, setValue, columnId }: Props) {
  const [image, setImage] = useState<string | undefined | null>(profileImgUrl);
  const inputRef = useRef<HTMLInputElement>(null);
  const modal = useStore((state) => state.modals);
  const showModal = useStore((state) => state.showModal);

  const handleButtonClick = (type: modalType) => {
    if (modal.includes(type)) return;
    showModal(type);
  };

  const handleClearImage = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value = '';
    setImage(null);
  };

  const postCardImg = async (imgFile: File) => {
    if (!imgFile) return;
    if (!columnId) return;
    const resImgUrl = await uploadCardImg(columnId, imgFile);
    setValue((prev) => ({
      ...prev,
      imageUrl: resImgUrl.imageUrl,
    }));
    setImage(resImgUrl.imageUrl);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const nextValue = e.target.files[0];
      if (nextValue && nextValue.type.substring(0, 5) === 'image') {
        handleClearImage();
        postCardImg(nextValue);
      }
    }
  };
  console.log(image);

  return (
    <StyledContainer>
      {type === 'card' && <StyledLabel>이미지</StyledLabel>}
      <StyledProfileImgBox $image={image}>
        <StyledButtonWrapper>
          <StyledFileBox>
            <StyledFileLabel htmlFor="img_file">
              로컬 이미지 <br /> 사용하기
            </StyledFileLabel>
            <StyledFileInput type="file" id="img_file" accept="image/*" onChange={handleInputChange} ref={inputRef} />
          </StyledFileBox>
          <StyledImgButton onClick={() => handleButtonClick('imgUrl')}>
            외부 이미지 <br /> 사용하기
          </StyledImgButton>
        </StyledButtonWrapper>
      </StyledProfileImgBox>
    </StyledContainer>
  );
}

export default AddProfileImg;

const noProfileImg = css`
  background-color: ${GRAY[15]};
`;

const ButtonBox = css`
  width: 50%;
  height: 100%;
  background-color: transparent;
  ${FONT_14_B};
  color: ${GRAY[50]};

  &:hover {
    background-color: ${GRAY[20]};
    opacity: 70%;
  }
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const StyledProfileImgBox = styled.div<{ $image: string | null | undefined }>`
  width: 182px;
  height: 182px;

  border-radius: 6px;

  ${(props) => (props.$image ? `background-image: url(${props.$image})` : noProfileImg)};
  background-position: center;
  background-size: cover;

  &:hover :only-child {
    display: flex;
  }

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    width: 100px;
    height: 100px;
  }
`;

const StyledLabel = styled.label`
  color: ${BLACK[2]};
  ${FONT_18};
`;

const StyledButtonWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: none;
`;

const StyledFileBox = styled.div`
  ${ButtonBox};
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1.5px solid ${GRAY[50]};
`;

const StyledFileLabel = styled.label`
  width: 100%;
  height: 100%;
  display: inline-block;
  padding: 70px 0 0 0;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  ${FONT_14_B};
  color: ${GRAY[50]};
`;

const StyledFileInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;

const StyledImgButton = styled.button`
  ${ButtonBox};
  border-left: 1.5px solid ${GRAY[50]};
`;
