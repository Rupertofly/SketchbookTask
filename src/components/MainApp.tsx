import React, { ReactElement, CSSProperties } from 'react';

interface Props {}

function MainApp({}: Props): ReactElement {
  const appStyling: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
  };
  return (
    <div style={appStyling}>
      <h1>App</h1>
    </div>
  );
}

export default MainApp;
