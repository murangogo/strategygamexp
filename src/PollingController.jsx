import React from 'react';

const PollingContext = React.createContext();

export const PollingProvider = PollingContext.Provider;
export const PollingConsumer = PollingContext.Consumer;

export default PollingContext;
