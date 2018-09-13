import { UPDATE_NOTE } from "../constants/constants.js";

const updateNote = (index, yValue) => {
    return {
        type: UPDATE_NOTE,
        index: index,
        y: yValue
    }
}

export default updateNote;