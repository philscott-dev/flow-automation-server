//import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions'
import { WorkflowNode, Workflow } from '../entities'

const dbOptions: SqliteConnectionOptions = {
  type: 'sqlite',
  database: './flow-automation',
  synchronize: true,
  logging: false,
  entities: [WorkflowNode, Workflow],
}

// const dbOptions: PostgresConnectionOptions = {
//   type: 'postgres',
//   database: 'flow-automation',
//   synchronize: true,
//   logging: false,
//   entities: [WorkflowNode, Workflow],
// }

export default dbOptions
