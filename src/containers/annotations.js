import React from 'react';
import styled from 'styled-components';
import Marker from '../components/marker/marker';
import { MARKER_BORDER, MARKER_SIZE } from './../constants';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: palegreen;
`;

const fitScreenSize = (coordinate, dimension) => {
  if (coordinate < MARKER_SIZE / 2)
    return MARKER_SIZE / 2;
  if (coordinate >= dimension - (MARKER_SIZE / 2 + 2 * MARKER_BORDER))
    return  dimension - (MARKER_SIZE / 2 + 2 * MARKER_BORDER);
  return coordinate;
}
 
class Annotations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {coordinates: []};
    this.handleSelection = this.handleSelection.bind(this);
  }

  handleSelection(ev) {
    let { pageX: x, pageY: y } = ev;
    x = fitScreenSize(x, window.innerWidth);
    y = fitScreenSize(y, window.innerHeight);

    const coordinates = this.state.coordinates;
    const filteredCoordinates = coordinates.filter(coordinate => 
      !(coordinate[0] >= x - 10 && coordinate[0] <= x + 10
      && coordinate[1] >= y - 10 && coordinate[1] <= y + 10)
    );
    // we don't want to repeat the market at the same position (+-10)
    if (filteredCoordinates.length === coordinates.length) {
      coordinates.push([x, y]);
      this.setState({
        coordinates
      });
    } else {
      // if a marker is clicked remove for usability
      this.setState({
        coordinates: filteredCoordinates
      });
    }
  };

  render() {
    return (
      <Container onClick={this.handleSelection}>
        <div>
          {this.state.coordinates.map((xy, i) =>
            <Marker
              coordinates={xy}
              key={i}
            ></Marker>
          )}
        </div>
      </Container>
    );
  }
}
export default Annotations;
