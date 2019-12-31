import React, { ReactElement, useState } from 'react';

interface Props {
  callback: (name: string) => void;
}

function NewDrawing({ callback }: Props): ReactElement {
  // set some state for the button name
  let [name, setName] = useState('');
  return (
    <form action=''>
      <label htmlFor='nameInput'>
        Name:
        <input
          onInput={e => setName(e.currentTarget.value)}
          type='text'
          minLength={3}
          maxLength={16}
          placeholder={`Drawing 2`} // Example Title
          onKeyDown={e => e.which === 13 && e.preventDefault()} // stop form sending
          name='nameInput'
          id='nameInput'
        />
      </label>
      <input
        style={{ marginLeft: 8 }}
        type='button'
        disabled={name.length < 3} // disable button if name is too short
        value='New Drawing'
        onClick={() => callback(name)} // run new drawing call back when button clicked
      />
    </form>
  );
}

export default NewDrawing;
