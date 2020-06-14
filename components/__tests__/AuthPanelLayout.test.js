import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { render, act } from '@testing-library/react'
import AuthPanelLayout, { CHECK_AUTH, SET_AUTH } from '../AuthPanelLayout'

const mockAuth = {
   request: {
      query: CHECK_AUTH
   },
   result: {
      data: { checkAuth: { fullName: 'Test Tester', username: 'testtester', isManager: true } },
   },
};
const mockSetAuth = {
   request: {
      query: SET_AUTH,
      variables: { fullName: 'Test Tester', username: 'testtester', isManager: true }
   },
   result: {
      data: {}
   }
}

jest.mock('../PanelLayout.js', () => () => {
   return (<div data-testid="mocked-panel-layout">panel layout</div>);
});

describe("auth panel layout test", () => {
   test("Auth panel layout shows loading page on initial state", () => {
      const { queryByTestId } = render(
         <MockedProvider mocks={[]} resolvers={{}}>
            <AuthPanelLayout />
         </MockedProvider>
      );
      expect(queryByTestId("panel-loading")).toBeTruthy();
   })

   test("Atuh panel layout shows children after truthy auth", async () => {
      let renderResult;
      await act(async () => {
         renderResult = render(
            <MockedProvider mocks={[mockAuth, mockSetAuth]} addTypename={false} resolvers={{}}>
               <AuthPanelLayout />
            </MockedProvider>
         )
      })
      const innerPanelLayout = await renderResult.findByTestId("mocked-panel-layout");
      expect(innerPanelLayout.textContent).toEqual('panel layout');
   })
})
