import { REMOVE_NOTE, REMOVE_CHORD_NOTE } from "../constants/constants.js";
import { calculateNearestPitchToY } from "../components/canvasUtilities";
import store from "../store/store";

const removeNote = (index, yValue) => {
    let pitch = calculateNearestPitchToY(yValue);
    let targetStaveNote = store.getState().keys[index];
    if (targetStaveNote.keys.length > 1) {
        return {
            type: REMOVE_CHORD_NOTE,
            index,
            pitch
        }
    }
    else return {
        type: REMOVE_NOTE,
        index,
        pitch
    }
}

export default removeNote;