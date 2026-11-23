import React from "react";

/**
 * Displays an individual available reservation time slot chip and lets users
 * click directly to select that time inside BookingForm.
 */
function BookingSlot({ time, isSelected, onSelect }) {
  return (
    <button
      type="button"
      className={`slot-chip ${isSelected ? "slot-chip--selected" : ""}`}
      aria-pressed={isSelected}
      aria-label={`Select reservation time ${time}`}
      onClick={() => onSelect(time)}
    >
      {time}
    </button>
  );
}

export default BookingSlot;
