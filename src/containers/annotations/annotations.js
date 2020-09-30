import React from 'react';
import styled from 'styled-components';
import Marker from './../../components/marker/marker';
import Annotation from './../../components/annotation/annotation';
import { MARKER_BORDER, MARKER_SIZE } from './../../constants';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: palegreen;
  z-index: 0;
`;

// function to avoid markers out of the container
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
    this.state = {annotations: []};
    this.handleSelection = this.handleSelection.bind(this);
    this.saveAnnotation = this.saveAnnotation.bind(this);
    this.discardAnnotation = this.discardAnnotation.bind(this);
  }

  handleSelection(ev) {
    let { pageX: x, pageY: y } = ev;
    x = fitScreenSize(x, window.innerWidth);
    y = fitScreenSize(y, window.innerHeight);

    const annotations = this.state.annotations;
    // we don't want to repeat the market at the same position (+-10)
    const filteredAnnotations = annotations.filter(annotation => {
      const [coordX, coordY] = annotation.coordinates;
      return !(coordX >= x - 10 && coordX <= x + 10
        && coordY >= y - 10 && coordY <= y + 10);
    });
    if (filteredAnnotations.length === annotations.length) {
      annotations.push({coordinates: [x, y], saved: false, annotationKey: `${x}${y}`});
      this.setState({
        annotations
      });
    } else {
      // if a marker is clicked remove for usability
      this.setState({
        annotations: filteredAnnotations
      });
    }
  };

  saveAnnotation(text, annotationKey) {
    this.setState({
      annotations: this.state.annotations.map(annotation => {
        if (annotation.annotationKey === annotationKey) {
          annotation.saved = true;
          annotation.note = text;
        }
        return annotation;
      })  
    });
  }

  discardAnnotation(annotationKey) {
    const annotations = this.state.annotations.filter(annotation =>
      annotation.annotationKey !== annotationKey);
    this.setState({
      annotations
    });
  }

  render() {
    return (
      <Container onClick={this.handleSelection}>
        <div>
          {this.state.annotations.map((annotation, i) =>
            annotation.saved ?
              <Marker
                coordinates={annotation.coordinates}
                note={annotation.note}
                key={i}
              ></Marker>
              :
              <Annotation
                key={i}
                annotationKey={annotation.annotationKey}
                onSave={this.saveAnnotation}
                onDiscard={this.discardAnnotation}
              ></Annotation>
          )}
        </div>
      </Container>
    );
  }
}
export default Annotations;
