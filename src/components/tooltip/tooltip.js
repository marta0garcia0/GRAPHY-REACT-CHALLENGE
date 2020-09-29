import React from 'react';
import styled from 'styled-components';
import {TOOPTIP_WIDTH, TOOPTIP_HEIGHT, MARKER_SIZE, MARKER_TOOLTIP_MARGIN} from './../../constants';

const calculatePositionX = x => (
	// display the tooltip at the left side if it doesn't fit screen
  x <= window.innerWidth - (TOOPTIP_WIDTH + MARKER_SIZE + MARKER_TOOLTIP_MARGIN)
    ? `${x + MARKER_TOOLTIP_MARGIN}px`
    : `${x - (TOOPTIP_WIDTH + MARKER_SIZE + MARKER_TOOLTIP_MARGIN)}px`
);

const calculatePositionY = y => (
  y < TOOPTIP_HEIGHT ? `${y - (MARKER_SIZE / 2)}px` :
	// to not exceed the window height
  y <= window.innerHeight - (MARKER_SIZE + 2 * MARKER_TOOLTIP_MARGIN)
    ? `${y - MARKER_SIZE / 2}px` : `${y - (TOOPTIP_HEIGHT)}px`
);

const Container = styled.div`
  width: ${TOOPTIP_WIDTH}px;
  height:  ${TOOPTIP_HEIGHT}px;
  background: purple;
  border-radius: 4px;
  border: 1px solid grey;
  position: absolute;
  margin-left: ${props => props.coordinates ? calculatePositionX(props.coordinates[0]) : `0px`}};
  margin-top: ${props => props.coordinates ? calculatePositionY(props.coordinates[1]) : `0px`};
  z-index: 1;
  color: white;
  font-size: 20px;
  padding: 5px 10px;
`;

const Tooltip = (props) => {
  return (
    <Container coordinates={props.coordinates}>
      tooltip at ({props.coordinates[0]}, {props.coordinates[1]})
    </Container>
  );
}

export default Tooltip;
