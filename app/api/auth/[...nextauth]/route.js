import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { PrismaAdapter } from '@auth/prisma-adapter'

const prisma = new PrismaClient()

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'john@doe.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null
        const user = await prisma.userAccount.findUnique({
          where: { email: credentials.email },
        })

        if (
          user &&
          (await bcrypt.compare(credentials.password, user.password))
        ) {
          return {
            email: user.email,
            Role: user.Role,
          }
        } else {
          throw new Error('Invalid email or password')
        }
      },
    })
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.email = user.email
        token.Role = user.Role
      }
      return token
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.email = token.email
        session.user.Role = token.Role
      }
      return session
    }
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }