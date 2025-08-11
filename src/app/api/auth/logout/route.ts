import { NextResponse } from 'next/server'
import { deleteSession } from '@/lib/session'

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url') || '/login'
  await deleteSession()
  return NextResponse.json({ success: true, redirect: url })
}
