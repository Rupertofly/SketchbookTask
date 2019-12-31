import React, { ReactElement, useState } from 'react';

interface Props {
  callback: (name: string) => void;
}

function NewDrawing({ callback }: Props): ReactElement {
  let [name, setName] = useState('');
  return (
    <form action=''>
      <label htmlFor='nameInput'>
        Name:{' '}
        <input
          onInput={e => setName(e.currentTarget.value)}
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
        onClick={() => callback(name)}
      />
    </form>
  );
}

export default NewDrawing;
