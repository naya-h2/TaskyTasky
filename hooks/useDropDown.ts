import { useState } from 'react';

/**
 * 모달을 열고, 닫을 때 사용하는 커스텀 훅
 */
function useDropDown() {
  const [isOpen, setIsOpen] = useState(false);

  function handleDropDownOpen(): void {
    setIsOpen(true);
  }

  function handleDropDownClose(): void {
    setIsOpen(false);
  }

  return { isOpen, handleDropDownOpen, handleDropDownClose };
}

export default useDropDown;
