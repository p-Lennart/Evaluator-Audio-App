// Hash map - score name -> score' MIDI file
const scoreToMidi: Record<string, number> = {
  "air_on_the_g_string.musicxml": require("../../assets/midi/air_on_the_g_string.mid"),
  "schumann_melody.musicxml": require("../../assets/midi/schumann_melodyVLCduet.mid"),
  "sonata.musicxml": require("../../assets/midi/sonata.mid"),
  "hark.musicxml": require("../../assets/midi/hark.mid"),
};

export default scoreToMidi;
