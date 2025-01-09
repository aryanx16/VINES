import React, { useState } from 'react';

export default function SelectDropdownExample() {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <label>
        Select an option:
        <select value={selectedOption} onChange={handleChange}>
          <option value="">Select...</option>
          <option value="Option 1">Option 1</option>
          <option value="Option 2">Option 2</option>
          <option value="Option 3">Option 3</option>
        </select>
      </label>
      <div>
        <h3>Selected Option: {selectedOption}</h3>
      </div>
    </div>
  );
}

// export default SelectDropdownExample;
