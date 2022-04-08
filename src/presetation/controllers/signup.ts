import { HttpResponse, HttpRequest } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helpers'
export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const bodyLength = Object.keys(httpRequest.body).length
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

    for (const field of requiredFields) {
      if (!httpRequest.body[field] && bodyLength !== 0) {
        return badRequest(new MissingParamError(field))
      }
    }
    return badRequest(new MissingParamError('no body'))
  }
}
