// components/FormFields.jsx

// Formfield.jsx
import React from "react";

export const FormField = ({ label, children, error }) => {
  return (
    <div className="form-control w-full">
      {label && (
        <label className="label">
          <span className="label-text font-medium">{label}</span>
        </label>
      )}

      {children}

      {error && (
        <label className="label">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
};

export const InputField = ({
  register,
  name,
  label,
  error,
  type = "text",
  rows = 3,
  className = "",
  textareaClassName = "",
  inputClassName = "",
  ...props
}) => {
  if (type === "textarea") {
    return (
      <FormField label={label} error={error} className={className}>
        <textarea
          {...register(name)}
          className={`textarea textarea-bordered w-full rounded-lg resize-vertical
            ${error ? "border-red-500" : ""}
            ${textareaClassName}
          `}
          rows={rows}
          {...props}
        />
      </FormField>
    );
  }

  return (
    <FormField label={label} error={error} className={className}>
      <input
        {...register(name)}
        type={type}
        className={`input input-bordered w-full rounded-lg
          ${error ? "border-red-500" : ""}
          ${inputClassName}
        `}
        {...props}
      />
    </FormField>
  );
};

export const SelectField = ({
  register,
  name,
  label,
  error,
  options,
  ...props
}) => (
  <FormField label={label} error={error}>
    <select
      {...register(name)}
      className={`select select-bordered w-full rounded-lg ${
        error ? "border-red-500" : ""
      }`}
      {...props}
    >
      <option value="">Select an option</option>
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  </FormField>
);
