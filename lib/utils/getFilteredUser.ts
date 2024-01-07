import { MemberListType } from '../types/members';

type type = 'status' | 'member' | 'kebab';
interface Value {
  status: string;
  member: string;
}

export const getFilteredUser = (type: type, memberLists: MemberListType[] | undefined, value: Value) => {
  let filteredUser;
  if (type === 'member' && memberLists) {
    filteredUser = memberLists.filter((item) => item.nickname.includes(value.member));
  }
  return filteredUser;
};
