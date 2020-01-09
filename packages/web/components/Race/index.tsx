import { FunctionComponent, useState, useEffect } from 'react';
import {
  Box,
  Progress,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
} from '@chakra-ui/core';

import { RaceParagraph } from './RaceParagraph';
import { RaceInput } from './RaceInput';

enum RaceState {
  'WAITING',
  'IN_PROGRESS',
  'COMPLETED',
}

interface Props {
  text: string;
}

const DEFAULT_COUNTDOWN = 5;

export const Race: FunctionComponent<Props> = ({ text }) => {
  const [currentRaceState, setCurrentRaceState] = useState(RaceState.WAITING);
  const [currentCountdown, setCurrentCountdown] = useState(DEFAULT_COUNTDOWN);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  function restartRace() {
    setCurrentRaceState(RaceState.WAITING);
    setCurrentCountdown(DEFAULT_COUNTDOWN);
    setCurrentProgress(0);
    setCurrentWordIndex(0);
  }

  useEffect(() => {
    if (currentRaceState === RaceState.WAITING) {
      setTimeout(() => {
        setCurrentCountdown(currentCountdown - 1);

        if (currentCountdown === 0) {
          setCurrentRaceState(RaceState.IN_PROGRESS);
          setCurrentCountdown(5);
        }
      }, 1000);
    }
  });

  return (
    <Box>
      <Modal
        isCentered
        isOpen={currentRaceState === RaceState.WAITING}
        onClose={() => {}}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>You've entered the race</ModalHeader>
          <ModalBody>Race is starting... {currentCountdown}</ModalBody>
        </ModalContent>
      </Modal>
      <Progress hasStripe marginTop="1rem" value={currentProgress} />
      <RaceParagraph text={text} currentIndex={currentWordIndex} />
      <RaceInput
        text={text}
        currentWordIndex={currentWordIndex}
        onSuccessfulLetter={(i: number) => {
          const totalLength = text.split(' ').join('').length;

          setCurrentProgress((i / totalLength) * 100);
        }}
        onSuccessfulWord={() => setCurrentWordIndex(currentWordIndex + 1)}
        onReset={() => restartRace()}
        onCompleted={() => {
          setCurrentRaceState(RaceState.COMPLETED);
          setCurrentWordIndex(0);
        }}
        disabled={currentRaceState !== RaceState.IN_PROGRESS}
      />
    </Box>
  );
};
