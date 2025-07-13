// app/test-session/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getIronSession, IronSession } from 'iron-session';
import { sessionOptions, UserSession } from '@/lib/session';

export async function GET(req: NextRequest) {
  const res = NextResponse.next();

  const session = (await getIronSession(req, res, sessionOptions)) as IronSession<UserSession>;

  session.user = {
    email: 'admin@example.com',
    role: 'admin',
    isLoggedIn: true,
  };

  await session.save();

  return NextResponse.json({ success: true });
}
