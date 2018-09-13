import { connect } from 'react-redux';
import MusicPad from '../components/MusicPad.js';
import addNote from '../actions/addNote.js';
import removeNote from '../actions/removeNote.js';
import toggleTool from '../actions/toggleTool.js';

const mapStateToProps = state => {
    return {
        keys: state.keys,
        activeTool: state.activeTool
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addNote: coords => dispatch(addNote(coords))
        ,
        removeNote: (index, y) => dispatch(removeNote(index, y))
        ,
        toggleTool: (tool) => dispatch(toggleTool(tool))
    }
}

const MusicPadContainer = connect(mapStateToProps, mapDispatchToProps)(MusicPad);

export default MusicPadContainer;