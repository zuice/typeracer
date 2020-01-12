import React, { useState } from 'react';
import { render, wait } from '@testing-library/react';

import { useInterval } from '../lib/useInterval';

jest.useFakeTimers();

describe('useInterval hook', () => {
  it('should count', async () => {
    const initialCounter = 0;
    const callback = jest.fn();
    const Component = () => {
      const [counter, setCounter] = useState(initialCounter);

      useInterval(() => {
        callback();
        setCounter(counter + 1);
      }, 1000);

      return <div>Current count is: {counter}</div>;
    };

    const { getByText } = render(<Component />);

    await wait(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(callback).toBeCalled();
    expect(getByText('Current count is: 2')).toBeTruthy();
  });
});
