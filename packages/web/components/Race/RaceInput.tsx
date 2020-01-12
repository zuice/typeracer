import React, {
  FunctionComponent,
  useState,
  createRef,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
} from 'react';
import { Box, Input, theme } from '@chakra-ui/core';

interface Props {
  text: string;
  currentWordIndex: number;
  onSuccessfulLetter: (i: number) => void;
  onSuccessfulWord: () => void;
  onCompleted: () => void;
  disabled: boolean;
}

let currentLetterIndex = 0;
let currentGlobalIndex = 0;
let currentInputValue = '';

export const RaceInput: FunctionComponent<Props> = ({
  text,
  currentWordIndex,
  onSuccessfulLetter,
  onSuccessfulWord,
  onCompleted,
  disabled,
}) => {
  const [error, setError] = useState('');
  const [value, setValue] = useState('');
  const inputRef = createRef<HTMLInputElement>();
  const split = text.split(' ');
  const currentWord = split[currentWordIndex];
  const borderSuccess = theme.colors.green[800];
  const borderError = theme.colors.red[800];
  const hasError = error !== '';
  const borderColor = hasError ? borderError : borderSuccess;

  const setCurrentLetterIndex = (value: number) => {
    currentLetterIndex = value;
  };
  const setCurrentGlobalIndex = (value: number) => {
    currentGlobalIndex = value;
  };
  const setCurrentInputValue = (value: string) => {
    setValue(value);

    currentInputValue = value;
  };

  const handleSpacebar = (e: KeyboardEvent<HTMLInputElement>) => {
    if (currentInputValue.replace(' ', '') === currentWord) {
      e.preventDefault();

      setCurrentInputValue('');
      setCurrentLetterIndex(0);

      onSuccessfulWord();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.which === 32) {
      handleSpacebar(e);
    }
  };

  const handleCheckLetterValidity = () => {
    const letter = currentInputValue.slice(
      currentInputValue.length - 1,
      currentInputValue.length,
    );

    if (
      letter === currentWord[currentLetterIndex] &&
      letter !== '' &&
      currentWord[currentLetterIndex] !== ''
    ) {
      setCurrentLetterIndex(currentLetterIndex + 1);
      setCurrentGlobalIndex(currentGlobalIndex + 1);

      onSuccessfulLetter(currentGlobalIndex);
    }
  };

  const handleCheckBackspace = (newValue: string) => {
    const currentWordNewValueMatch = currentWord.slice(0, newValue.length);

    console.log(currentGlobalIndex);

    if (
      (newValue.length < currentInputValue.length &&
        newValue === currentWordNewValueMatch) ||
      (newValue !== '' && currentWordNewValueMatch !== '')
    ) {
      const difference = currentInputValue.length - newValue.length;

      setCurrentLetterIndex(currentLetterIndex - difference);
      setCurrentGlobalIndex(currentGlobalIndex - difference);

      onSuccessfulLetter(currentGlobalIndex);
    }
  };

  const handleCheckError = () => {
    const isInputErroneous =
      currentWord.slice(0, currentLetterIndex) !== currentInputValue;

    if (
      isInputErroneous &&
      currentWord.slice(0, currentLetterIndex) !== '' &&
      currentInputValue !== ''
    ) {
      setError('Spelling mistake!');
    } else {
      setError('');
    }
  };

  const handleCompleted = () => {
    onCompleted();

    setCurrentLetterIndex(0);
    setCurrentGlobalIndex(0);
    setCurrentInputValue('');
  };

  const handleCheckFinalWord = () => {
    const lastWordIndex = text.split(' ').length - 1;

    if (currentWordIndex === lastWordIndex) {
      if (currentInputValue === currentWord) {
        handleCompleted();
      }
    }
  };

  const handleChange = (inputValue: string) => {
    handleCheckBackspace(inputValue);
    setCurrentInputValue(inputValue);

    handleCheckLetterValidity();
    handleCheckError();
    handleCheckFinalWord();
  };

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <>
      <Box display="flex" flex="1">
        <Box width="100vw" paddingRight="0.1rem">
          <Input
            isFullWidth
            isDisabled={disabled}
            ref={inputRef}
            name="race"
            placeholder={currentWord}
            value={value}
            borderColor={borderColor}
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(e)}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange(e.target.value)
            }
          />
        </Box>
      </Box>
      <Box>
        {hasError && (
          <Box as="span" color={theme.colors.red[300]}>
            Spelling mistake!
          </Box>
        )}
      </Box>
    </>
  );
};
