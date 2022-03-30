import { GenericContainer, StartedTestContainer } from 'testcontainers'
import DBMigrate from 'db-migrate'

const getDatabaseContainer = async (): Promise<StartedTestContainer> => {
  const container = await new GenericContainer('postgres:14.2-alpine')
    .withExposedPorts(5432)
    .withEnv('POSTGRES_USER', 'test')
    .withEnv('POSTGRES_PASSWORD', 'test')
    .start()

  const migrate = DBMigrate.getInstance(true, {
    config: {
      test: {
        driver: 'pg',
        host: container.getHost(),
        port: container.getMappedPort(5432),
        user: 'test',
        password: 'test',
        database: 'test',
        schema: 'public',
      },
    },
    env: 'test',
  })
  await migrate.reset()
  await migrate.up()
  return container
}

export { getDatabaseContainer }
