import React from 'react';
import { render } from '@testing-library/react';

import { Race } from '../components/Race';
import { RaceParagraph } from '../components/Race/RaceParagraph';

describe('RaceParagraph component', () => {
  it('should render', () => {
    render(
      <Race text="Hello, world." players={[]}>
        <RaceParagraph text="Hello world." currentIndex={0} />
      </Race>,
    );
  });
});
