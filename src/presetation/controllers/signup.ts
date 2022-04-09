import { HttpResponse, HttpRequest } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { InvalidParamError } from '../errors/invalid-param-error'
import { badRequest, successOkRequest } from '../helpers/http-helpers'
import { Controller } from '../protocols/controller'
import { EmailValidator } from '../protocols/email-validator'
import { PasswordValidator } from '../protocols/password-validator'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly passwordValidator: PasswordValidator

  constructor (emailValidator: EmailValidator, passwordValidator: PasswordValidator) {
    this.emailValidator = emailValidator
    this.passwordValidator = passwordValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    const bodyLength = Object.keys(httpRequest.body).length
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

    for (const field of requiredFields) {
      if (!httpRequest.body[field] && bodyLength !== 0) {
        return badRequest(new MissingParamError(field))
      }
    }

    if (bodyLength === 0) {
      return badRequest(new MissingParamError('no body'))
    }
    const isValidEmail = this.emailValidator.isValid(httpRequest.body.email)

    if (!isValidEmail) {
      return badRequest(new InvalidParamError('email'))
    }

    const isValidPassword = this.passwordValidator.isValid(httpRequest.body.password)

    if (!isValidPassword) {
      return badRequest(new InvalidParamError('password'))
    }
    return successOkRequest()
  }
}
