import { X_THRESHOLD, X_OFFSET, Y_THRESHOLD, Y_KEY_COORDS } from '../constants/canvasConstants.js';
import { Flow as VF } from 'vexflow';
import store from '../store/store';

export const calculateNearestPitchToY = (y) => {
    let pitches = Object.keys(Y_KEY_COORDS);
    let pitch = pitches.find(coord => {
        return coord <= y + Y_THRESHOLD && coord >= y - Y_THRESHOLD
    });
    return Y_KEY_COORDS[pitch];
}

export const calculateNoteIndex = (x, notePositions) => {
    return notePositions.findIndex(coord => (coord >= x - X_THRESHOLD - X_OFFSET)
            && (coord <= x + X_THRESHOLD - X_OFFSET));
}

export const calculateNotePositions = (notes) => notes.map(note => note.note_heads[0].x);

export const compareMusicalNotes = (noteA, noteB) => {

    let [keyA, _a, octaveA] = noteA 
    let [keyB, _b, octaveB] = noteB
    
    if (octaveA < octaveB) return -1;
    if (octaveA > octaveB) return 1;
    
    if (keyA === "b" ) return 1;
    else if (keyB === "b" ) return -1;
    
    if (keyA === "a") return 1;
    else if (keyB === "a") return -1;   

    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    
    else return 0;  
}

export const createNote = (keys, duration) => {
    return new VF.StaveNote({
        clef: 'treble',
        keys: keys,
        duration: duration,
        auto_stem: true
    })
}