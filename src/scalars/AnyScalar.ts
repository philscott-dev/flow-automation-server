import { GraphQLScalarType, Kind } from 'graphql'

export function AnyValue(value: any) {
  if (typeof value === 'string') {
    return String
  }
  if (typeof value === 'number') {
    return Number
  }

  if (value == 'true' || value == 'false') {
    return Boolean
  }
}

export const AnyValueScalar = new GraphQLScalarType({
  name: 'AnyValue',
  description: 'String | Int | Boolean',
  //value sent to the client
  serialize(value) {
    return Number(value) || value
  },
  //value from the client
  parseValue(value) {
    if (
      typeof value !== 'number' &&
      typeof value !== 'string' &&
      typeof value !== 'boolean'
    ) {
      throw new Error('Must be instance of String, Int, or Boolean')
    }
    return value
  },
  parseLiteral(ast): any {
    // check the type of received value
    if (ast.kind === Kind.INT) {
      return ast.value
    }

    if (ast.kind === Kind.STRING) {
      return ast.value
    }

    if (ast.kind === Kind.BOOLEAN) {
      return ast.value
    }
  },
})
