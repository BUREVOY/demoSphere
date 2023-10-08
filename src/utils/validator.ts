type ValidatorType = (value: string) => string | undefined;

export const required: ValidatorType = (value) => {
  if (value) {
    return undefined;
  } else {
    return 'field is empty';
  }
};

export const maxLenghCreator =
  (maxLength: number): ValidatorType =>
  (value) => {
    if (value.length > maxLength) {
      return `maxLength is ${maxLength}`;
    } else {
      return undefined;
    }
  };
