import React from 'react';
import { cleanup } from '@testing-library/react';
import Tooltip from './tooltip';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});
afterEach(cleanup);

describe('Tooltip component', () => {
  test('renders', () => {
    const container = shallow(<Tooltip ></Tooltip>);
    expect(container.exists()).toBe(true);
    expect(container).toMatchSnapshot();
  });
});