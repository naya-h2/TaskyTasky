export const getPlaceholder = (type: string) => {
  let placeholder;
  switch (type) {
    case 'email':
      placeholder = '이메일을 입력해주세요';
      break;
    case 'password':
      placeholder = '비밀번호를 입력해주세요';
      break;
    case 'passwordConfirm':
      placeholder = '비밀번호를 다시 입력해주세요';
      break;
    case 'title':
      placeholder = '제목을 입력해주세요';
      break;
    case 'dueDate':
      placeholder = '날짜를 선택해주세요';
      break;
    case 'nickname':
      placeholder = '닉네임을 입력해주세요';
      break;
    case 'name':
      placeholder = '이름을 입력해주세요';
      break;
    case 'dashboard':
      placeholder = '대시보드 이름을 입력해주세요';
      break;
    default:
      placeholder = '';
      break;
  }
  return placeholder;
};
