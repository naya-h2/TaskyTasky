import styled from 'styled-components';
import { FONT_16 } from '@/styles/FontStyles';
import { BLACK, GRAY, VIOLET } from '@/styles/ColorStyles';
import { Dispatch, SetStateAction, useState } from 'react';
import DashBoardColor from '../Chip/DashBoardColor';

interface Props {
  type?: string;
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
}

function ColorChoice({ type = 'create', color, setColor }: Props) {
  const [colorTheme, setColorTheme] = useState('pastel');

  return (
    <StyledColorWrapper $type={type}>
      {type !== 'edit' && <StyledText>색상 선택</StyledText>}
      <StyledThemeWrapper>
        <StyledTheme $isSelected={'pastel' === colorTheme} onClick={() => setColorTheme('pastel')}>
          PASTEL
        </StyledTheme>
        <StyledTheme $isSelected={'vivid' === colorTheme} onClick={() => setColorTheme('vivid')}>
          VIVID
        </StyledTheme>
        <StyledTheme $isSelected={'custom' === colorTheme} onClick={() => setColorTheme('custom')}>
          CUSTOM
        </StyledTheme>
      </StyledThemeWrapper>
      <StyledChipWrapper>
        <DashBoardColor theme={colorTheme} selectedColor={color} setSelectedColor={setColor} isInModal={true} />
      </StyledChipWrapper>
    </StyledColorWrapper>
  );
}

export default ColorChoice;

const StyledColorWrapper = styled.div<{ $type: string }>`
  margin-top: ${(props) => (props.$type === 'edit' ? '0px' : '20px')};

  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const StyledText = styled.div`
  ${FONT_16};
  color: ${BLACK[2]};
`;

const StyledThemeWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const StyledTheme = styled.div<{ $isSelected: boolean }>`
  width: 75px;
  padding: 5px 8px;

  display: flex;
  justify-content: center;

  border: 1px solid ${GRAY[30]};
  border-radius: 10px;

  color: ${(props) => (props.$isSelected ? `${VIOLET[1]}` : null)};
  background-color: ${(props) => (props.$isSelected ? `${VIOLET[8]}` : null)};

  &:hover {
    cursor: pointer;
    background-color: ${VIOLET[8]};
  }
`;

const StyledChipWrapper = styled.div`
  margin-top: 10px;
  justify-content: flex-start;
`;
