import React from 'react'
import {Link} from 'react-router-dom'
import doremiLogo from '../doremi-logo.svg'

const Topic = ({title, to}) => (
    <div><Link to={to}>
        <span>{title}</span><br/>
        <img src={doremiLogo} alt="logo-should-be-here" />
        <p>
        Description of this lesson goes here</p>
        </Link>
    </div>
)

const Topics = ({topicArray, className}) => (
    <div className={className}>
    {topicArray.map(topic => (
        <Topic key={topic.id} title={topic.title} to={`/topics/${topic.id}/`} />
    ))} 
    </div>
)

export default Topics;