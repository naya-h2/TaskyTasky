import { memberLists } from '../types/type';

type type = 'status' | 'member' | 'kebab';
interface Value {
  status: string;
  member: string;
}

export const getFilteredUser = (type: type, memberLists: memberLists | undefined, value: Value) => {
  let filteredUser;
  if (type === 'member' && memberLists) {
    filteredUser = memberLists.members.filter((item) => item.nickname.includes(value.member));
  }
  return filteredUser;
};
