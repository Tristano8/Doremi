import MusicPad from './MusicPadV1';
import React from 'react';

const DummyComponent = props => {
    return <MusicPad keys={props.keys} actions={props.dispatch}/>
}

export default DummyComponent;