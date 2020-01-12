import React from 'react';
import { render } from '@testing-library/react';

import { Race } from '../components/Race';

describe('Race component', () => {
  it('should render', () => {
    const { asFragment } = render(
      <Race
        text="Hello, world."
        players={[{ username: 'example', progress: 0 }]}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
