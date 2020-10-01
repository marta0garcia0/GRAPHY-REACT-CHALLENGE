import React, { useState } from 'react';
import styled from 'styled-components';
import { ANNOTATION_SIZE, MARKER_BORDER } from './../../constants';

const Container = styled.textarea`
  width: ${ANNOTATION_SIZE}px;
  height: ${ANNOTATION_SIZE}px;
  background: rgb(243, 196, 64);
  position: absolute;
  border-radius: 8px;
  border: ${MARKER_BORDER}px solid yellow;
  margin-left: ${(window.innerWidth - ANNOTATION_SIZE) / 2}px;
	margin-top: 80px;
	padding: 40px 10px 10px;
	font-size: 14px;
	z-index: 1;
`;

const MyButton = styled.button`
  height: 20px;
  position: absolute;
  border-radius: 8px;
  border: ${MARKER_BORDER}px solid grey;
	margin-top: 84px;
	z-index: 1;
`;

const ButtonSave = styled(MyButton)`
  width: 60px;
  background: blue;
	color: white;
  margin-left: ${window.innerWidth / 2 + ANNOTATION_SIZE / 2 - 65}px;
`;

const ButtonDiscard = styled(MyButton)`
  width: 100px;
	background: grey;
	font-weight: bold;
  margin-left: ${window.innerWidth / 2 + ANNOTATION_SIZE / 2 - 170}px;
`;

const Annotation = ({savedNote, annotationKey, onSave, onDiscard }) => {
  const [note, setNote] = useState(savedNote);
  return (
    <div>
			<Container
				value={note}
				onChange={(ev) => setNote(ev.target.value)}
				onClick={(ev) => {
					ev.stopPropagation();
				}}
			>
			</Container>
			<ButtonSave
				onClick={(e) => {
					e.stopPropagation();
					return onSave(note, annotationKey)
				}}
			>Save</ButtonSave>
			<ButtonDiscard
				onClick={(e) => {
					e.stopPropagation();
					return onDiscard(annotationKey)
				}}
			>Discard</ButtonDiscard>
		</div>
  );
}

export default Annotation;
