import { GenericContainer, StartedTestContainer } from 'testcontainers'
import DBMigrate from 'db-migrate'

const getDatabaseContainer = async (): Promise<StartedTestContainer> => {
  const container = await new GenericContainer('postgres:14.2-alpine')
    .withExposedPorts(5432)
    .withEnv('POSTGRES_USER', 'test')
    .withEnv('POSTGRES_PASSWORD', 'test')
    .start()

  await initializeDatabase(container.getHost(), container.getMappedPort(5432))

  setDatabaseEnvironmentVariables(
    container.getHost(),
    container.getMappedPort(5432)
  )

  return container
}

const initializeDatabase = async (host: string, port: number) => {
  const migrate = DBMigrate.getInstance(true, {
    config: {
      test: {
        driver: 'pg',
        host: host,
        port: port,
        user: 'test',
        password: 'test',
        database: 'test',
        schema: 'public',
      },
    },
    env: 'test',
  })
  migrate.silence(true)
  await migrate.reset()
  await migrate.up()
}

const setDatabaseEnvironmentVariables = (host: string, port: number) => {
  process.env['DATABASE_HOST'] = host
  process.env['DATABASE_PORT'] = port.toString()
  process.env['DATABASE_USER'] = 'test'
  process.env['DATABASE_PASSWORD'] = 'test'
  process.env['DATABASE_NAME'] = 'test'
}

export { getDatabaseContainer }
