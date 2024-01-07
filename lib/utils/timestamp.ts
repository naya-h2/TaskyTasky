export function timestamp(selectDate: Date) {
  const aliasDate = new Date(selectDate);
  aliasDate.setHours(aliasDate.getHours() + 9);
  return aliasDate.toISOString().replace('T', ' ').substring(0, 16);
}
