import React from 'react';
import { cleanup } from '@testing-library/react';
import Marker from './marker';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});
afterEach(cleanup);

describe('Marker component', () => {
  test('renders', () => {
    const container = shallow(<Marker ></Marker>);
    expect(container.exists()).toBe(true);
    expect(container).toMatchSnapshot();
  });

  test('on hover event it creates tooltip', () => {
    const container = shallow(<Marker ></Marker>);
    let tooltip = container.find('Tooltip');
    expect(tooltip).toHaveLength(0);
    container.props().children[0].props.onMouseOver();
    tooltip = container.find('Tooltip');
    expect(tooltip).toHaveLength(1);
  });
});