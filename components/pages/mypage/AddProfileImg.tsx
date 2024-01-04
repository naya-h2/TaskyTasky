import styled, { css } from 'styled-components';
import { useStore } from '@/context/stores';
import { BLACK, GRAY } from '@/styles/ColorStyles';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { FONT_12B, FONT_14_B, FONT_18 } from '@/styles/FontStyles';
import { PostCardRequestType } from '@/lib/types/cards';
import { uploadCardImg } from '@/api/cards/uploadCardImg';
import { createUserImage } from '@/api/users/createUserImage';
import AlertModal from '@/components/common/Modal/AlertModal';

type Value = PostCardRequestType;

interface Props {
  type: 'card' | 'myPage';
  initialUrl: string | null | undefined;
  columnId?: number;
}

function AddProfileImg({ type = 'myPage', initialUrl, columnId }: Props) {
  const [errMsg, setErrMsg] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { profileUrl, setProfileUrl, cardUrl, setCardUrl, showModal, modals } = useStore((state) => ({
    profileUrl: state.profileUrl,
    setProfileUrl: state.setProfileUrl,
    cardUrl: state.cardUrl,
    setCardUrl: state.setCardUrl,
    showModal: state.showModal,
    modals: state.modals,
  }));

  const handleImgDelete = () => {
    type === 'card' ? setCardUrl('') : setProfileUrl(null);
  };

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const imgFile = e.target.files[0];
    if (imgFile && imgFile.type.substring(0, 5) === 'image') {
      const response =
        type === 'card' && columnId ? await uploadCardImg(columnId, imgFile) : await createUserImage(imgFile);
      if (response.status !== 201) {
        console.log(response.data.error.message);
        setErrMsg(response.data.error.message);
        return showModal('imgError');
      }
      type === 'card' ? setCardUrl(response.data.imageUrl) : setProfileUrl(response.data.profileImageUrl);
    }
  };

  useEffect(() => {
    type === 'card' ? setCardUrl(initialUrl as string) : setProfileUrl(initialUrl as string | null);
  }, []);

  return (
    <>
      <StyledContainer>
        {type === 'card' && <StyledLabel>이미지</StyledLabel>}
        <StyledProfileImgBox $image={type === 'card' ? cardUrl : profileUrl}>
          <StyledButtonWrapper>
            <StyledFileBox>
              <StyledFileLabel htmlFor="img_file">
                이미지 <br /> 변경하기
              </StyledFileLabel>
              <StyledFileInput type="file" id="img_file" accept="image/*" onChange={handleInputChange} ref={inputRef} />
            </StyledFileBox>
            <StyledImgButton onClick={handleImgDelete}>
              이미지 <br /> 삭제하기
            </StyledImgButton>
          </StyledButtonWrapper>
        </StyledProfileImgBox>
      </StyledContainer>
      {modals[modals.length - 1] === 'imgError' && (
        <AlertModal type="customAlert" customName="imgError">
          {errMsg}
        </AlertModal>
      )}
    </>
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

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    ${FONT_12B};
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
  background-repeat: no-repeat;

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

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    padding-top: 33px;
    ${FONT_12B};
  }
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
