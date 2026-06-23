import bcrypt from 'bcryptjs'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { prisma } from '@/lib/prisma'

export async function createAccount(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/users',
    {
      schema: {
        body: z.object({
          name: z.string(),
          email: z.email(),
          password: z.string().min(6),
        }),
      },
    },
    async (request, reply) => {
      const { name, email, password } = request.body

      const userWithSameEmail = await prisma.user.findFirst({
        where: { email },
      })

      if (userWithSameEmail !== null) {
        return reply.status(409).send({
          error: 'A user with that same email address already exists',
        })
      }

      await prisma.user.create({
        data: {
          name,
          email,
          passwordHash: await bcrypt.hash(password, 6),
        },
      })

      return reply.status(201).send({
        message: 'User created!',
      })
    }
  )
}
