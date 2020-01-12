import React from 'react';
import { render, wait } from '@testing-library/react';

import { RaceCountdown } from '../components/Race/RaceCountdown';
import { RaceState } from '../types/RaceState';

jest.useFakeTimers();

describe('RaceCountdown component', () => {
  it('should render', () => {
    const { asFragment } = render(
      <RaceCountdown
        initialCountdown={5}
        currentRaceState={RaceState.WAITING}
        setCurrentRaceState={(_: RaceState) => {}}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should set the race state with the timer', async () => {
    let currentRaceState = RaceState.WAITING;
    const initialCountdown = 5;
    const setCurrentRaceState = jest.fn();

    const { getByText } = render(
      <RaceCountdown
        initialCountdown={initialCountdown}
        currentRaceState={currentRaceState}
        setCurrentRaceState={(raceState: RaceState) => {
          currentRaceState = raceState;

          setCurrentRaceState();
        }}
      />,
    );

    expect(setCurrentRaceState).not.toBeCalled();
    expect(getByText(`Race is starting... ${initialCountdown}`)).toBeTruthy();

    await wait(() => {
      jest.advanceTimersByTime((initialCountdown + 1) * 1000);
    });

    expect(setCurrentRaceState).toBeCalled();
    expect(getByText('Race is starting... 0')).toBeTruthy();
  });
});
