import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
  /** key pode ser qualquer coisa para validar qualquer campo com string */
}

export default function getValidationErrors(err:ValidationError) {
  const validationErros: Errors = {};

  err.inner.forEach((error) => {
    validationErros[error.path] = error.message;
  });

  return validationErros;
}
