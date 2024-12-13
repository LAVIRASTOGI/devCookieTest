import { Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import moment from "moment";

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
      {options.map(({ value, label, disabled = false }) => (
        <option key={value} value={value} disabled={disabled}>
          {label}
        </option>
      ))}
    </select>
  </FormField>
);

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
export const DatePickerFeild = ({
  register,
  name,
  label,
  error,
  className = "",
  textareaClassName = "",
  inputClassName = "",
  min,
  max,
  control,
  ...props
}) => {
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];
  const minDate = min || today;
  const maxDate =
    max ||
    (() => {
      // Default max date to 3 months from today if not provided
      const date = new Date();
      date.setMonth(date.getMonth() + 1);
      return date.toISOString().split("T")[0];
    })();

  return (
    <FormField label={label} error={error} className={className}>
      <Controller
        name="date"
        control={control}
        defaultValue={null}
        rules={{ required: "Date is required" }}
        render={({ field }) => {
          const handleDateChange = (date) => {
            if (date) {
              // Example: format date
              const formattedDate = moment(date).format("YYYY-MM-DD");
              field.onChange(formattedDate);
            } else {
              field.onChange(date);
            }
          };

          return (
            <>
              <DatePicker
                placeholderText="Select a date"
                selected={field.value}
                onChange={handleDateChange}
                minDate={minDate}
                maxDate={maxDate}
                className={`w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out
                ${
                  error
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 hover:border-gray-400"
                }
                disabled:bg-gray-100 disabled:cursor-not-allowed
                pr-10`}
              />
            </>
          );
        }}
      />
    </FormField>
  );
};
