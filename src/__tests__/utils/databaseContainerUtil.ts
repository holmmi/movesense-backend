import { GenericContainer } from 'testcontainers'

const getDatabaseContainer = async () => {
  const container = await new GenericContainer('postgres:14.2-alpine')
    .withExposedPorts(99999)
    .withEnv('POSTGRES_USER', 'test')
    .withEnv('POSTGRES_PASSWORD', 'test')
    .start()
}

export { getDatabaseContainer }
