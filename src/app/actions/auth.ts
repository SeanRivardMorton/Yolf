import { deleteSession } from '@/lib/session'
import { redirect } from 'next/navigation'

export async function logout() {
  deleteSession()
  redirect('/')
}
