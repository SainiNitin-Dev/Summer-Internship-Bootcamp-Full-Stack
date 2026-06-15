import { useState } from 'react';

function ThemeToggle() {
  const [dark, setDark] = useState(false);

  const style = {
    backgroundColor: dark ? '#222' : '#fff',
    color: dark ? '#fff' : '#222',
    padding: '20px',
    borderRadius: '8px',
  };

  return (
    <div style={style}>
      <h3>{dark ? 'Dark Mode' : 'Light Mode'}</h3>
      <button onClick={() => setDark(!dark)}>Toggle Theme</button>
    </div>
  );
}

export default ThemeToggle;