import { FunctionComponent } from 'react';
import { Box } from '@chakra-ui/core';

export const Container: FunctionComponent = ({ children }) => (
  <Box maxW="42rem" m="0 auto">
    {children}
  </Box>
);
