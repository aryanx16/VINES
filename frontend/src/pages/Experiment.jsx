import React, { useState } from 'react';
import Navbar from "../components/Navbar";
export default function SelectDropdownExample() {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className='bg-neutral-950 w-screen min-h-screen absolute top-0'>
      <Navbar/>
      <section>
      <div></div>
      </section>
    </div>
  );
}

// export default SelectDropdownExample;
