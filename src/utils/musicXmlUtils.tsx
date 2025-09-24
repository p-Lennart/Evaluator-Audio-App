import { fragment } from "xmlbuilder2";
import { XMLBuilder } from "xmlbuilder2/lib/interfaces";
export type NoteColor = {
  index: number;
  color: string;
};

export function colorNotesInMusicXML(
  musicXML: string,
  noteIndicesToColor: NoteColor[]
): string {
  // Extract XML declaration and DOCTYPE
  const xmlDeclMatch = musicXML.match(/<\?xml.*?\?>/);
  const doctypeMatch = musicXML.match(/<!DOCTYPE.*?>/);

  const xmlDecl = xmlDeclMatch ? xmlDeclMatch[0] : '<?xml version="1.0" encoding="UTF-8"?>';
  const doctype = doctypeMatch
    ? doctypeMatch[0]
    : '<!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 4.0 Partwise//EN" "http://www.musicxml.org/dtds/partwise.dtd">';

  const innerXml = colorNotesInnerXML(musicXML, noteIndicesToColor);

  // Prepend XML declaration + DOCTYPE
  return `${xmlDecl}\n${doctype}\n${innerXml}`;
}

function colorNotesInnerXML(
  musicXML: string,
  noteIndicesToColor: NoteColor[]
) {
  // Parse XML into a mutable fragment
  const doc: XMLBuilder = fragment(musicXML);

  const allNotes: XMLBuilder[] = [];

  function collectNotes(node: XMLBuilder) {
    if (node.node.nodeName === "note") allNotes.push(node);
    node.each((child: XMLBuilder) => {
      if (child.node.nodeType === 1) collectNotes(child);
    });
  }

  collectNotes(doc);

  noteIndicesToColor.forEach(({ index, color }) => {
    console.log("Foreach: ", {index, color});
    const note = allNotes[index];
    console.log("Found note", note);
    // Currently using <note color="..." ...> because OSMD wasn't picking up on notehead color
    if (note) note.att("color", color);
  });

  // Serialize inner XML
  const innerXml = doc.end({ prettyPrint: false });
  return innerXml;
}