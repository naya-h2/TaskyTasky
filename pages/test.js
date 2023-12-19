import AddChip from "@/components/common/Chip/AddChip";
import { useState } from 'react';
import { BLACK, GRAY, VIOLET, WHITE } from '@/styles/ColorStyles';
import ColumnNameChip from '@/components/common/Chip/ColumnNameChip';
import CountChip from '@/components/common/Chip/CountChip';
import DashBoardColor from '@/components/common/Chip/DashBoardColor';
import ChipColor from '@/components/common/Chip/ChipColor';

export default function Test() {
  const [selectedColor, setSelectedColor] = useState('');

  return (
    <>
      <AddChip/>
      <ColumnNameChip content="Hello"/>
      <CountChip number={2} />
      <DashBoardColor selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
      <ChipColor backgroundColor="#F9EEE3" fontColor="#D58D49" text="Hello, World!" />
    </>
  )
}

// const BOX_WIDTH = {
//   20: '20',
//   21: '21',
//   22: '22',
//   23: '23',
//   30: '30',
//   33: '33',
//   38: '38',
//   44: '44',
//   47: '47',
//   52: '52',
//   54: '54',
//   55: '55',
//   57: '57',
//   60: '60',
//   83: '83',
//   94: '94',
//   190: '190',
//   180: '180',
// };

// const BOX_HEIGHT = {
//   20: '20',
//   22: '22',
//   28: '28',
//   30: '30',
// };

// const BOX_SIZE = {
//   BOX1: { width: 20, height: 20 },
//   BOX2: { width: 21, height: 20 },
//   BOX3: { width: 22, height: 22 },
//   BOX4: { width: 23, height: 22 },
//   BOX5: { width: 30, height: 20 },
//   BOX6: { width: 33, height: 22 },
//   BOX7: { width: 38, height: 20 },
//   BOX8: { width: 44, height: 22 },
//   BOX9: { width: 47, height: 20 },
//   BOX10: { width: 52, height: 20 },
//   BOX11: { width: 54, height: 22 },
//   BOX12: { width: 55, height: 20 },
//   BOX13: { width: 57, height: 22 },
//   BOX14: { width: 60, height: 22 },
//   BOX15: { width: 83, height: 20 },
//   BOX16: { width: 94, height: 22 },
//   BOX17: { width: 180, height: 28 },
//   BOX18: { width: 190, height: 30 },
// };

{/* <Chip1 
        content="Hello" 
        chip={true} 
        chipColor={GRAY}
        boxAndFontColor={VIOLET} 
        width="54" 
        height="22" 
        borderRadius="11"
      /> */}


      // import Image from "next/image";
      // import styled from "styled-components";
      // import doneIcon from "@/public/icon/done_Fillo.svg"
      // import { GREEN, PURPLE, ORANGE, BLUE, PINK } from '@/styles/ColorStyles';
      //import ChipColor from './../components/common/Chip/ChipColor';

      // interface Props {
      //   colors: string[];
      //   selectedColor: string;
      //   set: (color: string) => void;
      //   color: string;
      // }
      
      // function DashBoardColor({
      //   selectedColor,
      //   set,
      //   color,
      // }: Props) {
      //   const handleClickColor = (color: string) => {
      //     set(color);
      //   };
      
      //   const colors = [GREEN, PURPLE, ORANGE, BLUE, PINK];
      
      //   return (
      //     <Container>
      //       {colors.map((color) => (
      //         <ColorBox key={color} onClick={() => handleClickColor(color)} isSelected={selectedColor === color} />
      //       ))}
      //     </Container>
      //   );
      // }
      
      // export default DashBoardColor;
      
      // const Container = styled.div`
      
      // `;
      
      // const ColorBox = styled.div<{ isSelected: boolean }>`
      //   // 여기에 ColorBox 클래스에 대한 CSS 속성을 추가하세요.
      //   // 그리고, isSelected에 따라 다르게 표시되어야 하는 속성들을 추가하세요.
      //   ${(props) =>
      //     props.isSelected && `
      //     // 여기에 선택된 경우에 대한 CSS 속성을 추가하세요.
      //   `}
      // `;