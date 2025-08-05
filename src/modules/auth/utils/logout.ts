import { deleteSession } from '@/lib/delete-session'

export async function handleLogout(redirectUrl: string) {
  await deleteSession()
  window.location.href = redirectUrl
}
