import { MiddlewareFn } from 'type-graphql'

// https://typegraphql.com/docs/middlewares.html

export const ErrorInterceptor: MiddlewareFn<any> = async (_, next) => {
  try {
    return await next()
  } catch (err) {
    // write error to file log
    //fileLog.write(err, context, info)

    // hide errors from db like printing sql query
    // if (someCondition(err)) {
    //   throw new Error('Unknown error occurred!')
    // }

    console.log(err)

    // rethrow the error
    throw err
  }
}
