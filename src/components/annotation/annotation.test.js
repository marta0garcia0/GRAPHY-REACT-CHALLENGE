import React from 'react';
import { cleanup } from '@testing-library/react';
import Annotation from './annotation';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});
afterEach(cleanup);

describe('Annotation component', () => {
  test('renders', () => {
    const container = shallow(<Annotation ></Annotation>);
    expect(container.exists()).toBe(true);
    expect(container.props().children.length).toBe(3);
    expect(container).toMatchSnapshot();
  });

  test('on change input the state is updated', () => {
    const container = shallow(<Annotation ></Annotation>);
    const event = {
      stopPropagation: () => {},
      target: {
          value: 'text1'
      }
    };
    container.props().children[0].props.onChange(event);
    expect(container.props().children[0].props.value).toBe(event.target.value);
  });
});