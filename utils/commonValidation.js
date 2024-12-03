export const passwordValidation = {
  required: "Please enter your password",
  minLength: {
    value: 8,
    message: "Password must be at least 8 characters long",
  },
  maxLength: {
    value: 32,
    message: "Password cannot be longer than 32 characters",
  },
  pattern: {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    message:
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
  },
  validate: {
    hasUpperCase: (value) => {
      return (
        /[A-Z]/.test(value) ||
        "Password must contain at least one uppercase letter"
      );
    },
    hasLowerCase: (value) => {
      return (
        /[a-z]/.test(value) ||
        "Password must contain at least one lowercase letter"
      );
    },
    hasNumber: (value) => {
      return /\d/.test(value) || "Password must contain at least one number";
    },
    hasSpecialChar: (value) => {
      return (
        /[@$!%*?&]/.test(value) ||
        "Password must contain at least one special character (@$!%*?&)"
      );
    },
    noSpaces: (value) => {
      return !/\s/.test(value) || "Password cannot contain spaces";
    },
    notCommon: (value) => {
      const commonPasswords = ["password", "password123", "12345678", "qwerty"];
      return (
        !commonPasswords.includes(value.toLowerCase()) ||
        "Please use a stronger password"
      );
    },
  },
};

// Optional: If you want to allow either email or username
export const emailOrUsernameValidation = {
  required: "Please enter your email or username",
  validate: {
    validFormat: (value) => {
      // Check if input is an email
      const isEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
      // Check if input is a valid username
      const isUsername = /^[a-zA-Z0-9_]{3,20}$/.test(value);

      return isEmail || isUsername || "Please enter a valid email or username";
    },
    minLength: (value) => {
      return value.length >= 3 || "Must be at least 3 characters long";
    },
    maxLength: (value) => {
      return value.length <= 50 || "Cannot be longer than 50 characters";
    },
    noSpecialCharsForUsername: (value) => {
      // Only apply this validation if it's not an email
      if (!value.includes("@")) {
        return (
          /^[a-zA-Z0-9_]*$/.test(value) ||
          "Username can only contain letters, numbers, and underscores"
        );
      }
      return true;
    },
  },
};
export const nameValidation = {
  required: "Full name is required",
  minLength: {
    value: 2,
    message: "Name must be at least 2 characters",
  },
  pattern: {
    value: /^[A-Za-z\s]+$/,
    message: "Name can only contain letters and spaces",
  },
};

export const emailValidation = {
  required: "Email is required",
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "Invalid emailId address",
  },
};

export const phoneValidation = {
  required: "Phone number is required",
  pattern: {
    value: /^[0-9]{10}$/,
    message: "Please enter a valid 10-digit phone number",
  },
};

export const usernameValidation = {
  required: "Username is required",
  minLength: {
    value: 3,
    message: "Username must be at least 3 characters",
  },
  pattern: {
    value: /^[a-zA-Z0-9_]+$/,
    message: "Username can only contain letters, numbers, and underscores",
  },
};

export const experienceValidation = {
  required: "Years of experience is required",
  min: {
    value: 0,
    message: "Years of experience cannot be negative",
  },
  max: {
    value: 50,
    message: "Please enter a valid years of experience",
  },
  pattern: {
    value: /^\d+$/,
    message: "Please enter a valid number",
  },
};
export const dateValidation = {
  required: "Date is required",
  validate: (value) => {
    const selectedDate = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today || "Please select a future date";
  },
};

export const timeValidation = {
  required: "Time is required",
};
export const experienceLevelValidation = {
  required: "Experience level is required",
};
export const planAmountValidation = {
  required: "Plan amount is required",
};
export const checkboxSkillValidation = {
  required: "Please select at least one skill",
  validate: (value) =>
    (value && value.length > 0) || "Please select at least one skill",
};
