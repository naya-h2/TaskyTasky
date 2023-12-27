import { GRAY, VIOLET } from '@/styles/ColorStyles';
import TagPicker from 'rsuite/TagPicker';
import styled from 'styled-components';
import { Z_INDEX } from '@/styles/ZIndexStyles';
import 'rsuite/dist/rsuite.min.css';

interface Props {
  initialValue?: string[];
}

function TagPickerCreatable({ initialValue }: Props) {
  const data = initialValue
    ? initialValue.map((item) => ({
        label: item,
        value: item,
      }))
    : [];

  return <StyledTagPicker creatable data={data} placeholder="입력 후 Enter" />;
}

export default TagPickerCreatable;

const StyledTagPicker = styled(TagPicker)`
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  border: 1px solid ${GRAY[30]};
  border-radius: 6px;

  .rs-picker-menu {
    z-index: ${Z_INDEX['modalFrame_Body_High']};
  }

  &:focus {
    border: 1px solid ${VIOLET[1]};
  }
`;
