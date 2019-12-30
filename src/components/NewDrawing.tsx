import React, { ReactElement, useState } from 'react';

interface Props {}

function NewDrawing({}: Props): ReactElement {
  let [name, setName] = useState('');
  return (
    <form action=''>
      <label htmlFor='nameInput'>
        Name:{' '}
        <input
          onKeyUp={e => setName(e.currentTarget.value)}
          type='text'
          minLength={3}
          maxLength={16}
          placeholder={`Drawing -1`}
          name='nameInput'
          id='nameInput'
        />
      </label>
      <input
        style={{ marginLeft: 8 }}
        type='button'
        disabled={name.length < 3}
        value='New Drawing'
      />
    </form>
  );
}

export default NewDrawing;
