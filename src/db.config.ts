import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import { Node, Workflow } from './entities'

// const sqliteOptions: SqliteConnectionOptions = {
//   type: 'sqlite',
//   database: './db.sqlite',
//   synchronize: true,
//   logging: false,
//   entities: [ScreenshotEntity],
// }

const options: PostgresConnectionOptions = {
  type: 'postgres',
  database: 'flow-automation',
  synchronize: true,
  logging: false,
  entities: [Node, Workflow],
}

export default options
