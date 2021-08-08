import React, { useState, createContext } from "react";

export const LoaderContext = createContext();

export const LoaderProvider = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  return <LoaderContext.Provider value={[isOpen, setIsOpen]}>{props.children}</LoaderContext.Provider>;
};
