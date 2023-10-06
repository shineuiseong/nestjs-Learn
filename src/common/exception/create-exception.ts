import { HttpException, HttpStatus } from '@nestjs/common'

export const createException = (
  status: HttpStatus,
  field: string,
  message: string
): HttpException => {
  return new HttpException(
    {
      status,
      errors: {
        [field]: message
      }
    },
    status
  )
}
