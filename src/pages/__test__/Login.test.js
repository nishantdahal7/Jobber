import React from "react";

import { render, fireEvent } from '@testing-library/react';

const validateInput=(str="")=> str.includes("@")

describe("Login", ()=>{

  test('validate function should pass on corrrect input', () => {
    const text ="asd@gmail.com";
    expect(validateInput(text)).toBe(true);
  });

  test('validate function should pass on corrrect input', () => {
  const text = "aditi@gmail.com";
  expect(validateInput(text)).toBe(true);
  })
})
