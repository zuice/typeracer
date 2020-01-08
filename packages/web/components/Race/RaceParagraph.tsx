import { FunctionComponent } from 'react';
import { Box, theme } from '@chakra-ui/core';

interface Props {
  text: string;
  currentIndex: number;
}

export const RaceParagraph: FunctionComponent<Props> = ({
  text,
  currentIndex,
}) => {
  const split = text.split(' ');

  return (
    <Box
      padding="0.5rem"
      margin="1rem 0 1rem 0"
      border={`${theme.borders['1px']} ${theme.colors.gray[700]}`}
      borderRadius={theme.radii.md}
    >
      {split.map((word, i) =>
        i === currentIndex ? (
          <Box
            key={`${word}${i}`}
            as="span"
            color={theme.colors.green[300]}
            paddingRight="0.2rem"
          >
            {word}
          </Box>
        ) : (
          <Box key={`${word}${i}`} as="span" paddingRight="0.2rem">
            {word}
          </Box>
        ),
      )}
    </Box>
  );
};
