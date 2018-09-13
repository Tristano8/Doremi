import React from 'react';
import Vex from 'vexflow';
import SVGInteraction from './SVGinteraction';

class MusicExercise extends React.Component {
    constructor(props) {
        super(props);
        this.notes = this.createNotes(props.initialNotes)
        this.state = {
            title: 'Test exercise',
            questionText: 'Write a C major scale ascending, one octave, in minims',
            keys: this.createNotes(this.initialNotes),
            correctAnswer: ['c/4','d/4','e/4','f/4','g/4','a/4','b/4','c/5'],
            activeTools: ['minim', 'crotchet', 'semibreve', 'erase'],
            userScore: {correct: 0, incorrect: 0},
        }

        this.X_THRESHOLD = 3;
        this.X_OFFSET = 5;
        this.Y_THRESHOLD = 2.5;

        this.Y_KEY_COORDS = {
            100: "a/3",
            95: "b/3",
            90: "c/4",
            85: "d/4",
            80: "e/4",
            75: "f/4",
            70: "g/4",
            65: "a/4",
            60: "b/4",
            55: "c/5",
            50: "d/5",
            45: "e/5",
            40: "f/5",
            35: "g/5",
            30: "a/5",
            25: "b/5",
            20: "c/6",
        }
    }
    componentDidMount() {
        this.drawMusic();
    }

    componentDidUpdate(prevProps, prevState) {
        this.drawMusic();
    }

    /* Redraw content on convas */

    drawMusic = () => {
        // Clear the canvas (this is necessary for representing state changes)
        var container = this.node;

        while (container.lastChild) {
            container.removeChild(container.lastChild);
        }

        // Set up and draw basic stave elements
        var renderer = new Vex.Flow.Renderer(container, Vex.Flow.Renderer.Backends.SVG);

        var context = renderer.getContext();
        context.resize(this.props.width, this.props.height);
        context.setViewBox(0, 0, this.props.width, this.props.height)

        // This allows the svg to resize itself dynamically
        const svg = context.svg;
        svg.removeAttribute('width');
        svg.removeAttribute('height');

        // Possibly abstract this into its own function
        var stave = new Vex.Flow.Stave(0, 0, this.props.width - 1);
        stave.addClef(this.props.clef)
        if (this.props.timeSig) stave.addTimeSignature(this.props.timeSig);

        var keySig = new Vex.Flow.KeySignature(this.props.keySignature);
        keySig.addToStave(stave);

        stave.setContext(context).draw();

        var notes = this.state.keys;

        // Render voice
        Vex.Flow.Formatter.FormatAndDraw(context, stave, notes);

        // This adds event listeners to the svg
        const interaction = new SVGInteraction(svg);

        // Add event listeners here
        interaction.addEventListener('click', (e, coords) => {
            this.addNote(notes, coords)
        });

        // Add event listeners
        this.addNoteListeners(notes, interaction);

    }

    createNotes = (keys) => {
        let notes = keys.map((pitch, octave, duration) => {
            console.log(`${pitch}/${octave}`);
            const note = new Vex.Flow.StaveNote({
                clef: this.props.clef,
                keys: [`${pitch}/${octave}`],
                duration: '2',
                auto_stem: true
            });
            return note;
        })
        return notes;
    }

    addNoteListeners = (notes, interaction) => {
        notes.forEach((note, index) => {
            const noteInteraction = new SVGInteraction(note.attrs.el, interaction.svgPt);
            noteInteraction.addEventListener('click', (e, coords) => {
                e.stopPropagation();
                this.removeNote(index, coords);
            })
            
            let noteHeads = document.getElementsByClassName("vf-note");

            noteInteraction.addEventListener('hover', () => {
                noteHeads[index].childNodes.forEach(node => {
                    node.firstElementChild.setAttribute("fill", "blue")
                });
            })
            noteInteraction.addEventListener('mouseOut', () => {
                noteHeads[index].childNodes.forEach(node => {
                    node.firstElementChild.setAttribute("fill", "black");
            })
        })
            noteInteraction.addEventListener('drag', (e, coords) => {
                this.updateNote(note, index, coords);
            })
        })
    }

    removeNote = (index) => {
        let notes = this.state.keys.slice();
        // Add check for chord note
        notes.splice(index, 1);

        this.setState({ keys: notes })
    }

    updateNote = () => {
        // TO DO - move note in SVG and recalculate on mouseup

    }

    addNote = (notes, coords) => {
        let { x, y } = coords;

        x = Math.floor(x);
        y = Math.floor(y);


        // This should be its own helper function
        let pitches = Object.keys(this.Y_KEY_COORDS);
        let pitch = pitches.find(coord => {
            return coord <= y + this.Y_THRESHOLD && coord >= y - this.Y_THRESHOLD
        });

        if (pitch === undefined) return;

        let xNotePositions = [];

        notes.forEach(note => {
            xNotePositions.push(note.note_heads[0].x);
        });


        // This checks if the mouse event happens over an existing note 


        let newNote;

        let noteIndex = xNotePositions.findIndex(coord => (coord >= x - this.X_THRESHOLD - this.X_OFFSET)
            && (coord <= x + this.X_THRESHOLD - this.X_OFFSET));
        let chordNote = noteIndex !== -1;

        if (chordNote) {
            let newPitches = notes[noteIndex]['keys'].slice();
            newPitches.push(this.Y_KEY_COORDS[pitch]);

            newNote = new Vex.Flow.StaveNote({
                clef: this.props.clef,
                keys: newPitches,
                duration: "4",
                auto_stem: true
            });

            let newKeys = this.state.keys.slice();
            newKeys.splice(noteIndex, 1, newNote);

            this.setState({ keys: newKeys });
        } else {
            let newNoteIndex = xNotePositions.findIndex(value => value > x);

            newNote = new Vex.Flow.StaveNote({
                clef: this.props.clef,
                keys: [this.Y_KEY_COORDS[pitch]],
                duration: "4",
                auto_stem: true
            });

            let newKeys = this.state.keys.slice();

            if (newNoteIndex === -1) {
                newKeys.push(newNote)
            } else {
                newKeys.splice(newNoteIndex, 0, newNote);
            }

            this.setState({ keys: newKeys });
        }

    }

    render() {
        return (
            <div className='exercise-container'>
                <div className='toolbar'>
                    <button>Tool #1</button><br/>
                    <button>Tool #2</button><br/>
                    <button>Tool #3</button><br/>
                </div>
                <div><div className='exercise-header'>{this.state.questionText}</div>
                <div ref={(n) => this.node = n}></div>
                    <button onClick={() => { this.checkAnswer()}} className='exercise-submit-btn'>Submit</button>
                    </div>
                    

                    </div>
        )
    }
}

MusicExercise.defaultProps = {
    width: 400,
    height: 140,
    clef: "treble",
    keys: [],
    keySignature: "C",
};

export default MusicExercise;