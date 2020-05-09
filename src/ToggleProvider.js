import React, { useState } from 'react';
import ToggleContext from './ToggleContext';

export default ({ accountId, environmentName, fetch, children }) => {
  const [toggles, setToggles] = useState({});

  return (
    <ToggleContext.Provider
      value={{ accountId, environmentName, fetch, toggles, setToggles }}
    >
      {children}
    </ToggleContext.Provider>
  );
};
