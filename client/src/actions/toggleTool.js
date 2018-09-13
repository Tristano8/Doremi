//import store from '../store/store';
import { TOGGLE_TOOL } from '../constants/constants';

const toggleTool = (tool) => {
    return {
        type: TOGGLE_TOOL,
        tool
    }
}

export default toggleTool;