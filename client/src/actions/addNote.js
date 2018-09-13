import { ADD_NEW_NOTE, ADD_CHORD_NOTE } from "../constants/constants"
import { calculateNoteIndex, calculateNearestPitchToY, calculateNotePositions } from "../components/canvasUtilities"
import store from "../store/store";


const addNote = coords => {
    let { x, y } = coords;

    x = Math.floor(x);
    y = Math.floor(y);
    
    let pitch = calculateNearestPitchToY(y);
    let notePositions = calculateNotePositions(store.getState().keys);
    let noteIndex = calculateNoteIndex(x, notePositions);

    // Out of bounds
    if (noteIndex === undefined || pitch === undefined) return { type: "NO_ACTION" }; 

    if (noteIndex !== -1) {
        return { 
            type: ADD_CHORD_NOTE,
            index: noteIndex,
            pitch }
    }
    else {
        let newNoteIndex = notePositions.findIndex(value => value > x);
        return {
            type: ADD_NEW_NOTE,
            index: newNoteIndex,
            pitch
            }
        }
}

export default addNote;