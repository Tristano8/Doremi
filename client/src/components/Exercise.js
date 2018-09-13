import React from 'react';
import MusicPad from './MusicPad.js';
import './Exercise.css'

class Exercise extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Test exercise',
            questionsId: 1, 
            questionText: 'Write a C major scale ascending, one octave, in minims',
            initalNotes: [],
            correctAnswer: ['c/4','d/4','e/4','f/4','g/4','a/4','b/4','c/5'],
            activeTools: ['minim', 'crotchet', 'semibreve', 'erase'],
            userScore: {correct: 0, incorrect: 0},
            totalQuestions: 10
        }
    }

    componentWillMount() {
        this.setState({initialNotes: ['c/4/2']});
    }
    
    checkAnswer() {
        //
    }
    
    render() {
        console.log(this.state.initialNotes)
        return (
            <div className='exercise-container'>
                <div className='toolbar'>
                    <button>Tool #1</button><br/>
                    <button>Tool #2</button><br/>
                    <button>Tool #3</button><br/>
                </div>
                <div><div className='exercise-header'>{this.state.questionText}</div>
                    <MusicPad initialNotes={this.state.initialNotes}/>
                    <button onClick={() => { this.checkAnswer()}} className='exercise-submit-btn'>Submit</button>
                    <div>Score: {this.state.userScore.correct}/{this.state.totalQuestions}</div>
                    </div>
                    

                    </div>
        )
    }
}

export default Exercise;