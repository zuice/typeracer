import React, { FunctionComponent, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
} from '@chakra-ui/core';

import { RaceState } from '../../types/RaceState';
import { useInterval } from '../../lib/useInterval';

interface Props {
  initialCountdown: number;
  currentRaceState: RaceState;
  setCurrentRaceState: (state: RaceState) => void;
}

export const RaceCountdown: FunctionComponent<Props> = ({
  initialCountdown,
  currentRaceState,
  setCurrentRaceState,
}) => {
  const [currentCountdown, setCurrentCountdown] = useState(initialCountdown);

  useInterval(() => {
    if (currentCountdown === 0) {
      setCurrentRaceState(RaceState.IN_PROGRESS);
      clearInterval();
    } else {
      setCurrentCountdown(currentCountdown - 1);
    }
  }, 1000);

  return (
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
  );
};
