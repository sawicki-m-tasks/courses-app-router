import 'regenerator-runtime/runtime';
import React from "react";
import { Provider } from "react-redux";
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { mockedStateWithUsername, mockedStateWithoutUsername, mockedStoreWithUsername, mockedStoreWithoutUsername } from '../../../store/mockStore';

import Header  from '../Header';

test('Contains logo', () => {
  render(
    <Provider store={mockedStoreWithUsername}>
      <Header/>
    </Provider>
  );
  expect(screen.getByTestId('logo_img')).toBeDefined();
});

test('Contains user name', () => {
  render(
    <Provider store={mockedStoreWithUsername}>
      <Header/>
    </Provider>
  );
  expect(screen.getByText(mockedStateWithUsername.user.name)).toBeInTheDocument();
});

test('Contains user email if user name is empty', () => {
  render(
    <Provider store={mockedStoreWithoutUsername}>
      <Header/>
    </Provider>
  );
  expect(screen.getByText(mockedStateWithoutUsername.user.email)).toBeInTheDocument();
})
