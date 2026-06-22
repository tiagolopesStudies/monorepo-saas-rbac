import z from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().startsWith('postgresql://'),
})

export const env = envSchema.parse(process.env)
