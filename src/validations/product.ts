
export const validateProductName = (input: string): Validation => {
  if (input.length < 3 || input.length > 20) {
    return "Ups! The product name must be between 3 and 20 characters.";
  }
}

export const validateSectionName = (input: string): Validation => {
  if (input.length < 3 || input.length > 20) {
    return "Ups! The section name must be between 3 and 20 characters.";
  }
}

export const validateProductPrice = (input: string): Validation => {
  let int = parseInt(input);
  if (isNaN(int)) {
    return "Ups! Must be a number";
  }
  if (int < 0) return "Ups! The price must be a positive number.";
}