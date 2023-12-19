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
    <>
      <Div>
        <DropDown type="status" initialStatus={'Done'} />
      </Div>
      <Div>
        <DropDown type="person" initialPerson="이규호" />
      </Div>
      <Div>
        <DropDown type="kebab" />
      </Div>
      <Input type="email" placeholder="이메일을 입력하세요" />
      <Input type="password" isPassword={true} placeholder="비밀번호를 입력하세요" setPassword={setPassword} />
      <Input
        type="passwordConfirm"
        isPassword={true}
        placeholder="비밀번호를 다시 입력하세요"
        passwordCheck={password}
      />
    </>
  );
}

const Div = styled.div`
  padding: 60px 100px 60px 200px;
`;
