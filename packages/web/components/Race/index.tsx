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

export const Race: FunctionComponent<Props> = ({ text }) => {
  const [currentRaceState, setCurrentRaceState] = useState(RaceState.WAITING);
  const [currentCountdown, setCurrentCountdown] = useState(5);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  function restartRace() {
    setCurrentRaceState(RaceState.WAITING);
    setCurrentCountdown(5);
    setCurrentIndex(0);
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
      <RaceParagraph text={text} currentIndex={currentIndex} />
      <RaceInput
        text={text}
        currentIndex={currentIndex}
        onSuccessfulLetter={(i: number) => {
          console.log(
            i + 1,
            text.split(' ').join(''),
            text.split(' ').join('').length,
          );

          setCurrentProgress(((i + 1) / text.split(' ').join('').length) * 100);
        }}
        onSuccessfulWord={() => setCurrentIndex(currentIndex + 1)}
        onReset={() => {
          restartRace();
        }}
        onCompleted={() => setCurrentRaceState(RaceState.COMPLETED)}
        disabled={currentRaceState !== RaceState.IN_PROGRESS}
      />
    </Box>
  );
};
