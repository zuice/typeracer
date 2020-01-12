import React, { FunctionComponent, useState } from 'react';
import { Box } from '@chakra-ui/core';

import { RaceState } from '../../types/RaceState';
import { RaceCountdown } from './RaceCountdown';
import { RaceParagraph } from './RaceParagraph';
import { RaceProgress } from './RaceProgress';
import { RaceInput } from './RaceInput';

interface Props {
  text: string;
  players: { username: string; progress: number }[];
}

const INITIAL_COUNTDOWN = 5;

export const Race: FunctionComponent<Props> = ({ text, players }) => {
  const [currentRaceState, setCurrentRaceState] = useState(RaceState.WAITING);
  const [meCurrentProgress, setMeCurrentProgress] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  return (
    <Box>
      <RaceCountdown
        initialCountdown={INITIAL_COUNTDOWN}
        currentRaceState={currentRaceState}
        setCurrentRaceState={setCurrentRaceState}
      />
      <RaceProgress
        players={[...players, { username: 'Me', progress: meCurrentProgress }]}
      />
      <RaceParagraph text={text} currentIndex={currentWordIndex} />
      <RaceInput
        text={text}
        currentWordIndex={currentWordIndex}
        onSuccessfulLetter={(i: number) => {
          const totalLength = text.split(' ').join('').length;

          setMeCurrentProgress((i / totalLength) * 100);
        }}
        onSuccessfulWord={() => setCurrentWordIndex(currentWordIndex + 1)}
        onCompleted={() => {
          setCurrentRaceState(RaceState.COMPLETED);
          setCurrentWordIndex(0);
        }}
        disabled={currentRaceState !== RaceState.IN_PROGRESS}
      />
    </Box>
  );
};
