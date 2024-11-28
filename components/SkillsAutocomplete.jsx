"use client";
import { skillsDatabase } from "@/constants/Skills";
import { useState } from "react";
import { Controller } from "react-hook-form";

export const SkillsAutocomplete = ({ control, name, disabled = false }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const skillsValue = skillsDatabase.map((ele) => ele.skill);

  const handleInputChange = (value) => {
    setInputValue(value);
    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }

    // Filter suggestions based on input
    const filtered = skillsValue.filter((skill) =>
      skill.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filtered);
  };

  return (
    <div className="form-control w-full">
      <label className="label font-bold">
        <span className="label-text">Skills Specialization</span>
      </label>
      <Controller
        name={name}
        control={control}
        defaultValue={[]}
        rules={{ required: "Please select at least one skill" }}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <div className="relative">
            <div
              className={`flex flex-wrap gap-2 p-1 border rounded-lg ${
                disabled ? "bg-gray-50" : "bg-white"
              }`}
            >
              {/* Selected Skills Tags */}
              {value.map((skill, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-1 px-2 py-1 rounded-full bg-primary/20`}
                >
                  <span>{skill}</span>
                  {!disabled && (
                    <button
                      type="button"
                      onClick={() => {
                        onChange(value.filter((_, i) => i !== index));
                      }}
                      className="text-sm hover:text-error"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}

              {/* Input Field */}
              {!disabled && (
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => handleInputChange(e.target.value)}
                  className="flex-1 outline-none min-w-[200px] p-2"
                  placeholder="Type to search skills..."
                />
              )}
            </div>

            {/* Suggestions Dropdown */}
            {!disabled && suggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-gray-100 text-black border rounded-lg shadow-lg max-h-60 overflow-auto">
                {suggestions.map((skill, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-primary/10 cursor-pointer"
                    onClick={() => {
                      if (!value.includes(skill)) {
                        onChange([...value, skill]);
                      }
                      setInputValue("");
                      setSuggestions([]);
                    }}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            )}

            {/* Error Message */}
            {error && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {error.message}
                </span>
              </label>
            )}
          </div>
        )}
      />
    </div>
  );
};
