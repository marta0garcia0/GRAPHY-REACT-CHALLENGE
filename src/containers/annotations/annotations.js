import React from 'react';
import styled from 'styled-components';
import Marker from './../../components/marker/marker';
import Annotation from './../../components/annotation/annotation';
import { fitScreenSize } from './../../constants';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: palegreen;
  z-index: 0;
`;

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
    const filteredAnnotation = annotations.find(annotation => {
      const [coordX, coordY] = annotation.coordinates;
      return (coordX >= x - 10 && coordX <= x + 10
        && coordY >= y - 10 && coordY <= y + 10);
    });
    // new annotation
    if (!filteredAnnotation) {
      annotations.push({coordinates: [x, y], saved: false, annotationKey: `${x}${y}`});
      this.setState({
        annotations
      });
    } else {
      // annotation to edit
      this.setState({
        annotations: annotations.map(annotation => {
          const [coordX, coordY] = annotation.coordinates;
          if (coordX >= x - 10 && coordX <= x + 10
            && coordY >= y - 10 && coordY <= y + 10) {
              annotation.saved = false;
          }
          return annotation;
        })
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
              savedNote={annotation.note}
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
