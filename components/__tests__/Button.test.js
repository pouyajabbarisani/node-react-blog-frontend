import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Button from '../Button'

describe("Button tests", () => {

   test("Check full width property", () => {
      const { container } = render(<Button isFullWidth={true} />)
      expect(container.firstChild).toHaveClass('fullwidth-button');
   })

   test("Check noSideMargin property", () => {
      const { container } = render(<Button noSideMargin={true} />)
      expect(container.firstChild).toHaveClass('nosidemargin-button');
   })

   test("Check button is disabled while loading", () => {
      const { container, queryByTestId } = render(<Button isloading={true} label="test label" />)
      expect(container.firstChild).toHaveClass('disabled-button');
      expect(queryByTestId("button-loading-div")).toBeTruthy();
   })

   test("Check button label showing correctly", () => {
      const { queryByText } = render(<Button label="test label" />)
      expect(queryByText("test label")).toBeTruthy();
   })

   test("Check button click is disabled while loading", () => {
      const mockOnClickMethod = jest.fn();
      const { container } = render(<Button isloading={true} onClick={e => mockOnClickMethod(e)} label="test label" />)
      fireEvent.click(container.firstChild);
      expect(mockOnClickMethod).not.toHaveBeenCalled();
   })

   test("Check click method called on click while not loading", () => {
      const mockOnClickMethod = jest.fn();
      const { container } = render(<Button onClick={e => mockOnClickMethod(e)} label="test label" />)
      fireEvent.click(container.firstChild);
      expect(mockOnClickMethod).toHaveBeenCalled();
   })
})