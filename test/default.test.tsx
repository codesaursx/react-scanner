import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Scanner } from '../src';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Scanner onUpdate={(e, data) => console.log(e, data)} />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
