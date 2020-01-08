import {
  FunctionComponent,
  useState,
  KeyboardEvent,
  ChangeEvent,
  createRef,
  useEffect,
} from 'react';
import { Box, Input, theme, Button, Icon } from '@chakra-ui/core';

interface Props {
  text: string;
  currentIndex: number;
  onSuccessfulLetter: (i: number) => void;
  onSuccessfulWord: () => void;
  onReset: () => void;
  onCompleted: () => void;
  disabled: boolean;
}

export const RaceInput: FunctionComponent<Props> = ({
  text,
  currentIndex,
  onSuccessfulLetter,
  onSuccessfulWord,
  onReset,
  onCompleted,
  disabled,
}) => {
  const [error, setError] = useState(false);
  const [value, setValue] = useState('');
  const [currentGlobalIndex, setCurrentGlobalIndex] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const inputRef = createRef<HTMLInputElement>();
  const split = text.split(' ');
  const currentWord = split[currentIndex];
  const borderSuccess = theme.colors.green[800];
  const borderError = theme.colors.red[800];
  const borderColor = error ? borderError : borderSuccess;

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
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
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);

            const currentLetter =
              e.target.value.length > 1
                ? e.target.value[e.target.value.length - 1]
                : e.target.value;

            if (currentLetter === ' ') {
              if (e.target.value.replace(' ', '') === currentWord) {
                onSuccessfulWord();
                setValue('');
                setError(false);
              } else {
                setError(true);
              }
            }

            if (currentLetter === currentWord[currentLetterIndex]) {
              setCurrentLetterIndex(currentLetterIndex + 1);
              setCurrentGlobalIndex(currentGlobalIndex + 1);
              onSuccessfulLetter(currentGlobalIndex);

              if (currentLetter === currentWord[currentWord.length - 1]) {
                setCurrentLetterIndex(0);
              }

              if (currentIndex === split.length - 1) {
                if (currentLetterIndex === currentWord.length - 1) {
                  onCompleted();
                  setValue('');
                }
              }
            } else {
              setError(true);
            }
          }}
        />
      </Box>
      <Box paddingLeft="0.1rem">
        <Button
          onClick={() => {
            onReset();
            setValue('');

            inputRef.current.focus();
          }}
          isDisabled={disabled}
        >
          <Icon name="repeat-clock" />
        </Button>
      </Box>
    </Box>
  );
};
