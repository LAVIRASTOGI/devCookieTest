// components/FormFields.jsx

// Formfield.jsx
import React from "react";

export const FormField = ({ label, children, error }) => {
  return (
    <div className="form-control w-full">
      {label && (
        <label className="label ">
          <span className="label-text font-semibold  text-[1rem]">{label}</span>
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

// Add this new component alongside your existing components

export const RadioField = ({
  register,
  name,
  label,
  error,
  options,
  className = "",
  ...props
}) => (
  <FormField label={label} error={error}>
    <div className={`flex flex-wrap gap-4 ${className} p-1`}>
      {options.map(({ value, label: optionLabel, selected }) => (
        <label
          key={value}
          className="flex items-center gap-2 cursor-pointer min-w-[120px] sm:min-w-fit"
        >
          <input
            type="radio"
            value={value}
            defaultChecked={selected}
            {...register(name)}
            className={`radio ${error ? "radio-error" : ""}`}
            {...props}
          />
          <span className="label-text text-sm sm:text-base">{optionLabel}</span>
        </label>
      ))}
    </div>
  </FormField>
);

export const CheckboxField = ({
  register,
  name,
  label,
  error,
  options,
  className = "",
  ...props
}) => (
  <FormField label={label} error={error}>
    <div className={`flex flex-wrap gap-4 ${className} p-1`}>
      {options.map(({ value, label: optionLabel }) => (
        <label
          key={value}
          className="flex items-center gap-2 cursor-pointer min-w-[120px] sm:min-w-fit"
        >
          <input
            type="checkbox"
            value={value}
            {...register(name)}
            className="h-4 w-4 rounded border-gray-300 text-[#467ac0] focus:ring-[#467ac0]"
            {...props}
          />
          <span className="text-sm sm:text-base text-gray-700">
            {optionLabel}
          </span>
        </label>
      ))}
    </div>
  </FormField>
);
