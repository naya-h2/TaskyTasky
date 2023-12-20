import { useState } from 'react';
import styled from 'styled-components';
import Input from '@/components/common/Input';
import DropDown from '@/components/common/DropDown/DropDown';

/**
 * 컴포넌트 실험용 페이지입니다. (컴포넌트 구현 완료 후 삭제 예정)
 */
export default function Test() {
  const [password, setPassword] = useState('');

  return (
    <Div>
      <Input type="email" />
      <Input type="password" isPassword={true} setPassword={setPassword} />
      <Input type="passwordConfirm" isPassword={true} passwordCheck={password} />
      <Input type="title" />
      <Input type="dueDate" />
      <Input type="tag" />
    </Div>
  );
}

const Div = styled.div`
  margin-bottom: 30px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 80px;
`;
