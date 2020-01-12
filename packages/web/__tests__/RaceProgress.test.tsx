import React from 'react';
import { render } from '@testing-library/react';

import { RaceProgress } from '../components/Race/RaceProgress';

describe('RaceProgress component', () => {
  it('should render', () => {
    const { asFragment } = render(
      <RaceProgress
        players={[
          { username: 'me', progress: 0 },
          { username: 'Frank', progress: 0 },
        ]}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
