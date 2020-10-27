import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import { WorkflowNode, Workflow } from '../entities'

// const sqliteOptions: SqliteConnectionOptions = {
//   type: 'sqlite',
//   database: './db.sqlite',
//   synchronize: true,
//   logging: false,
//   entities: [ScreenshotEntity],
// }

const dbOptions: PostgresConnectionOptions = {
  type: 'postgres',
  database: 'flow-automation',
  synchronize: true,
  logging: false,
  entities: [WorkflowNode, Workflow],
}

export default dbOptions
