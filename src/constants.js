export const ANNOTATION_SIZE = 300;
export const MARKER_SIZE = 20;
export const MARKER_BORDER = 1;
export const TOOPTIP_WIDTH = 100;
export const TOOPTIP_HEIGHT = 50;
export const MARKER_TOOLTIP_MARGIN = 20;

// function to avoid markers out of the container
export const fitScreenSize = (coordinate, dimension) => {
  if (coordinate < MARKER_SIZE / 2)
    return MARKER_SIZE / 2;
  if (coordinate >= dimension - (MARKER_SIZE / 2 + 2 * MARKER_BORDER))
    return  dimension - (MARKER_SIZE / 2 + 2 * MARKER_BORDER);
  return coordinate;
}