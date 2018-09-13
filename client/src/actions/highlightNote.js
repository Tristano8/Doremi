import { HIGHLIGHT_NOTE } from "../constants/constants"

const highlightNote = (index, pitch) => {
    return {
        type: HIGHLIGHT_NOTE,
        index,
        pitch
    }
}
export default highlightNote;