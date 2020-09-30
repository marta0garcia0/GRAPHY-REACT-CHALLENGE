import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import {TOOPTIP_WIDTH, TOOPTIP_HEIGHT, MARKER_SIZE, MARKER_TOOLTIP_MARGIN} from './../../constants';

const calculatePositionX = (x, xRef) => (
	// display the tooltip at the left side if it doesn't fit screen
  x <= window.innerWidth - (xRef + MARKER_SIZE + MARKER_TOOLTIP_MARGIN)
    ? `${x + MARKER_TOOLTIP_MARGIN}px`
    : `${x - (xRef + MARKER_SIZE + MARKER_TOOLTIP_MARGIN)}px`
);

const calculatePositionY = (y, yRef) => (
  y < yRef ? `${y - (MARKER_SIZE / 2)}px` :
    // to not exceed the window height
    y <= window.innerHeight - (MARKER_SIZE + 2 * MARKER_TOOLTIP_MARGIN)
      ? `${y - MARKER_SIZE / 2}px` : `${y - (yRef)}px`
);

const Container = styled.div`
  max-width: ${TOOPTIP_WIDTH}px;
  max-height:  ${TOOPTIP_HEIGHT}px;
  background: rgb(68, 180, 189);
  border-radius: 4px;
  position: absolute;
  margin-left: ${props => props.coordinates ? calculatePositionX(props.coordinates[0], TOOPTIP_WIDTH) : `0px`}};
  margin-top: ${props => props.coordinates ? calculatePositionY(props.coordinates[1], TOOPTIP_HEIGHT) : `0px`};
  z-index: 1;
  color: white;
  font-size: 14px;
  padding: 5px 10px;
  overflow-y: auto;
`;

const Tooltip = ({coordinates, note}) => {
  const ref = useRef(null);
  useEffect(() => {
    // adjust position for tooltip to fit the size
    ref.current.style.marginLeft = calculatePositionX(coordinates[0], ref.current.offsetWidth);
    ref.current.style.marginTop = calculatePositionY(coordinates[1], ref.current.offsetHeight);
  }, [ref.current]);
  return (
    <Container ref={ref} coordinates={coordinates}>
      {note}
    </Container>
  );
}

export default Tooltip;
