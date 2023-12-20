export const getPlaceholder = (type: string) => {
  let placeholder;
  switch (type) {
    case 'email':
      placeholder = '이메일을 입력하세요';
      break;
    case 'password':
      placeholder = '비밀번호를 입력하세요';
      break;
    case 'passwordConfirm':
      placeholder = '비밀번호를 다시 입력하세요';
      break;
    case 'title':
      placeholder = '제목을 입력해 주세요';
      break;
    case 'dueDate':
      placeholder = '날짜를 선택해 주세요';
      break;
    case 'tag':
      placeholder = '입력 후 Enter';
      break;
    default:
      placeholder = '';
      break;
  }
  return placeholder;
};
