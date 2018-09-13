import DRAW_STAVE from '../constants/constants.js';

const drawStave = (container) => {
    return {
        type: DRAW_STAVE,
        container: container
    }
}

export default drawStave;