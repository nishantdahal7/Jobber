import React from "react";

import { render, fireEvent } from '@testing-library/react';



test("the passwords should match",()=>{

    const password=['abcd']

    const confirmpassword=['abcd']

    expect(password).toEqual(confirmpassword);

})