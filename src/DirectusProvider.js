import * as React from 'react';
import { Directus } from '@directus/sdk';

export const DirectusContext = React.createContext(null);

export const DirectusProvider = ({ apiUrl, options, children }) => {
  const value = React.useMemo(() => ({
    apiUrl: apiUrl,
    directus: new Directus(apiUrl, options),
  }), [apiUrl, options]);

  return (
    <DirectusContext.Provider value={value}>
      {children}
    </DirectusContext.Provider>
  );
};

export const useDirectus = () => React.useContext(DirectusContext);
