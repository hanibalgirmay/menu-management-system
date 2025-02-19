"use client";

import React from 'react';

type TCustomProvider = {
  handleFormSubmit: (data: any) => void;
  children: React.ReactNode;
};

const CustomProvider = ({ handleFormSubmit, children }: TCustomProvider) => {
  return <form onSubmit={handleFormSubmit}>{children}</form>;
};

export default CustomProvider;
