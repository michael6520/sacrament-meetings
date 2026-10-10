import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { authConfig } from './auth.config';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsed = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;
        const ownerEmail = process.env.OWNER_EMAIL;
        const ownerHash = process.env.OWNER_PASSWORD_HASH;
        if (!ownerEmail || !ownerHash) return null;

        if (email.toLowerCase() !== ownerEmail.toLowerCase()) return null;
        console.log('hash:', ownerHash, 'len:', ownerHash?.length);
        const ok = await bcrypt.compare(password, ownerHash);
        if (!ok) return null;

        return { id: 'owner', name: 'Owner', email: ownerEmail };
      },
    }),
  ],
});