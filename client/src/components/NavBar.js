import React from 'react';

const NavBar = (props) => (
    <nav className={props.className}>
        {props.buttons.map((button, id) => {
           return (<button key={id}>{button}</button>)
        })}
    </nav>
)

export default NavBar