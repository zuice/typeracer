import React, { FunctionComponent } from 'react';
import { Box, Progress } from '@chakra-ui/core';

interface Props {
  players: { username: string; progress: number }[];
}

export const RaceProgress: FunctionComponent<Props> = ({ players }) => (
  <Box display="flex" flexDirection="column">
    {players.map(player => (
      <Box key={player.username} paddingTop="1rem">
        {player.username}:
        <Progress value={player.progress} />
      </Box>
    ))}
  </Box>
);
