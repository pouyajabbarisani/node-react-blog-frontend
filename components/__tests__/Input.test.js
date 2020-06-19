import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Input from '../Input'

describe("Input Tests", () => {
   const placeholderText = 'testinput'

   test("Check input default value", () => {
      const { getByPlaceholderText } = render(<Input placeholder={placeholderText} value="test default" />)
      const input = getByPlaceholderText(placeholderText)
      expect(input.value).toEqual('test default')
   })

   test("Check onChange method have been called currectly", () => {
      const testChangeMethod = jest.fn();
      const { getByPlaceholderText } = render(<Input placeholder={placeholderText} onChange={e => testChangeMethod(e)} />)
      const input = getByPlaceholderText(placeholderText)
      expect(testChangeMethod).not.toHaveBeenCalled();

      fireEvent.change(input, { target: { value: "new input content" } })
      expect(testChangeMethod).toHaveBeenCalled();
   })

   test("Check onBlur method have been called currently", () => {
      const testBlurMethod = jest.fn();
      const { getByPlaceholderText } = render(<Input placeholder={placeholderText} onBlur={e => testBlurMethod(e)} />)
      const input = getByPlaceholderText(placeholderText)
      fireEvent.focus(input)
      expect(testBlurMethod).not.toHaveBeenCalled();

      fireEvent.blur(input)
      expect(testBlurMethod).toHaveBeenCalled();
   })

   test("Check label rendered currectly", () => {
      const sampleLabelForTest = 'sample label';
      const { queryByText } = render(<Input placeholder={placeholderText} label={sampleLabelForTest} />)
      expect(queryByText(sampleLabelForTest)).toBeTruthy()
   })

   test("Check functionality of fullWidth property", () => {
      const { container } = render(<Input fullWidth={true} />)
      expect(container.firstChild.classList.contains('fullwidth-input-container')).toBe(true);
   })

   test("Check functionality of errorMessage property", () => {
      const { queryByText } = render(<Input errorMessage={'test error message'} />)
      expect(queryByText('test error message')).not.toBeNull() // it means error message exist, so test can find it.
   })

})