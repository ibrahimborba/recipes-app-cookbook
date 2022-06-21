import React, { useState } from 'react';

function Foods() {
  const [categories] = useState([]);

  return (
    <section>
      { categories.map((category) => (
        <button
          key={ category }
          type="button"
        >
          {category}
        </button>
      ))}
    </section>
  );
}

export default Foods;
