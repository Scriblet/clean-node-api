import { HttpResponse } from '../protocols/http'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const goodRequest = (): HttpResponse => ({
  statusCode: 200,
  body: 'Ok'
})
