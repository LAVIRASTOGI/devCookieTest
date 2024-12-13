"use client";
import Image from "next/image";
import React from "react";

function SpecializationCard({ specialization, onSelect, isSelected }) {
  const handleClick = () => {
    onSelect(specialization); // Pass the specialization data to parent
  };

  return (
    <div
      onClick={handleClick}
      className={`p-4 border rounded-lg cursor-pointer transition-all
        ${
          isSelected
            ? "border-primary bg-primary/5 shadow-md"
            : "hover:border-primary hover:shadow-md"
        }`}
    >
      <div className="flex items-center gap-3 mb-2">
        <Image
          src={specialization?.icon}
          alt={specialization.title}
          width={30}
          height={30}
          priority
        />
        <h3
          className={`text-lg font-semibold ${
            isSelected ? "text-primary" : ""
          }`}
        >
          {specialization.title}
        </h3>

        {/* Checkbox indicator */}
        <div className="ml-auto">
          <div
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
              ${isSelected ? "border-primary bg-primary" : "border-gray-300"}`}
          >
            {isSelected && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
        </div>
      </div>

      <p
        className={`text-sm ${isSelected ? "text-gray-700" : "text-gray-600"}`}
      >
        {specialization.description}
      </p>
    </div>
  );
}

export default SpecializationCard;
