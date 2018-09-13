import React from 'react';

const Tool = (props) => {
    return <button onClick={props.onClick}>{props.label}</button>
}

export default Tool;