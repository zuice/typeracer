import {
  FunctionComponent,
  useState,
  createRef,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
} from 'react';
import { Box, Input, theme, Button, Icon } from '@chakra-ui/core';

interface Props {
  text: string;
  currentWordIndex: number;
  onSuccessfulLetter: (i: number) => void;
  onSuccessfulWord: () => void;
  onReset: () => void;
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
  onReset,
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

  const handleBackspace = () => {
    if (currentInputValue !== '' && !hasError) {
      setCurrentLetterIndex(currentLetterIndex - 1);
      setCurrentGlobalIndex(currentGlobalIndex - 1);

      onSuccessfulLetter(currentGlobalIndex);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.which === 32) {
      handleSpacebar(e);
    } else if (e.which === 8) {
      handleBackspace();
    }
  };

  const handleCheckLetterValidity = () => {
    const letter = currentInputValue.slice(
      currentInputValue.length - 1,
      currentInputValue.length,
    );

    if (letter === currentWord[currentLetterIndex]) {
      setCurrentLetterIndex(currentLetterIndex + 1);
      setCurrentGlobalIndex(currentGlobalIndex + 1);

      onSuccessfulLetter(currentGlobalIndex);
    }
  };

  const handleCheckError = () => {
    const isInputErroneous =
      currentWord.slice(0, currentLetterIndex) !== currentInputValue;

    if (isInputErroneous) {
      setError('Spelling mistake!');
    } else {
      setError('');
    }
  };

  const handleCheckFinalWord = () => {
    const lastWordIndex = text.split(' ').length - 1;

    if (currentWordIndex === lastWordIndex) {
      if (currentInputValue === currentWord) {
        onCompleted();
      }
    }
  };

  const handleChange = (inputValue: string) => {
    setCurrentInputValue(inputValue);

    handleCheckLetterValidity();
    handleCheckError();
    handleCheckFinalWord();
  };

  const handleClick = () => {
    setValue('');
    setCurrentInputValue('');
    setCurrentGlobalIndex(0);
    setCurrentLetterIndex(0);
    onReset();
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
        <Box paddingLeft="0.1rem">
          <Button onClick={handleClick} isDisabled={disabled}>
            <Icon name="repeat-clock" />
          </Button>
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
