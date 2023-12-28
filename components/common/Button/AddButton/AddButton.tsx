import styled from 'styled-components';
import ButtonBase, { BaseProps } from '../ButtonBase';
import AddChip from '@/components/common/Chip/AddChip';

export function AddButton({ roundSize, children, onClick }: BaseProps) {
  return (
    <ButtonBase style="outline" roundSize={roundSize} onClick={onClick}>
      <StyledLayout>
        {children}
        <AddChip />
      </StyledLayout>
    </ButtonBase>
  );
}

const StyledLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;
