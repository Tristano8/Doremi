import React from 'react';
import { Flow as VF } from 'vexflow';
import SVGInteraction from './SVGinteraction';

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
        //svg.removeAttribute('width');
        //svg.removeAttribute('height');

        // Possibly abstract this into its own function
        var stave = new VF.Stave(0, 0, this.props.width - 1);
        stave.addClef(this.props.clef)
        if (this.props.timeSig) stave.addTimeSignature(this.props.timeSig);

        var keySig = new VF.KeySignature(this.props.keySignature);
        keySig.addToStave(stave);

        stave.setContext(context).draw();

        // Render voice
        VF.Formatter.FormatAndDraw(context, stave, this.props.keys);

        // This adds event listeners to the svg
        const interaction = new SVGInteraction(svg);

        // Add event listeners here
        interaction.addEventListener('click', (_, coords) => {
            this.props.addNote(coords)
        });

        // Add event listeners
        this.addNoteListeners(this.props.keys, interaction);

    }


    addNoteListeners = (notes, interaction) => {
        notes.forEach((note, index) => {
            const noteInteraction = new SVGInteraction(note.attrs.el, interaction.svgPt);
            noteInteraction.addEventListener('click', (e) => {
                e.stopPropagation();
                this.props.removeNote(index);
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
            noteInteraction.addEventListener('drag', (_, coords) => {
                this.props.updateNote(note, index, coords);
            })
        })
    }

    render() {
        return (
            <div ref={(n) => this.node = n}></div>
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