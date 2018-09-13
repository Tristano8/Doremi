import React from 'react';
import { Flow as VF } from 'vexflow';
import SVGInteraction from './SVGinteraction';
import Tool from './Tool';
import { CROTCHET, MINIM, SEMIBREVE } from '../constants/toolConstants';

class MusicPad extends React.Component {
    componentDidMount() {
        this.drawMusic();
    }

    componentDidUpdate() {
        this.drawMusic()
    }

    /* Redraw content on convas */

    drawMusic = () => {
        // Clear the canvas (this is necessary for representing state changes)
        var container = this.node;

        while (container.lastChild) {
            container.removeChild(container.lastChild);
        }

        // Set up and draw basic stave elements
        var renderer = new VF.Renderer(container, VF.Renderer.Backends.SVG);

        var context = renderer.getContext();
        context.resize(this.props.width, this.props.height);
        context.setViewBox(0, 0, this.props.width, this.props.height)

        // This allows the svg to resize itself dynamically
        const svg = context.svg;
        svg.removeAttribute('width');
        svg.removeAttribute('height');

        // Possibly abstract this into its own function
        var stave = new VF.Stave(0, 0, this.props.width - 1);
        stave.addClef(this.props.clef)
        if (this.props.timeSig) stave.addTimeSignature(this.props.timeSig);

        var keySig = new VF.KeySignature(this.props.keySignature);
        keySig.addToStave(stave);

        stave.setContext(context).draw();
        
        // Render voice
        VF.Formatter.FormatAndDraw(context, stave, this.props.keys);

        // Add SVG event listeners here
        const interaction = new SVGInteraction(svg);
        interaction.addEventListener('touchStart', (e, coords) => {
            console.log(coords);
            this.props.addNote(coords)
        });

        // Add note event listeners
        this.addNoteListeners(this.props.keys, interaction);

    }

    addNoteListeners = (notes, interaction) => {
        notes.forEach((note, index) => {
            const noteInteraction = new SVGInteraction(note.attrs.el, interaction.svgPt);

            // Click to remove note
            let deleteCoord;
            noteInteraction.addEventListener('touchStart', (e, {y}) => {
                e.stopPropagation();
                deleteCoord = y;
            })
            noteInteraction.addEventListener('touchEnd', (e, coords) => {
                if (e.path[1].className.baseVal === "vf-notehead" && coords.y === deleteCoord) {
                    this.props.removeNote(index, coords.y);
                } else {
                    e.preventDefault();
                    this.props.addNote(coords);
                }
            })

            noteInteraction.addEventListener('drag', (e, coords) => {
                let y = e.pageY - e.clientY
                let x = e.pageX - e.clientX
               
            })



            // Highlights note when moused over
            noteInteraction.addEventListener('hover', e => e.path[0].style.fill = 'blue');
            noteInteraction.addEventListener('mouseOut', e => e.path[0].style.fill = 'black');

            // Apply accidental to note <-- can be a more general case of applying props.activeTool
        })
        
    }

    render() {
        return (
            <div>
            <div ref={(n) => this.node = n}></div>
            <Tool label='SEMIBREVE' onClick={() => this.props.toggleTool(SEMIBREVE)}/>
            <Tool label='MINIM' onClick={() => this.props.toggleTool(MINIM)}/>
            <Tool label="CROTCHET" onClick={() => this.props.toggleTool(CROTCHET)}/>
            </div>
        );
    }
}

MusicPad.defaultProps = {
    width: 400,
    height: 140,
    clef: "treble",
    keySignature: "C",
};

export default MusicPad;