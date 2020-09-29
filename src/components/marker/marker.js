import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import Tooltip from '../tooltip/tooltip';
import { MARKER_SIZE, MARKER_BORDER } from './../../constants';

const Container = styled.div`
  width: ${MARKER_SIZE}px;
  height: ${MARKER_SIZE}px;
  background: darkgrey;
  position: absolute;
  border-radius: 4px;
  border: ${MARKER_BORDER}px solid grey;
  margin-left ${props => props.coordinates ? `${props.coordinates[0] - (MARKER_SIZE/2 + MARKER_BORDER)}px` : `0px`};
  margin-top ${props => props.coordinates ? `${props.coordinates[1] - (MARKER_SIZE/2 + MARKER_BORDER)}px` : `0px`};
`;

const useHover = () => {
  const [hovered, setHovered] = useState();
  
  const eventHandlers = useMemo(() => ({
    onMouseOver() { setHovered(true); },
    onMouseOut() { setHovered(false); }
  }), []);
  
  return [hovered, eventHandlers];
}
const Marker = (props) => {
  const [hovered, eventHandlers] = useHover();
  return (
    <div>
    <Container
      coordinates={props.coordinates}
      {...eventHandlers}
    >
    </Container>
    {hovered ?
      <Tooltip
        coordinates={props.coordinates}
      ></Tooltip> : ''
    }
  </div>
  );
}

export default Marker;
