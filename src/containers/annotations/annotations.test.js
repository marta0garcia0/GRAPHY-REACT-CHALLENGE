import React from 'react';
import {cleanup} from '@testing-library/react';
import Annotations from './annotations';
import Enzyme, { shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});
afterEach(cleanup);

describe('Annotations component', () => {
  test('renders', () => {
    const container = shallow(<Annotations ></Annotations>);
    expect(container.exists()).toBe(true);
    expect(container).toMatchSnapshot();
  });

  test('on click event it creates annotation', () => {
    const container = shallow(<Annotations ></Annotations>);
    expect(container.exists()).toBe(true);
    const event = {
      stopPropagation: () => {},
      target: {
          value: 'text1'
      },
      pageX: 100,
      pageY: 100
    };
  
    let annotation = container.find('Annotation');
    expect(annotation).toHaveLength(0);
    
    container.simulate('click', event);
    annotation = container.find('Annotation');
    expect(annotation).toMatchSnapshot();
    expect(annotation).toHaveLength(1);
  });

  test('it creates markers', () => {
    const container = shallow(<Annotations ></Annotations>);
    expect(container.exists()).toBe(true);
    let marker = container.find('Marker');
    expect(marker).toHaveLength(0);
    container.setState({annotations: [{
      coordinates: [5, 5],
      saved: true,
      annotationKey: '55'
    }]});
    marker = container.find('Marker');
    expect(marker).toHaveLength(1);

    container.setState({annotations: [{
      coordinates: [5, 5],
      saved: true,
      annotationKey: '55'
    },
    {
      coordinates: [9, 9],
      saved: true,
      annotationKey: '99'
    },
    {
      coordinates: [10, 10],
      saved: true,
      annotationKey: '1010'
    }]});
    marker = container.find('Marker');
    expect(marker).toHaveLength(3);
  });
});