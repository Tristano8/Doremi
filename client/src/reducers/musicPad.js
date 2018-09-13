import { ADD_NEW_NOTE, ADD_CHORD_NOTE, REMOVE_NOTE, REMOVE_CHORD_NOTE, TOGGLE_TOOL } from '../constants/constants';
import { createNote, compareMusicalNotes } from '../components/canvasUtilities'

const musicPad = (state = {keys: [], activeTool: '4'}, action) => {
    switch (action.type) {
        case ADD_NEW_NOTE:
                let newNote = createNote([action.pitch], state.activeTool)
                
                return (action.index === -1) ?
                {...state, keys: [...state.keys, newNote]} :
                {...state, keys: [...state.keys.slice(0, action.index), newNote,...state.keys.slice(action.index)]};
          
        case ADD_CHORD_NOTE:
                let newPitches = state.keys[action.index]['keys'].slice().filter(x => x !== action.pitch);
                newPitches.push(action.pitch);
                newPitches.sort(compareMusicalNotes);
                let updatedChord = createNote(newPitches, state.activeTool);
                
                return {...state, keys: [...state.keys.slice(0, action.index),updatedChord,...state.keys.slice(action.index + 1)]};
        
        case TOGGLE_TOOL:
          return {...state, activeTool: action.tool }

        case REMOVE_NOTE:
          return {
            ...state, keys: [...state.keys.slice(0,action.index),...state.keys.slice(action.index + 1)]};

        case REMOVE_CHORD_NOTE:
            let targetChord = state.keys[action.index];
            let targetPitch = action.pitch;
            let newChord = createNote(targetChord.keys.filter(pitch => pitch !== targetPitch), state.activeTool)
              return {
                  ...state, keys: [...state.keys.slice(0,action.index), newChord, ...state.keys.slice(action.index + 1)]};
        default:
         return state; 
    }
}

export default musicPad;