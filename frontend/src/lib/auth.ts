export function isAdminUser(
  user: { is_superuser?: boolean; is_staff?: boolean } | null | undefined
): boolean {
  return Boolean(user?.is_superuser || user?.is_staff);
}
