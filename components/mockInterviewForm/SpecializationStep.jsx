"use client";
import React from "react";
import SpecializationCard from "./SpecializationCard";
import { SPECIALIZATIONS } from "@/constants/specalizations ";

const SpecializationStep = ({ onSelect, selectedSpecializations }) => {
  const handleSelect = (specialization) => {
    if (selectedSpecializations && selectedSpecializations?.length > 0) {
      const isAlreadySelected = selectedSpecializations.some(
        (spec) => spec.id === specialization.id
      );
      if (isAlreadySelected) {
        // Remove if already selected
        const updatedSelections = selectedSpecializations.filter(
          (spec) => spec.id !== specialization.id
        );
        onSelect(updatedSelections);
      } else {
        // Add if not selected
        onSelect([...selectedSpecializations, specialization]);
      }
    } else {
      onSelect([specialization]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Choose Your Specializations</h2>
        <span className="text-sm text-gray-600">
          {selectedSpecializations?.length} selected
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SPECIALIZATIONS.map((spec) => (
          <SpecializationCard
            key={spec.id}
            specialization={spec}
            onSelect={handleSelect}
            isSelected={selectedSpecializations?.some(
              (selected) => selected.id === spec.id
            )}
          />
        ))}
      </div>

      {/* Show selected specializations */}
      {selectedSpecializations?.length > 0 && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium mb-2">
            Selected Specializations:
          </h3>
          <div className="flex flex-wrap gap-2">
            {selectedSpecializations.map((spec) => (
              <span
                key={spec.id}
                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
              >
                {spec.title}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SpecializationStep;
