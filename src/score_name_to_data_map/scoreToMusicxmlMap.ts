// External file used in ScoreDisplay.tsx to display the mapped score's content visually
// key (string) = score's name
// value (string) = score's XML file
const scoresData: Record<string, string> = {
  "schumann_melody.musicxml": `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 4.0 Partwise//EN" "http://www.musicxml.org/dtds/partwise.dtd">
<score-partwise version="4.0">
<work>
  <work-title>Robert Schumann – Melody</work-title>
</work>
  <identification>
    <encoding>
      <software>MuseScore 4.5.2</software>
      <encoding-date>2025-06-20</encoding-date>
      <supports element="accidental" type="yes"/>
      <supports element="beam" type="yes"/>
      <supports element="print" attribute="new-page" type="yes" value="yes"/>
      <supports element="print" attribute="new-system" type="yes" value="yes"/>
      <supports element="stem" type="yes"/>
      </encoding>
    </identification>
  <defaults>
    <scaling>
      <millimeters>6.99911</millimeters>
      <tenths>40</tenths>
      </scaling>
    <page-layout>
      <page-height>1596.77</page-height>
      <page-width>1233.87</page-width>
      <page-margins type="even">
        <left-margin>85.7252</left-margin>
        <right-margin>85.7252</right-margin>
        <top-margin>85.7252</top-margin>
        <bottom-margin>85.7252</bottom-margin>
        </page-margins>
      <page-margins type="odd">
        <left-margin>85.7252</left-margin>
        <right-margin>85.7252</right-margin>
        <top-margin>85.7252</top-margin>
        <bottom-margin>85.7252</bottom-margin>
        </page-margins>
      </page-layout>
    <appearance>
      <line-width type="light barline">1.8</line-width>
      <line-width type="heavy barline">5.5</line-width>
      <line-width type="beam">5</line-width>
      <line-width type="bracket">4.5</line-width>
      <line-width type="dashes">1</line-width>
      <line-width type="enclosure">1</line-width>
      <line-width type="ending">1.1</line-width>
      <line-width type="extend">1</line-width>
      <line-width type="leger">1.6</line-width>
      <line-width type="pedal">1.1</line-width>
      <line-width type="octave shift">1.1</line-width>
      <line-width type="slur middle">2.1</line-width>
      <line-width type="slur tip">0.5</line-width>
      <line-width type="staff">1.1</line-width>
      <line-width type="stem">1</line-width>
      <line-width type="tie middle">2.1</line-width>
      <line-width type="tie tip">0.5</line-width>
      <line-width type="tuplet bracket">1</line-width>
      <line-width type="wedge">1.2</line-width>
      <note-size type="cue">70</note-size>
      <note-size type="grace">70</note-size>
      <note-size type="grace-cue">49</note-size>
      </appearance>
    <music-font font-family="Leland"/>
    <word-font font-family="Edwin" font-size="10"/>
    <lyric-font font-family="Edwin" font-size="10"/>
    </defaults>
  <credit page="1">
    <credit-words default-x="85.725171" default-y="1511.049022" justify="left" valign="top" font-size="14">Violoncello, Violoncello</credit-words>
    </credit>
  <part-list>
    <score-part id="P1">
      <part-name>Violoncello, Violoncello</part-name>
      <part-abbreviation>Vc.</part-abbreviation>
      <score-instrument id="P1-I1">
        <instrument-name>Violoncello</instrument-name>
        <instrument-sound>strings.cello</instrument-sound>
        </score-instrument>
      <midi-device id="P1-I1" port="1"></midi-device>
      <midi-instrument id="P1-I1">
        <midi-channel>1</midi-channel>
        <midi-program>43</midi-program>
        <volume>70.8661</volume>
        <pan>0</pan>
        </midi-instrument>
      </score-part>
    </part-list>
  <part id="P1">
    <measure number="1" width="212.92">
      <print>
        <system-layout>
          <system-margins>
            <left-margin>50</left-margin>
            <right-margin>0</right-margin>
            </system-margins>
          <top-system-distance>170</top-system-distance>
          </system-layout>
        </print>
      <attributes>
        <divisions>2</divisions>
        <key>
          <fifths>1</fifths>
          </key>
        <time>
          <beats>4</beats>
          <beat-type>4</beat-type>
          </time>
        <clef>
          <sign>F</sign>
          <line>4</line>
          </clef>
        </attributes>
      <direction placement="above" system="also-top">
        <direction-type>
          <metronome parentheses="no" default-x="-37.68" default-y="13.09" relative-y="20">
            <beat-unit>quarter</beat-unit>
            <per-minute>100</per-minute>
            </metronome>
          </direction-type>
        <sound tempo="100"/>
        </direction>
      <note default-x="98.43" default-y="5" dynamics="50">
        <pitch>
          <step>B</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        <notations>
          <slur type="start" number="1"/>
          </notations>
        <lyric number="1" default-x="6.5" default-y="-40" relative-y="-30">
          <syllabic>single</syllabic>
          <text>Schumann</text>
          </lyric>
        <lyric number="1" default-x="6.5" default-y="-40" relative-y="-30">
          <syllabic>single</syllabic>
          <text>Schumann</text>
          </lyric>
        </note>
      <note default-x="126.6" default-y="0" dynamics="48.89">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="154.78" default-y="-5" dynamics="52.22">
        <pitch>
          <step>G</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="182.95" default-y="-10" dynamics="51.11">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="2" width="145.77">
      <note default-x="12.5" default-y="-15" dynamics="53.33">
        <pitch>
          <step>E</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">begin</beam>
        </note>
      <note default-x="31.28" default-y="-5" dynamics="54.44">
        <pitch>
          <step>G</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">continue</beam>
        </note>
      <note default-x="50.06" default-y="-10" dynamics="53.33">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">continue</beam>
        </note>
      <note default-x="68.84" default-y="0" dynamics="52.22">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">end</beam>
        </note>
      <note default-x="87.63" default-y="-5" dynamics="50">
        <pitch>
          <step>G</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="115.8" default-y="-20" dynamics="47.78">
        <pitch>
          <step>D</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        <notations>
          <slur type="stop" number="1"/>
          </notations>
        </note>
      </measure>
    <measure number="3" width="126.99">
      <note default-x="12.5" default-y="15" dynamics="62.22">
        <pitch>
          <step>D</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        <notations>
          <slur type="start" number="1"/>
          </notations>
        </note>
      <note default-x="40.67" default-y="10" dynamics="65.56">
        <pitch>
          <step>C</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="68.84" default-y="5" dynamics="54.44">
        <pitch>
          <step>B</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="97.02" default-y="-5" dynamics="53.33">
        <pitch>
          <step>G</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        <notations>
          <slur type="stop" number="1"/>
          </notations>
        </note>
      </measure>
    <measure number="4" width="126.99">
      <note default-x="12.5" default-y="-10" dynamics="47.78">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        <notations>
          <slur type="start" number="1"/>
          </notations>
        </note>
      <note default-x="40.67" default-y="-15" dynamics="46.67">
        <pitch>
          <step>E</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="68.84" default-y="-20" dynamics="53.33">
        <pitch>
          <step>D</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        <notations>
          <slur type="stop" number="1"/>
          </notations>
        </note>
      <note default-x="97.02" default-y="-20">
        <rest/>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        </note>
      </measure>
    <measure number="5" width="126.99">
      <note default-x="12.5" default-y="5" dynamics="46.67">
        <pitch>
          <step>B</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        <notations>
          <slur type="start" number="1"/>
          </notations>
        </note>
      <note default-x="40.67" default-y="0" dynamics="41.11">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="68.84" default-y="-5" dynamics="48.89">
        <pitch>
          <step>G</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="97.02" default-y="-10" dynamics="52.22">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="6" width="145.77">
      <note default-x="12.5" default-y="-15" dynamics="52.22">
        <pitch>
          <step>E</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">begin</beam>
        </note>
      <note default-x="31.28" default-y="-5" dynamics="48.89">
        <pitch>
          <step>G</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">continue</beam>
        </note>
      <note default-x="50.06" default-y="-10" dynamics="53.33">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">continue</beam>
        </note>
      <note default-x="68.84" default-y="0" dynamics="58.89">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">end</beam>
        </note>
      <note default-x="87.63" default-y="-5" dynamics="51.11">
        <pitch>
          <step>G</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="115.8" default-y="-20" dynamics="46.67">
        <pitch>
          <step>D</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        <notations>
          <slur type="stop" number="1"/>
          </notations>
        </note>
      </measure>
    <measure number="7" width="126.99">
      <note default-x="12.5" default-y="15" dynamics="68.89">
        <pitch>
          <step>D</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        <notations>
          <slur type="start" number="1"/>
          </notations>
        </note>
      <note default-x="40.67" default-y="10" dynamics="65.56">
        <pitch>
          <step>C</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="68.84" default-y="5" dynamics="62.22">
        <pitch>
          <step>B</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="97.02" default-y="-5" dynamics="56.67">
        <pitch>
          <step>G</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="8" width="199.6">
      <print new-system="yes">
        <system-layout>
          <system-margins>
            <left-margin>0</left-margin>
            <right-margin>0</right-margin>
            </system-margins>
          <system-distance>185</system-distance>
          </system-layout>
        </print>
      <note default-x="76.31" default-y="-10" dynamics="50">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="106.68" default-y="-15" dynamics="45.56">
        <pitch>
          <step>E</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="137.06" default-y="-20" dynamics="52.22">
        <pitch>
          <step>D</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        <notations>
          <slur type="stop" number="1"/>
          </notations>
        </note>
      <note default-x="167.43" default-y="-20">
        <rest/>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        </note>
      </measure>
    <measure number="9" width="135.79">
      <direction placement="below">
        <direction-type>
          <dynamics default-x="5.32" default-y="-42.47" relative-y="-20">
            <mf/>
            </dynamics>
          </direction-type>
        <sound dynamics="88.89"/>
        </direction>
      <note default-x="12.5" default-y="0" dynamics="97.78">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        <notations>
          <slur type="start" number="1"/>
          <articulations>
            <accent default-x="6.5" default-y="13.3"/>
            </articulations>
          </notations>
        </note>
      <note default-x="42.87" default-y="-5" dynamics="96.67">
        <pitch>
          <step>G</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="73.24" default-y="-10" dynamics="87.78">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        <notations>
          <slur type="stop" number="1"/>
          </notations>
        </note>
      <note default-x="103.62" default-y="-20">
        <rest/>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        </note>
      </measure>
    <measure number="10" width="135.79">
      <note default-x="12.5" default-y="10" dynamics="100">
        <pitch>
          <step>C</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        <notations>
          <slur type="start" number="1"/>
          <articulations>
            <accent default-x="6.5" default-y="23.3"/>
            </articulations>
          </notations>
        </note>
      <note default-x="42.87" default-y="5" dynamics="94.44">
        <pitch>
          <step>B</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="73.24" default-y="0" dynamics="82.22">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        <notations>
          <slur type="stop" number="1"/>
          </notations>
        </note>
      <note default-x="103.62" default-y="-20">
        <rest/>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        </note>
      </measure>
    <measure number="11" width="135.79">
      <note default-x="12.5" default-y="20" dynamics="93.33">
        <pitch>
          <step>E</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        <notations>
          <slur type="start" number="1"/>
          <articulations>
            <accent default-x="6.5" default-y="33.3"/>
            </articulations>
          </notations>
        </note>
      <note default-x="42.87" default-y="15" dynamics="81.11">
        <pitch>
          <step>D</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="73.24" default-y="10" dynamics="85.56">
        <pitch>
          <step>C</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="103.62" default-y="5" dynamics="81.11">
        <pitch>
          <step>B</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="12" width="163.63">
      <note default-x="12.5" default-y="0" dynamics="84.44">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">begin</beam>
        </note>
      <note default-x="32.75" default-y="10" dynamics="91.11">
        <pitch>
          <step>C</step>
          <octave>4</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">continue</beam>
        </note>
      <note default-x="53" default-y="5" dynamics="84.44">
        <pitch>
          <step>B</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">continue</beam>
        </note>
      <note default-x="73.24" default-y="15" dynamics="92.22">
        <pitch>
          <step>D</step>
          <octave>4</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">end</beam>
        </note>
      <note default-x="95.34" default-y="10" dynamics="84.44">
        <pitch>
          <step>C</step>
          <octave>4</octave>
          </pitch>
        <duration>3</duration>
        <voice>1</voice>
        <type>quarter</type>
        <dot default-x="113.33" default-y="15"/>
        <stem>down</stem>
        </note>
      <direction placement="below">
        <direction-type>
          <dashes type="stop" number="1"/>
          </direction-type>
        </direction>
      <backup>
        <duration>1</duration>
        </backup>
      <direction placement="below">
        <direction-type>
          <words font-family="Edwin" font-size="10" font-style="italic" default-y="-62.47" relative-x="-8.95">dim.</words>
          </direction-type>
        <direction-type>
          <dashes type="start" number="1" default-y="-62.47" relative-x="-8.95"/>
          </direction-type>
        </direction>
      <forward>
        <duration>1</duration>
        </forward>
      <note default-x="133.84" default-y="0" dynamics="78.89">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <notations>
          <slur type="stop" number="1"/>
          </notations>
        </note>
      </measure>
    <measure number="13" width="135.79">
      <direction placement="below">
        <direction-type>
          <dynamics default-x="3.09" default-y="-40" relative-y="-20">
            <p/>
            </dynamics>
          </direction-type>
        <sound dynamics="54.44"/>
        </direction>
      <note default-x="12.5" default-y="5" dynamics="60">
        <pitch>
          <step>B</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        <notations>
          <slur type="start" number="1"/>
          </notations>
        </note>
      <note default-x="42.87" default-y="0" dynamics="55.56">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="73.24" default-y="-5" dynamics="52.22">
        <pitch>
          <step>G</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="103.62" default-y="-10" dynamics="44.44">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="14" width="156.04">
      <note default-x="12.5" default-y="-15" dynamics="53.33">
        <pitch>
          <step>E</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">begin</beam>
        </note>
      <note default-x="32.75" default-y="-5" dynamics="52.22">
        <pitch>
          <step>G</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">continue</beam>
        </note>
      <note default-x="53" default-y="-10" dynamics="52.22">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">continue</beam>
        </note>
      <note default-x="73.24" default-y="0" dynamics="57.78">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">end</beam>
        </note>
      <note default-x="93.49" default-y="-5" dynamics="47.78">
        <pitch>
          <step>G</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="123.86" default-y="-20" dynamics="47.78">
        <pitch>
          <step>D</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        <notations>
          <slur type="stop" number="1"/>
          </notations>
        </note>
      </measure>
    <measure number="15" width="199.6">
      <print new-system="yes">
        <system-layout>
          <system-margins>
            <left-margin>0</left-margin>
            <right-margin>0</right-margin>
            </system-margins>
          <system-distance>185</system-distance>
          </system-layout>
        </print>
      <note default-x="76.31" default-y="20" dynamics="68.89">
        <pitch>
          <step>E</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        <notations>
          <slur type="start" number="1"/>
          </notations>
        </note>
      <note default-x="106.68" default-y="15" dynamics="66.67">
        <pitch>
          <step>D</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="137.06" default-y="10" dynamics="48.89">
        <pitch>
          <step>C</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="167.43" default-y="5" dynamics="42.22">
        <pitch>
          <step>B</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="16" width="156.04">
      <note default-x="12.5" default-y="-10" dynamics="50">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">begin</beam>
        <notations>
          <slur type="stop" number="1"/>
          <slur type="start" number="1"/>
          </notations>
        </note>
      <note default-x="32.75" default-y="10" dynamics="52.22">
        <pitch>
          <step>C</step>
          <octave>4</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">continue</beam>
        </note>
      <note default-x="53" default-y="-10" dynamics="47.78">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">continue</beam>
        </note>
      <note default-x="73.24" default-y="0" dynamics="53.33">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">end</beam>
        </note>
      <note default-x="93.49" default-y="-5" dynamics="53.33">
        <pitch>
          <step>G</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        <notations>
          <slur type="stop" number="1"/>
          </notations>
        </note>
      <note default-x="123.86" default-y="-20">
        <rest/>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        </note>
      </measure>
    <measure number="17" width="135.79">
      <direction placement="below">
        <direction-type>
          <dynamics default-x="5.32" default-y="-42.47" relative-y="-20">
            <mf/>
            </dynamics>
          </direction-type>
        <sound dynamics="88.89"/>
        </direction>
      <note default-x="12.5" default-y="0" dynamics="93.33">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        <notations>
          <slur type="start" number="1"/>
          <articulations>
            <accent default-x="6.5" default-y="13.34"/>
            </articulations>
          </notations>
        </note>
      <note default-x="42.87" default-y="-5" dynamics="86.67">
        <pitch>
          <step>G</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="73.24" default-y="-10" dynamics="91.11">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        <notations>
          <slur type="stop" number="1"/>
          </notations>
        </note>
      <note default-x="103.62" default-y="-20">
        <rest/>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        </note>
      </measure>
    <measure number="18" width="135.79">
      <note default-x="12.5" default-y="10" dynamics="97.78">
        <pitch>
          <step>C</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        <notations>
          <slur type="start" number="1"/>
          <articulations>
            <accent default-x="6.5" default-y="23.3"/>
            </articulations>
          </notations>
        </note>
      <note default-x="42.87" default-y="5" dynamics="96.67">
        <pitch>
          <step>B</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="73.24" default-y="0" dynamics="84.44">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        <notations>
          <slur type="stop" number="1"/>
          </notations>
        </note>
      <note default-x="103.62" default-y="-20">
        <rest/>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        </note>
      </measure>
    <measure number="19" width="135.79">
      <note default-x="12.5" default-y="20" dynamics="98.89">
        <pitch>
          <step>E</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        <notations>
          <slur type="start" number="1"/>
          <articulations>
            <accent default-x="6.5" default-y="33.3"/>
            </articulations>
          </notations>
        </note>
      <note default-x="42.87" default-y="15" dynamics="96.67">
        <pitch>
          <step>D</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        <notations>
          <slur type="stop" number="1"/>
          </notations>
        </note>
      <note default-x="73.24" default-y="10" dynamics="81.11">
        <pitch>
          <step>C</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="103.62" default-y="5" dynamics="80">
        <pitch>
          <step>B</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="20" width="163.63">
      <note default-x="12.5" default-y="0" dynamics="88.89">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">begin</beam>
        <notations>
          <slur type="start" number="1"/>
          </notations>
        </note>
      <note default-x="32.75" default-y="10" dynamics="102.22">
        <pitch>
          <step>C</step>
          <octave>4</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">continue</beam>
        </note>
      <note default-x="53" default-y="5" dynamics="84.44">
        <pitch>
          <step>B</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">continue</beam>
        </note>
      <note default-x="73.24" default-y="15" dynamics="88.89">
        <pitch>
          <step>D</step>
          <octave>4</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">end</beam>
        </note>
      <direction placement="below">
        <direction-type>
          <words font-family="Edwin" font-size="10" font-style="italic" default-y="-62.47">dim.</words>
          </direction-type>
        <direction-type>
          <dashes type="start" number="1" default-y="-62.47"/>
          </direction-type>
        </direction>
      <note default-x="95.34" default-y="10" dynamics="74.44">
        <pitch>
          <step>C</step>
          <octave>4</octave>
          </pitch>
        <duration>3</duration>
        <voice>1</voice>
        <type>quarter</type>
        <dot default-x="113.33" default-y="15"/>
        <stem>down</stem>
        </note>
      <backup>
        <duration>2</duration>
        </backup>
      <direction placement="below">
        <direction-type>
          <dashes type="stop" number="1"/>
          </direction-type>
        </direction>
      <forward>
        <duration>2</duration>
        </forward>
      <note default-x="133.84" default-y="0" dynamics="74.44">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <notations>
          <slur type="stop" number="1"/>
          </notations>
        </note>
      </measure>
    <measure number="21" width="135.79">
      <direction placement="below">
        <direction-type>
          <dynamics default-x="3.09" default-y="-40" relative-y="-20">
            <p/>
            </dynamics>
          </direction-type>
        <sound dynamics="54.44"/>
        </direction>
      <note default-x="12.5" default-y="5" dynamics="54.44">
        <pitch>
          <step>B</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        <notations>
          <slur type="start" number="1"/>
          </notations>
        </note>
      <note default-x="42.87" default-y="0" dynamics="51.11">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        <notations>
          <slur type="stop" number="1"/>
          </notations>
        </note>
      <note default-x="73.24" default-y="-5" dynamics="53.33">
        <pitch>
          <step>G</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="103.62" default-y="-10" dynamics="45.56">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="22" width="409.39">
      <print new-system="yes">
        <system-layout>
          <system-margins>
            <left-margin>0</left-margin>
            <right-margin>0</right-margin>
            </system-margins>
          <system-distance>185</system-distance>
          </system-layout>
        </print>
      <note default-x="76.31" default-y="-15" dynamics="46.67">
        <pitch>
          <step>E</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">begin</beam>
        <notations>
          <slur type="start" number="1"/>
          </notations>
        </note>
      <note default-x="123.64" default-y="-5" dynamics="47.78">
        <pitch>
          <step>G</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">continue</beam>
        </note>
      <note default-x="170.96" default-y="-10" dynamics="54.44">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">continue</beam>
        </note>
      <note default-x="218.29" default-y="0" dynamics="55.56">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">end</beam>
        </note>
      <note default-x="265.61" default-y="-5" dynamics="53.33">
        <pitch>
          <step>G</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="336.6" default-y="-20" dynamics="47.78">
        <pitch>
          <step>D</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        <notations>
          <slur type="stop" number="1"/>
          </notations>
        </note>
      </measure>
    <measure number="23" width="298.25">
      <note default-x="12.5" default-y="20" dynamics="68.89">
        <pitch>
          <step>E</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        <notations>
          <slur type="start" number="1"/>
          </notations>
        </note>
      <note default-x="83.49" default-y="15" dynamics="68.89">
        <pitch>
          <step>D</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="154.48" default-y="10" dynamics="53.33">
        <pitch>
          <step>C</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="225.46" default-y="5" dynamics="55.56">
        <pitch>
          <step>B</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="24" width="354.78">
      <direction placement="above">
        <direction-type>
          <words default-y="40.54" relative-y="10">poco rit.</words>
          </direction-type>
        </direction>
      <note default-x="12.5" default-y="-10" dynamics="51.11">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">begin</beam>
        </note>
      <note default-x="59.83" default-y="10" dynamics="64.44">
        <pitch>
          <step>C</step>
          <octave>4</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">continue</beam>
        </note>
      <note default-x="107.15" default-y="-10" dynamics="52.22">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">continue</beam>
        </note>
      <note default-x="154.48" default-y="0" dynamics="53.33">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">end</beam>
        </note>
      <note default-x="201.8" default-y="-5" dynamics="51.11">
        <pitch>
          <step>G</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        <notations>
          <slur type="stop" number="1"/>
          </notations>
        </note>
      <note default-x="272.79" default-y="-20">
        <rest/>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        </note>
      <barline location="right">
        <bar-style>light-heavy</bar-style>
        </barline>
      </measure>
    </part>
  </score-partwise>
`,
  "sonata.musicxml": `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 4.0 Partwise//EN" "http://www.musicxml.org/dtds/partwise.dtd">
<score-partwise version="4.0">
<work>
  <work-title>Sonata</work-title>
</work>
  <identification>
    <encoding>
      <software>MuseScore 4.5.2</software>
      <encoding-date>2025-06-17</encoding-date>
      <supports element="accidental" type="yes"/>
      <supports element="beam" type="yes"/>
      <supports element="print" attribute="new-page" type="yes" value="yes"/>
      <supports element="print" attribute="new-system" type="yes" value="yes"/>
      <supports element="stem" type="yes"/>
      </encoding>
    </identification>
  <defaults>
    <scaling>
      <millimeters>6.99911</millimeters>
      <tenths>40</tenths>
      </scaling>
    <page-layout>
      <page-height>1596.77</page-height>
      <page-width>1233.87</page-width>
      <page-margins type="even">
        <left-margin>85.7252</left-margin>
        <right-margin>85.7252</right-margin>
        <top-margin>85.7252</top-margin>
        <bottom-margin>85.7252</bottom-margin>
        </page-margins>
      <page-margins type="odd">
        <left-margin>85.7252</left-margin>
        <right-margin>85.7252</right-margin>
        <top-margin>85.7252</top-margin>
        <bottom-margin>85.7252</bottom-margin>
        </page-margins>
      </page-layout>
    <appearance>
      <line-width type="light barline">1.8</line-width>
      <line-width type="heavy barline">5.5</line-width>
      <line-width type="beam">5</line-width>
      <line-width type="bracket">4.5</line-width>
      <line-width type="dashes">1</line-width>
      <line-width type="enclosure">1</line-width>
      <line-width type="ending">1.1</line-width>
      <line-width type="extend">1</line-width>
      <line-width type="leger">1.6</line-width>
      <line-width type="pedal">1.1</line-width>
      <line-width type="octave shift">1.1</line-width>
      <line-width type="slur middle">2.1</line-width>
      <line-width type="slur tip">0.5</line-width>
      <line-width type="staff">1.1</line-width>
      <line-width type="stem">1</line-width>
      <line-width type="tie middle">2.1</line-width>
      <line-width type="tie tip">0.5</line-width>
      <line-width type="tuplet bracket">1</line-width>
      <line-width type="wedge">1.2</line-width>
      <note-size type="cue">70</note-size>
      <note-size type="grace">70</note-size>
      <note-size type="grace-cue">49</note-size>
      </appearance>
    <music-font font-family="Leland"/>
    <word-font font-family="Edwin" font-size="10"/>
    <lyric-font font-family="Edwin" font-size="10"/>
    </defaults>
  <part-list>
    <score-part id="P1">
      <part-name>Violin</part-name>
      <part-abbreviation>Vln.</part-abbreviation>
      <score-instrument id="P1-I1">
        <instrument-name>Violin</instrument-name>
        <instrument-sound>strings.violin</instrument-sound>
        </score-instrument>
      <midi-device id="P1-I1" port="1"></midi-device>
      <midi-instrument id="P1-I1">
        <midi-channel>1</midi-channel>
        <midi-program>41</midi-program>
        <volume>78.7402</volume>
        <pan>0</pan>
        </midi-instrument>
      </score-part>
    </part-list>
  <part id="P1">
    <measure number="1" width="202.77">
      <print>
        <system-layout>
          <system-margins>
            <left-margin>50</left-margin>
            <right-margin>0</right-margin>
            </system-margins>
          <top-system-distance>70</top-system-distance>
          </system-layout>
        </print>
      <attributes>
        <divisions>2</divisions>
        <key>
          <fifths>3</fifths>
          </key>
        <time>
          <beats>6</beats>
          <beat-type>8</beat-type>
          </time>
        <clef>
          <sign>G</sign>
          <line>2</line>
          </clef>
        </attributes>
      <direction placement="above" system="only-top">
        <direction-type>
          <metronome parentheses="no" default-x="-35.72" relative-y="20">
            <beat-unit>quarter</beat-unit>
            <per-minute>100</per-minute>
            </metronome>
          </direction-type>
        <sound tempo="100"/>
        </direction>
      <note default-x="117.39" default-y="-15" dynamics="72.22">
        <pitch>
          <step>C</step>
          <alter>1</alter>
          <octave>5</octave>
          </pitch>
        <duration>3</duration>
        <voice>1</voice>
        <type>quarter</type>
        <dot default-x="135.38" default-y="-15"/>
        <stem>down</stem>
        </note>
      <note default-x="153.5" default-y="-10" dynamics="86.67">
        <pitch>
          <step>D</step>
          <octave>5</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        </note>
      <note default-x="172.49" default-y="-15" dynamics="82.22">
        <pitch>
          <step>C</step>
          <alter>1</alter>
          <octave>5</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="2" width="97.89">
      <note default-x="12.5" default-y="-5" dynamics="90">
        <pitch>
          <step>E</step>
          <octave>5</octave>
          </pitch>
        <duration>3</duration>
        <tie type="start"/>
        <voice>1</voice>
        <type>quarter</type>
        <dot default-x="30.49" default-y="-5"/>
        <stem>down</stem>
        <notations>
          <tied type="start"/>
          </notations>
        </note>
      <note default-x="48.61" default-y="-5" dynamics="90">
        <pitch>
          <step>E</step>
          <octave>5</octave>
          </pitch>
        <duration>1</duration>
        <tie type="stop"/>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <notations>
          <tied type="stop"/>
          </notations>
        </note>
      <note default-x="67.6" default-y="-5" dynamics="85.56">
        <pitch>
          <step>E</step>
          <octave>5</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="3" width="97.89">
      <note default-x="12.5" default-y="-20" dynamics="81.11">
        <pitch>
          <step>B</step>
          <octave>4</octave>
          </pitch>
        <duration>3</duration>
        <voice>1</voice>
        <type>quarter</type>
        <dot default-x="30.49" default-y="-15"/>
        <stem>down</stem>
        </note>
      <note default-x="48.61" default-y="-15" dynamics="86.67">
        <pitch>
          <step>C</step>
          <alter>1</alter>
          <octave>5</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        </note>
      <note default-x="67.6" default-y="-20" dynamics="75.56">
        <pitch>
          <step>B</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="4" width="97.89">
      <note default-x="12.5" default-y="-10" dynamics="90">
        <pitch>
          <step>D</step>
          <octave>5</octave>
          </pitch>
        <duration>3</duration>
        <tie type="start"/>
        <voice>1</voice>
        <type>quarter</type>
        <dot default-x="30.49" default-y="-5"/>
        <stem>down</stem>
        <notations>
          <tied type="start"/>
          </notations>
        </note>
      <note default-x="48.61" default-y="-10" dynamics="90">
        <pitch>
          <step>D</step>
          <octave>5</octave>
          </pitch>
        <duration>1</duration>
        <tie type="stop"/>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <notations>
          <tied type="stop"/>
          </notations>
        </note>
      <note default-x="67.6" default-y="-10" dynamics="92.22">
        <pitch>
          <step>D</step>
          <octave>5</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="5" width="105.95">
      <note default-x="12.5" default-y="-25" dynamics="72.22">
        <pitch>
          <step>A</step>
          <octave>4</octave>
          </pitch>
        <duration>3</duration>
        <tie type="start"/>
        <voice>1</voice>
        <type>quarter</type>
        <dot default-x="30.49" default-y="-25"/>
        <stem>up</stem>
        <notations>
          <tied type="start"/>
          </notations>
        </note>
      <note default-x="48.61" default-y="-25" dynamics="72.22">
        <pitch>
          <step>A</step>
          <octave>4</octave>
          </pitch>
        <duration>1</duration>
        <tie type="stop"/>
        <voice>1</voice>
        <type>eighth</type>
        <stem>up</stem>
        <notations>
          <tied type="stop"/>
          </notations>
        </note>
      <note default-x="75.66" default-y="-25" dynamics="85.56">
        <pitch>
          <step>A</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>up</stem>
        </note>
      </measure>
    <measure number="6" width="97.89">
      <note default-x="12.5" default-y="-20" dynamics="90">
        <pitch>
          <step>B</step>
          <octave>4</octave>
          </pitch>
        <duration>3</duration>
        <tie type="start"/>
        <voice>1</voice>
        <type>quarter</type>
        <dot default-x="30.49" default-y="-15"/>
        <stem>down</stem>
        <notations>
          <tied type="start"/>
          </notations>
        </note>
      <note default-x="48.61" default-y="-20" dynamics="90">
        <pitch>
          <step>B</step>
          <octave>4</octave>
          </pitch>
        <duration>1</duration>
        <tie type="stop"/>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <notations>
          <tied type="stop"/>
          </notations>
        </note>
      <note default-x="67.6" default-y="-20" dynamics="82.22">
        <pitch>
          <step>B</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="7" width="116.38">
      <note default-x="12.5" default-y="-15" dynamics="90">
        <pitch>
          <step>C</step>
          <alter>1</alter>
          <octave>5</octave>
          </pitch>
        <duration>3</duration>
        <tie type="start"/>
        <voice>1</voice>
        <type>quarter</type>
        <dot default-x="30.49" default-y="-15"/>
        <stem>down</stem>
        <notations>
          <tied type="start"/>
          </notations>
        </note>
      <note default-x="48.61" default-y="-15" dynamics="90">
        <pitch>
          <step>C</step>
          <alter>1</alter>
          <octave>5</octave>
          </pitch>
        <duration>1</duration>
        <tie type="stop"/>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">begin</beam>
        <notations>
          <tied type="stop"/>
          </notations>
        </note>
      <note default-x="67.6" default-y="-5" dynamics="96.67">
        <pitch>
          <step>E</step>
          <octave>5</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">continue</beam>
        </note>
      <note default-x="86.59" default-y="-10" dynamics="85.56">
        <pitch>
          <step>D</step>
          <octave>5</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">end</beam>
        </note>
      </measure>
    <measure number="8" width="97.89">
      <note default-x="12.5" default-y="-15" dynamics="82.22">
        <pitch>
          <step>C</step>
          <alter>1</alter>
          <octave>5</octave>
          </pitch>
        <duration>3</duration>
        <tie type="start"/>
        <voice>1</voice>
        <type>quarter</type>
        <dot default-x="30.49" default-y="-15"/>
        <stem>down</stem>
        <notations>
          <tied type="start"/>
          </notations>
        </note>
      <note default-x="48.61" default-y="-15" dynamics="82.22">
        <pitch>
          <step>C</step>
          <alter>1</alter>
          <octave>5</octave>
          </pitch>
        <duration>1</duration>
        <tie type="stop"/>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <notations>
          <tied type="stop"/>
          </notations>
        </note>
      <note default-x="67.6" default-y="-20" dynamics="80">
        <pitch>
          <step>B</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="9" width="97.89">
      <note default-x="12.5" default-y="-15" dynamics="83.33">
        <pitch>
          <step>C</step>
          <alter>1</alter>
          <octave>5</octave>
          </pitch>
        <duration>3</duration>
        <voice>1</voice>
        <type>quarter</type>
        <dot default-x="30.49" default-y="-15"/>
        <stem>down</stem>
        </note>
      <note default-x="48.61" default-y="-10" dynamics="88.89">
        <pitch>
          <step>D</step>
          <octave>5</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        </note>
      <note default-x="67.6" default-y="-15" dynamics="81.11">
        <pitch>
          <step>C</step>
          <alter>1</alter>
          <octave>5</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="10" width="183.63">
      <print new-system="yes">
        <system-layout>
          <system-margins>
            <left-margin>0</left-margin>
            <right-margin>0</right-margin>
            </system-margins>
          <system-distance>165</system-distance>
          </system-layout>
        </print>
      <note default-x="97.26" default-y="-5" dynamics="94.44">
        <pitch>
          <step>E</step>
          <octave>5</octave>
          </pitch>
        <duration>3</duration>
        <tie type="start"/>
        <voice>1</voice>
        <type>quarter</type>
        <dot default-x="115.26" default-y="-5"/>
        <stem>down</stem>
        <notations>
          <tied type="start"/>
          </notations>
        </note>
      <note default-x="133.8" default-y="-5" dynamics="94.44">
        <pitch>
          <step>E</step>
          <octave>5</octave>
          </pitch>
        <duration>1</duration>
        <tie type="stop"/>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <notations>
          <tied type="stop"/>
          </notations>
        </note>
      <note default-x="153.01" default-y="-5" dynamics="82.22">
        <pitch>
          <step>E</step>
          <octave>5</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="11" width="98.87">
      <note default-x="12.5" default-y="-20" dynamics="77.78">
        <pitch>
          <step>B</step>
          <octave>4</octave>
          </pitch>
        <duration>3</duration>
        <voice>1</voice>
        <type>quarter</type>
        <dot default-x="30.49" default-y="-15"/>
        <stem>down</stem>
        </note>
      <note default-x="49.03" default-y="-15" dynamics="84.44">
        <pitch>
          <step>C</step>
          <alter>1</alter>
          <octave>5</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        </note>
      <note default-x="68.25" default-y="-20" dynamics="77.78">
        <pitch>
          <step>B</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="12" width="98.87">
      <note default-x="12.5" default-y="-10" dynamics="95.56">
        <pitch>
          <step>D</step>
          <octave>5</octave>
          </pitch>
        <duration>3</duration>
        <tie type="start"/>
        <voice>1</voice>
        <type>quarter</type>
        <dot default-x="30.49" default-y="-5"/>
        <stem>down</stem>
        <notations>
          <tied type="start"/>
          </notations>
        </note>
      <note default-x="49.03" default-y="-10" dynamics="95.56">
        <pitch>
          <step>D</step>
          <octave>5</octave>
          </pitch>
        <duration>1</duration>
        <tie type="stop"/>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <notations>
          <tied type="stop"/>
          </notations>
        </note>
      <note default-x="68.25" default-y="-10" dynamics="84.44">
        <pitch>
          <step>D</step>
          <octave>5</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="13" width="106.71">
      <note default-x="12.5" default-y="-25" dynamics="73.33">
        <pitch>
          <step>A</step>
          <octave>4</octave>
          </pitch>
        <duration>3</duration>
        <tie type="start"/>
        <voice>1</voice>
        <type>quarter</type>
        <dot default-x="30.49" default-y="-25"/>
        <stem>up</stem>
        <notations>
          <tied type="start"/>
          </notations>
        </note>
      <note default-x="49.03" default-y="-25" dynamics="73.33">
        <pitch>
          <step>A</step>
          <octave>4</octave>
          </pitch>
        <duration>1</duration>
        <tie type="stop"/>
        <voice>1</voice>
        <type>eighth</type>
        <stem>up</stem>
        <notations>
          <tied type="stop"/>
          </notations>
        </note>
      <note default-x="76.08" default-y="-20" dynamics="90">
        <pitch>
          <step>B</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="14" width="98.87">
      <note default-x="12.5" default-y="-15" dynamics="84.44">
        <pitch>
          <step>C</step>
          <alter>1</alter>
          <octave>5</octave>
          </pitch>
        <duration>3</duration>
        <tie type="start"/>
        <voice>1</voice>
        <type>quarter</type>
        <dot default-x="30.49" default-y="-15"/>
        <stem>down</stem>
        <notations>
          <tied type="start"/>
          </notations>
        </note>
      <note default-x="49.03" default-y="-15" dynamics="84.44">
        <pitch>
          <step>C</step>
          <alter>1</alter>
          <octave>5</octave>
          </pitch>
        <duration>1</duration>
        <tie type="stop"/>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <notations>
          <tied type="stop"/>
          </notations>
        </note>
      <note default-x="68.25" default-y="-10" dynamics="92.22">
        <pitch>
          <step>D</step>
          <octave>5</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="15" width="98.87">
      <note default-x="12.5" default-y="-15" dynamics="81.11">
        <pitch>
          <step>C</step>
          <alter>1</alter>
          <octave>5</octave>
          </pitch>
        <duration>3</duration>
        <tie type="start"/>
        <voice>1</voice>
        <type>quarter</type>
        <dot default-x="30.49" default-y="-15"/>
        <stem>down</stem>
        <notations>
          <tied type="start"/>
          </notations>
        </note>
      <note default-x="49.03" default-y="-15" dynamics="81.11">
        <pitch>
          <step>C</step>
          <alter>1</alter>
          <octave>5</octave>
          </pitch>
        <duration>1</duration>
        <tie type="stop"/>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <notations>
          <tied type="stop"/>
          </notations>
        </note>
      <note default-x="68.25" default-y="-20" dynamics="78.89">
        <pitch>
          <step>B</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="16" width="80">
      <note default-x="12.5" default-y="-25" dynamics="83.33">
        <pitch>
          <step>A</step>
          <octave>4</octave>
          </pitch>
        <duration>6</duration>
        <voice>1</voice>
        <type>half</type>
        <dot default-x="30.49" default-y="-25"/>
        <stem>up</stem>
        <notations>
          <articulations>
            <staccato default-x="6.5" default-y="-33.43"/>
            </articulations>
          </notations>
        </note>
      </measure>
    <measure number="17" width="98.87">
      <note default-x="12.5" default-y="-5" dynamics="76.67">
        <pitch>
          <step>E</step>
          <octave>5</octave>
          </pitch>
        <duration>3</duration>
        <voice>1</voice>
        <type>quarter</type>
        <dot default-x="30.49" default-y="-5"/>
        <stem>down</stem>
        </note>
      <note default-x="49.03" default-y="0" dynamics="87.78">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>5</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        </note>
      <note default-x="68.25" default-y="-5" dynamics="78.89">
        <pitch>
          <step>E</step>
          <octave>5</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="18" width="98.87">
      <note default-x="12.5" default-y="0" dynamics="86.67">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>5</octave>
          </pitch>
        <duration>3</duration>
        <tie type="start"/>
        <voice>1</voice>
        <type>quarter</type>
        <dot default-x="30.49" default-y="5"/>
        <stem>down</stem>
        <notations>
          <tied type="start"/>
          </notations>
        </note>
      <note default-x="49.03" default-y="0" dynamics="86.67">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>5</octave>
          </pitch>
        <duration>1</duration>
        <tie type="stop"/>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <notations>
          <tied type="stop"/>
          </notations>
        </note>
      <note default-x="68.25" default-y="0" dynamics="90">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>5</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="19" width="98.87">
      <note default-x="12.5" default-y="10" dynamics="94.44">
        <pitch>
          <step>A</step>
          <octave>5</octave>
          </pitch>
        <duration>3</duration>
        <voice>1</voice>
        <type>quarter</type>
        <dot default-x="30.49" default-y="15"/>
        <stem>down</stem>
        </note>
      <note default-x="49.03" default-y="5" dynamics="87.78">
        <pitch>
          <step>G</step>
          <alter>1</alter>
          <octave>5</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        </note>
      <note default-x="68.25" default-y="0" dynamics="82.22">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>5</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="20" width="200.55">
      <print new-system="yes">
        <system-layout>
          <system-margins>
            <left-margin>0</left-margin>
            <right-margin>0</right-margin>
            </system-margins>
          <system-distance>165</system-distance>
          </system-layout>
        </print>
      <note default-x="97.26" default-y="0" dynamics="84.44">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>5</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="127.71" default-y="-5" dynamics="81.11">
        <pitch>
          <step>E</step>
          <octave>5</octave>
          </pitch>
        <duration>1</duration>
        <tie type="start"/>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <notations>
          <tied type="start"/>
          </notations>
        </note>
      <note default-x="148.01" default-y="-5" dynamics="81.11">
        <pitch>
          <step>E</step>
          <octave>5</octave>
          </pitch>
        <duration>1</duration>
        <tie type="stop"/>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <notations>
          <tied type="stop"/>
          </notations>
        </note>
      <note default-x="168.3" default-y="-5" dynamics="80">
        <pitch>
          <step>E</step>
          <octave>5</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="21" width="115.79">
      <note default-x="12.5" default-y="-5" dynamics="83.33">
        <pitch>
          <step>E</step>
          <octave>5</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="42.95" default-y="-15" dynamics="70">
        <pitch>
          <step>C</step>
          <alter>1</alter>
          <octave>5</octave>
          </pitch>
        <duration>1</duration>
        <tie type="start"/>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <notations>
          <tied type="start"/>
          </notations>
        </note>
      <note default-x="63.24" default-y="-15" dynamics="70">
        <pitch>
          <step>C</step>
          <alter>1</alter>
          <octave>5</octave>
          </pitch>
        <duration>1</duration>
        <tie type="stop"/>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <notations>
          <tied type="stop"/>
          </notations>
        </note>
      <note default-x="83.54" default-y="-25" dynamics="74.44">
        <pitch>
          <step>A</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>up</stem>
        </note>
      </measure>
    <measure number="22" width="115.79">
      <note default-x="12.5" default-y="-5" dynamics="98.89">
        <pitch>
          <step>E</step>
          <octave>5</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="42.95" default-y="-10" dynamics="78.89">
        <pitch>
          <step>D</step>
          <octave>5</octave>
          </pitch>
        <duration>1</duration>
        <tie type="start"/>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <notations>
          <tied type="start"/>
          </notations>
        </note>
      <note default-x="63.24" default-y="-10" dynamics="78.89">
        <pitch>
          <step>D</step>
          <octave>5</octave>
          </pitch>
        <duration>1</duration>
        <tie type="stop"/>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <notations>
          <tied type="stop"/>
          </notations>
        </note>
      <note default-x="83.54" default-y="-20" dynamics="73.33">
        <pitch>
          <step>B</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="23" width="112.09">
      <note default-x="12.5" default-y="-15" dynamics="87.78">
        <pitch>
          <step>C</step>
          <alter>1</alter>
          <octave>5</octave>
          </pitch>
        <duration>3</duration>
        <tie type="start"/>
        <voice>1</voice>
        <type>quarter</type>
        <dot default-x="30.49" default-y="-15"/>
        <stem>down</stem>
        <notations>
          <tied type="start"/>
          </notations>
        </note>
      <note default-x="51.1" default-y="-15" dynamics="87.78">
        <pitch>
          <step>C</step>
          <alter>1</alter>
          <octave>5</octave>
          </pitch>
        <duration>1</duration>
        <tie type="stop"/>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <notations>
          <tied type="stop"/>
          </notations>
        </note>
      <note default-x="79.85" default-y="-10" dynamics="93.33">
        <pitch>
          <step>D</step>
          <alter>1</alter>
          <octave>5</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <accidental>sharp</accidental>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="24" width="103.64">
      <note default-x="12.5" default-y="-5" dynamics="92.22">
        <pitch>
          <step>E</step>
          <octave>5</octave>
          </pitch>
        <duration>3</duration>
        <tie type="start"/>
        <voice>1</voice>
        <type>quarter</type>
        <dot default-x="30.49" default-y="-5"/>
        <stem>down</stem>
        <notations>
          <tied type="start"/>
          </notations>
        </note>
      <note default-x="51.1" default-y="-5" dynamics="92.22">
        <pitch>
          <step>E</step>
          <octave>5</octave>
          </pitch>
        <duration>1</duration>
        <tie type="stop"/>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <notations>
          <tied type="stop"/>
          </notations>
        </note>
      <note default-x="71.39" default-y="-10" dynamics="77.78">
        <pitch>
          <step>D</step>
          <octave>5</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="25" width="103.64">
      <note default-x="12.5" default-y="-15" dynamics="84.44">
        <pitch>
          <step>C</step>
          <alter>1</alter>
          <octave>5</octave>
          </pitch>
        <duration>3</duration>
        <voice>1</voice>
        <type>quarter</type>
        <dot default-x="30.49" default-y="-15"/>
        <stem>down</stem>
        </note>
      <note default-x="51.1" default-y="-10" dynamics="95.56">
        <pitch>
          <step>D</step>
          <octave>5</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        </note>
      <note default-x="71.39" default-y="-15" dynamics="87.78">
        <pitch>
          <step>C</step>
          <alter>1</alter>
          <octave>5</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="26" width="103.64">
      <note default-x="12.5" default-y="-5" dynamics="94.44">
        <pitch>
          <step>E</step>
          <octave>5</octave>
          </pitch>
        <duration>3</duration>
        <tie type="start"/>
        <voice>1</voice>
        <type>quarter</type>
        <dot default-x="30.49" default-y="-5"/>
        <stem>down</stem>
        <notations>
          <tied type="start"/>
          </notations>
        </note>
      <note default-x="51.1" default-y="-5" dynamics="94.44">
        <pitch>
          <step>E</step>
          <octave>5</octave>
          </pitch>
        <duration>1</duration>
        <tie type="stop"/>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <notations>
          <tied type="stop"/>
          </notations>
        </note>
      <note default-x="71.39" default-y="-5" dynamics="86.67">
        <pitch>
          <step>E</step>
          <octave>5</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="27" width="103.64">
      <note default-x="12.5" default-y="-20" dynamics="76.67">
        <pitch>
          <step>B</step>
          <octave>4</octave>
          </pitch>
        <duration>3</duration>
        <voice>1</voice>
        <type>quarter</type>
        <dot default-x="30.49" default-y="-15"/>
        <stem>down</stem>
        </note>
      <note default-x="51.1" default-y="-15" dynamics="94.44">
        <pitch>
          <step>C</step>
          <alter>1</alter>
          <octave>5</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        </note>
      <note default-x="71.39" default-y="-20" dynamics="88.89">
        <pitch>
          <step>B</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="28" width="103.64">
      <note default-x="12.5" default-y="-10" dynamics="95.56">
        <pitch>
          <step>D</step>
          <octave>5</octave>
          </pitch>
        <duration>3</duration>
        <tie type="start"/>
        <voice>1</voice>
        <type>quarter</type>
        <dot default-x="30.49" default-y="-5"/>
        <stem>down</stem>
        <notations>
          <tied type="start"/>
          </notations>
        </note>
      <note default-x="51.1" default-y="-10" dynamics="95.56">
        <pitch>
          <step>D</step>
          <octave>5</octave>
          </pitch>
        <duration>1</duration>
        <tie type="stop"/>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <notations>
          <tied type="stop"/>
          </notations>
        </note>
      <note default-x="71.39" default-y="-10" dynamics="93.33">
        <pitch>
          <step>D</step>
          <octave>5</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="29" width="212.24">
      <print new-system="yes">
        <system-layout>
          <system-margins>
            <left-margin>0</left-margin>
            <right-margin>0</right-margin>
            </system-margins>
          <system-distance>165</system-distance>
          </system-layout>
        </print>
      <note default-x="97.26" default-y="-25" dynamics="76.67">
        <pitch>
          <step>A</step>
          <octave>4</octave>
          </pitch>
        <duration>3</duration>
        <tie type="start"/>
        <voice>1</voice>
        <type>quarter</type>
        <dot default-x="115.26" default-y="-25"/>
        <stem>up</stem>
        <notations>
          <tied type="start"/>
          </notations>
        </note>
      <note default-x="145.41" default-y="-25" dynamics="76.67">
        <pitch>
          <step>A</step>
          <octave>4</octave>
          </pitch>
        <duration>1</duration>
        <tie type="stop"/>
        <voice>1</voice>
        <type>eighth</type>
        <stem>up</stem>
        <notations>
          <tied type="stop"/>
          </notations>
        </note>
      <note default-x="172.46" default-y="-20" dynamics="94.44">
        <pitch>
          <step>B</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="30" width="125.74">
      <note default-x="12.5" default-y="-15" dynamics="96.67">
        <pitch>
          <step>C</step>
          <alter>1</alter>
          <octave>5</octave>
          </pitch>
        <duration>3</duration>
        <tie type="start"/>
        <voice>1</voice>
        <type>quarter</type>
        <dot default-x="30.49" default-y="-15"/>
        <stem>down</stem>
        <notations>
          <tied type="start"/>
          </notations>
        </note>
      <note default-x="60.65" default-y="-15" dynamics="96.67">
        <pitch>
          <step>C</step>
          <alter>1</alter>
          <octave>5</octave>
          </pitch>
        <duration>1</duration>
        <tie type="stop"/>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <notations>
          <tied type="stop"/>
          </notations>
        </note>
      <note default-x="85.96" default-y="-10" dynamics="93.33">
        <pitch>
          <step>D</step>
          <octave>5</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="31" width="125.74">
      <note default-x="12.5" default-y="-15" dynamics="86.67">
        <pitch>
          <step>C</step>
          <alter>1</alter>
          <octave>5</octave>
          </pitch>
        <duration>3</duration>
        <tie type="start"/>
        <voice>1</voice>
        <type>quarter</type>
        <dot default-x="30.49" default-y="-15"/>
        <stem>down</stem>
        <notations>
          <tied type="start"/>
          </notations>
        </note>
      <note default-x="60.65" default-y="-15" dynamics="86.67">
        <pitch>
          <step>C</step>
          <alter>1</alter>
          <octave>5</octave>
          </pitch>
        <duration>1</duration>
        <tie type="stop"/>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <notations>
          <tied type="stop"/>
          </notations>
        </note>
      <note default-x="85.96" default-y="-20" dynamics="84.44">
        <pitch>
          <step>B</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="32" width="125.74">
      <note default-x="12.5" default-y="-20" dynamics="88.89">
        <pitch>
          <step>B</step>
          <octave>4</octave>
          </pitch>
        <duration>3</duration>
        <tie type="start"/>
        <voice>1</voice>
        <type>quarter</type>
        <dot default-x="30.49" default-y="-15"/>
        <stem>down</stem>
        <notations>
          <tied type="start"/>
          </notations>
        </note>
      <note default-x="60.65" default-y="-20" dynamics="88.89">
        <pitch>
          <step>B</step>
          <octave>4</octave>
          </pitch>
        <duration>1</duration>
        <tie type="stop"/>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <notations>
          <tied type="stop"/>
          </notations>
        </note>
      <note default-x="85.96" default-y="-15" dynamics="96.67">
        <pitch>
          <step>C</step>
          <alter>1</alter>
          <octave>5</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="33" width="125.74">
      <note default-x="12.5" default-y="-15" dynamics="90">
        <pitch>
          <step>C</step>
          <alter>1</alter>
          <octave>5</octave>
          </pitch>
        <duration>3</duration>
        <tie type="start"/>
        <voice>1</voice>
        <type>quarter</type>
        <dot default-x="30.49" default-y="-15"/>
        <stem>down</stem>
        <notations>
          <tied type="start"/>
          </notations>
        </note>
      <note default-x="60.65" default-y="-15" dynamics="90">
        <pitch>
          <step>C</step>
          <alter>1</alter>
          <octave>5</octave>
          </pitch>
        <duration>1</duration>
        <tie type="stop"/>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <notations>
          <tied type="stop"/>
          </notations>
        </note>
      <note default-x="85.96" default-y="-10" dynamics="88.89">
        <pitch>
          <step>D</step>
          <octave>5</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="34" width="125.74">
      <note default-x="12.5" default-y="-5" dynamics="93.33">
        <pitch>
          <step>E</step>
          <octave>5</octave>
          </pitch>
        <duration>3</duration>
        <tie type="start"/>
        <voice>1</voice>
        <type>quarter</type>
        <dot default-x="30.49" default-y="-5"/>
        <stem>down</stem>
        <notations>
          <tied type="start"/>
          </notations>
        </note>
      <note default-x="60.65" default-y="-5" dynamics="93.33">
        <pitch>
          <step>E</step>
          <octave>5</octave>
          </pitch>
        <duration>1</duration>
        <tie type="stop"/>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <notations>
          <tied type="stop"/>
          </notations>
        </note>
      <note default-x="85.96" default-y="0" dynamics="91.11">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>5</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="35" width="125.74">
      <note default-x="12.5" default-y="-15" dynamics="82.22">
        <pitch>
          <step>C</step>
          <alter>1</alter>
          <octave>5</octave>
          </pitch>
        <duration>3</duration>
        <tie type="start"/>
        <voice>1</voice>
        <type>quarter</type>
        <dot default-x="30.49" default-y="-15"/>
        <stem>down</stem>
        <notations>
          <tied type="start"/>
          </notations>
        </note>
      <note default-x="60.65" default-y="-15" dynamics="82.22">
        <pitch>
          <step>C</step>
          <alter>1</alter>
          <octave>5</octave>
          </pitch>
        <duration>1</duration>
        <tie type="stop"/>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <notations>
          <tied type="stop"/>
          </notations>
        </note>
      <note default-x="85.96" default-y="-20" dynamics="61.11">
        <pitch>
          <step>B</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="36" width="95.72">
      <note default-x="12.5" default-y="-25" dynamics="48.89">
        <pitch>
          <step>A</step>
          <octave>4</octave>
          </pitch>
        <duration>6</duration>
        <voice>1</voice>
        <type>half</type>
        <dot default-x="30.49" default-y="-25"/>
        <stem>up</stem>
        </note>
      <barline location="right">
        <bar-style>light-heavy</bar-style>
        </barline>
      </measure>
    </part>
  </score-partwise>
`,
  "hark.musicxml": `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 4.0 Partwise//EN" "http://www.musicxml.org/dtds/partwise.dtd">
<score-partwise version="4.0">
<work>
  <work-title>Hark</work-title>
</work>
  <identification>
    <encoding>
      <software>MuseScore 4.5.2</software>
      <encoding-date>2025-06-17</encoding-date>
      <supports element="accidental" type="yes"/>
      <supports element="beam" type="yes"/>
      <supports element="print" attribute="new-page" type="yes" value="yes"/>
      <supports element="print" attribute="new-system" type="yes" value="yes"/>
      <supports element="stem" type="yes"/>
      </encoding>
    </identification>
  <defaults>
    <scaling>
      <millimeters>6.99911</millimeters>
      <tenths>40</tenths>
      </scaling>
    <page-layout>
      <page-height>1596.77</page-height>
      <page-width>1233.87</page-width>
      <page-margins type="even">
        <left-margin>85.7252</left-margin>
        <right-margin>85.7252</right-margin>
        <top-margin>85.7252</top-margin>
        <bottom-margin>85.7252</bottom-margin>
        </page-margins>
      <page-margins type="odd">
        <left-margin>85.7252</left-margin>
        <right-margin>85.7252</right-margin>
        <top-margin>85.7252</top-margin>
        <bottom-margin>85.7252</bottom-margin>
        </page-margins>
      </page-layout>
    <appearance>
      <line-width type="light barline">1.8</line-width>
      <line-width type="heavy barline">5.5</line-width>
      <line-width type="beam">5</line-width>
      <line-width type="bracket">4.5</line-width>
      <line-width type="dashes">1</line-width>
      <line-width type="enclosure">1</line-width>
      <line-width type="ending">1.1</line-width>
      <line-width type="extend">1</line-width>
      <line-width type="leger">1.6</line-width>
      <line-width type="pedal">1.1</line-width>
      <line-width type="octave shift">1.1</line-width>
      <line-width type="slur middle">2.1</line-width>
      <line-width type="slur tip">0.5</line-width>
      <line-width type="staff">1.1</line-width>
      <line-width type="stem">1</line-width>
      <line-width type="tie middle">2.1</line-width>
      <line-width type="tie tip">0.5</line-width>
      <line-width type="tuplet bracket">1</line-width>
      <line-width type="wedge">1.2</line-width>
      <note-size type="cue">70</note-size>
      <note-size type="grace">70</note-size>
      <note-size type="grace-cue">49</note-size>
      </appearance>
    <music-font font-family="Leland"/>
    <word-font font-family="Edwin" font-size="10"/>
    <lyric-font font-family="Edwin" font-size="10"/>
    </defaults>
  <part-list>
    <score-part id="P1">
      <part-name>Violin</part-name>
      <part-abbreviation>Vln.</part-abbreviation>
      <score-instrument id="P1-I1">
        <instrument-name>Violin</instrument-name>
        <instrument-sound>strings.violin</instrument-sound>
        </score-instrument>
      <midi-device id="P1-I1" port="1"></midi-device>
      <midi-instrument id="P1-I1">
        <midi-channel>1</midi-channel>
        <midi-program>41</midi-program>
        <volume>78.7402</volume>
        <pan>0</pan>
        </midi-instrument>
      </score-part>
    </part-list>
  <part id="P1">
    <measure number="1" width="191.13">
      <print>
        <system-layout>
          <system-margins>
            <left-margin>50</left-margin>
            <right-margin>0</right-margin>
            </system-margins>
          <top-system-distance>70</top-system-distance>
          </system-layout>
        </print>
      <attributes>
        <divisions>1</divisions>
        <key>
          <fifths>1</fifths>
          </key>
        <time>
          <beats>4</beats>
          <beat-type>4</beat-type>
          </time>
        <clef>
          <sign>G</sign>
          <line>2</line>
          </clef>
        </attributes>
      <direction placement="above" system="only-top">
        <direction-type>
          <metronome parentheses="no" default-x="-37.68" relative-y="20">
            <beat-unit>quarter</beat-unit>
            <per-minute>100</per-minute>
            </metronome>
          </direction-type>
        <sound tempo="100"/>
        </direction>
      <note default-x="97.47" default-y="-45" dynamics="86.67">
        <pitch>
          <step>D</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>up</stem>
        </note>
      <note default-x="143.4" default-y="-30" dynamics="106.67">
        <pitch>
          <step>G</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>up</stem>
        </note>
      </measure>
    <measure number="2" width="103.15">
      <note default-x="12.5" default-y="-30" dynamics="95.56">
        <pitch>
          <step>G</step>
          <octave>4</octave>
          </pitch>
        <duration>3</duration>
        <voice>1</voice>
        <type>half</type>
        <dot default-x="30.49" default-y="-25"/>
        <stem>up</stem>
        </note>
      <note default-x="70.73" default-y="-35" dynamics="91.11">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>4</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>up</stem>
        </note>
      </measure>
    <measure number="3" width="106.17">
      <note default-x="12.5" default-y="-30" dynamics="97.78">
        <pitch>
          <step>G</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>up</stem>
        </note>
      <note default-x="58.43" default-y="-20" dynamics="101.11">
        <pitch>
          <step>B</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="4" width="106.17">
      <note default-x="12.5" default-y="-20" dynamics="94.44">
        <pitch>
          <step>B</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      <note default-x="58.43" default-y="-25" dynamics="86.67">
        <pitch>
          <step>A</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>up</stem>
        </note>
      </measure>
    <measure number="5" width="106.17">
      <note default-x="12.5" default-y="-10" dynamics="106.67">
        <pitch>
          <step>D</step>
          <octave>5</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      <note default-x="58.43" default-y="-10" dynamics="101.11">
        <pitch>
          <step>D</step>
          <octave>5</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="6" width="103.15">
      <note default-x="12.5" default-y="-10" dynamics="93.33">
        <pitch>
          <step>D</step>
          <octave>5</octave>
          </pitch>
        <duration>3</duration>
        <voice>1</voice>
        <type>half</type>
        <dot default-x="30.49" default-y="-5"/>
        <stem>down</stem>
        </note>
      <note default-x="70.73" default-y="-15" dynamics="87.78">
        <pitch>
          <step>C</step>
          <octave>5</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="7" width="106.17">
      <note default-x="12.5" default-y="-20" dynamics="87.78">
        <pitch>
          <step>B</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      <note default-x="58.43" default-y="-25" dynamics="86.67">
        <pitch>
          <step>A</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>up</stem>
        </note>
      </measure>
    <measure number="8" width="84.16">
      <note default-x="12.5" default-y="-20" dynamics="92.22">
        <pitch>
          <step>B</step>
          <octave>4</octave>
          </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>whole</type>
        </note>
      </measure>
    <measure number="9" width="106.17">
      <note default-x="12.5" default-y="-45" dynamics="72.22">
        <pitch>
          <step>D</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>up</stem>
        </note>
      <note default-x="58.43" default-y="-30" dynamics="105.56">
        <pitch>
          <step>G</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>up</stem>
        </note>
      </measure>
    <measure number="10" width="162.6">
      <print new-system="yes">
        <system-layout>
          <system-margins>
            <left-margin>0</left-margin>
            <right-margin>0</right-margin>
            </system-margins>
          <system-distance>160</system-distance>
          </system-layout>
        </print>
      <note default-x="75.35" default-y="-30" dynamics="95.56">
        <pitch>
          <step>G</step>
          <octave>4</octave>
          </pitch>
        <duration>3</duration>
        <voice>1</voice>
        <type>half</type>
        <dot default-x="93.34" default-y="-25"/>
        <stem>up</stem>
        </note>
      <note default-x="131.35" default-y="-35" dynamics="90">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>4</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>up</stem>
        </note>
      </measure>
    <measure number="11" width="102.65">
      <note default-x="12.5" default-y="-30" dynamics="94.44">
        <pitch>
          <step>G</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>up</stem>
        </note>
      <note default-x="56.67" default-y="-20" dynamics="104.44">
        <pitch>
          <step>B</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="12" width="102.65">
      <note default-x="12.5" default-y="-20" dynamics="92.22">
        <pitch>
          <step>B</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      <note default-x="56.67" default-y="-25" dynamics="85.56">
        <pitch>
          <step>A</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>up</stem>
        </note>
      </measure>
    <measure number="13" width="102.65">
      <note default-x="12.5" default-y="-10" dynamics="104.44">
        <pitch>
          <step>D</step>
          <octave>5</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      <note default-x="56.67" default-y="-25" dynamics="77.78">
        <pitch>
          <step>A</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>up</stem>
        </note>
      </measure>
    <measure number="14" width="99.75">
      <note default-x="12.5" default-y="-25" dynamics="91.11">
        <pitch>
          <step>A</step>
          <octave>4</octave>
          </pitch>
        <duration>3</duration>
        <voice>1</voice>
        <type>half</type>
        <dot default-x="30.49" default-y="-25"/>
        <stem>up</stem>
        </note>
      <note default-x="68.5" default-y="-35" dynamics="86.67">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>4</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>up</stem>
        </note>
      </measure>
    <measure number="15" width="102.65">
      <note default-x="12.5" default-y="-35" dynamics="95.56">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>up</stem>
        </note>
      <note default-x="56.67" default-y="-40" dynamics="90">
        <pitch>
          <step>E</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>up</stem>
        </note>
      </measure>
    <measure number="16" width="81.52">
      <note default-x="12.5" default-y="-45" dynamics="86.67">
        <pitch>
          <step>D</step>
          <octave>4</octave>
          </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>whole</type>
        </note>
      </measure>
    <measure number="17" width="102.65">
      <note default-x="12.5" default-y="-10" dynamics="82.22">
        <pitch>
          <step>D</step>
          <octave>5</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      <note default-x="56.67" default-y="-10" dynamics="68.89">
        <pitch>
          <step>D</step>
          <octave>5</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="18" width="102.65">
      <note default-x="12.5" default-y="-10" dynamics="70">
        <pitch>
          <step>D</step>
          <octave>5</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      <note default-x="56.67" default-y="-30" dynamics="60">
        <pitch>
          <step>G</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>up</stem>
        </note>
      </measure>
    <measure number="19" width="102.65">
      <note default-x="12.5" default-y="-15" dynamics="102.22">
        <pitch>
          <step>C</step>
          <octave>5</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      <note default-x="56.67" default-y="-20" dynamics="91.11">
        <pitch>
          <step>B</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="20" width="163.43">
      <print new-system="yes">
        <system-layout>
          <system-margins>
            <left-margin>0</left-margin>
            <right-margin>0</right-margin>
            </system-margins>
          <system-distance>160</system-distance>
          </system-layout>
        </print>
      <note default-x="75.35" default-y="-20" dynamics="91.11">
        <pitch>
          <step>B</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      <note default-x="118.49" default-y="-25" dynamics="85.56">
        <pitch>
          <step>A</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>up</stem>
        </note>
      </measure>
    <measure number="21" width="100.58">
      <note default-x="12.5" default-y="-10" dynamics="77.78">
        <pitch>
          <step>D</step>
          <octave>5</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      <note default-x="55.64" default-y="-10" dynamics="68.89">
        <pitch>
          <step>D</step>
          <octave>5</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="22" width="100.58">
      <note default-x="12.5" default-y="-10" dynamics="67.78">
        <pitch>
          <step>D</step>
          <octave>5</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      <note default-x="55.64" default-y="-30" dynamics="60">
        <pitch>
          <step>G</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>up</stem>
        </note>
      </measure>
    <measure number="23" width="100.58">
      <note default-x="12.5" default-y="-15" dynamics="100">
        <pitch>
          <step>C</step>
          <octave>5</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      <note default-x="55.64" default-y="-20" dynamics="90">
        <pitch>
          <step>B</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="24" width="100.58">
      <note default-x="12.5" default-y="-20" dynamics="92.22">
        <pitch>
          <step>B</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      <note default-x="55.64" default-y="-25" dynamics="88.89">
        <pitch>
          <step>A</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>up</stem>
        </note>
      </measure>
    <measure number="25" width="100.58">
      <note default-x="12.5" default-y="-5" dynamics="131.11">
        <pitch>
          <step>E</step>
          <octave>5</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      <note default-x="55.64" default-y="-5" dynamics="107.78">
        <pitch>
          <step>E</step>
          <octave>5</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="26" width="100.58">
      <note default-x="12.5" default-y="-5" dynamics="104.44">
        <pitch>
          <step>E</step>
          <octave>5</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      <note default-x="55.64" default-y="-10" dynamics="100">
        <pitch>
          <step>D</step>
          <octave>5</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="27" width="100.58">
      <note default-x="12.5" default-y="-15" dynamics="107.78">
        <pitch>
          <step>C</step>
          <octave>5</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      <note default-x="55.64" default-y="-20" dynamics="101.11">
        <pitch>
          <step>B</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="28" width="80">
      <note default-x="12.5" default-y="-15" dynamics="113.33">
        <pitch>
          <step>C</step>
          <octave>5</octave>
          </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>whole</type>
        </note>
      </measure>
    <measure number="29" width="114.96">
      <note default-x="12.5" default-y="-25" dynamics="100">
        <pitch>
          <step>A</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>up</stem>
        </note>
      <note default-x="55.64" default-y="-20" dynamics="111.11">
        <pitch>
          <step>B</step>
          <octave>4</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="84.4" default-y="-15" dynamics="116.67">
        <pitch>
          <step>C</step>
          <octave>5</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="30" width="163.54">
      <print new-system="yes">
        <system-layout>
          <system-margins>
            <left-margin>0</left-margin>
            <right-margin>0</right-margin>
            </system-margins>
          <system-distance>160</system-distance>
          </system-layout>
        </print>
      <note default-x="75.35" default-y="-10" dynamics="86.67">
        <pitch>
          <step>D</step>
          <octave>5</octave>
          </pitch>
        <duration>3</duration>
        <voice>1</voice>
        <type>half</type>
        <dot default-x="93.34" default-y="-5"/>
        <stem>down</stem>
        </note>
      <note default-x="131.97" default-y="-30" dynamics="64.44">
        <pitch>
          <step>G</step>
          <octave>4</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>up</stem>
        </note>
      </measure>
    <measure number="31" width="103.62">
      <note default-x="12.5" default-y="-30" dynamics="76.67">
        <pitch>
          <step>G</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>up</stem>
        </note>
      <note default-x="57.16" default-y="-25" dynamics="87.78">
        <pitch>
          <step>A</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>up</stem>
        </note>
      </measure>
    <measure number="32" width="82.25">
      <note default-x="12.5" default-y="-20" dynamics="82.22">
        <pitch>
          <step>B</step>
          <octave>4</octave>
          </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>whole</type>
        </note>
      </measure>
    <measure number="33" width="100.69">
      <note default-x="12.5" default-y="-5" dynamics="125.56">
        <pitch>
          <step>E</step>
          <octave>5</octave>
          </pitch>
        <duration>3</duration>
        <voice>1</voice>
        <type>half</type>
        <dot default-x="30.49" default-y="-5"/>
        <stem>down</stem>
        </note>
      <note default-x="69.12" default-y="-5" dynamics="113.33">
        <pitch>
          <step>E</step>
          <octave>5</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="34" width="103.62">
      <note default-x="12.5" default-y="-5" dynamics="114.44">
        <pitch>
          <step>E</step>
          <octave>5</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      <note default-x="57.16" default-y="-10" dynamics="105.56">
        <pitch>
          <step>D</step>
          <octave>5</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="35" width="103.62">
      <note default-x="12.5" default-y="-15" dynamics="98.89">
        <pitch>
          <step>C</step>
          <octave>5</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      <note default-x="57.16" default-y="-20" dynamics="104.44">
        <pitch>
          <step>B</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="36" width="82.25">
      <note default-x="12.5" default-y="-15" dynamics="115.56">
        <pitch>
          <step>C</step>
          <octave>5</octave>
          </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>whole</type>
        </note>
      </measure>
    <measure number="37" width="118.51">
      <note default-x="12.5" default-y="-25" dynamics="101.11">
        <pitch>
          <step>A</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>up</stem>
        </note>
      <note default-x="57.16" default-y="-20" dynamics="112.22">
        <pitch>
          <step>B</step>
          <octave>4</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="86.93" default-y="-15" dynamics="121.11">
        <pitch>
          <step>C</step>
          <octave>5</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="38" width="100.69">
      <note default-x="12.5" default-y="-10" dynamics="117.78">
        <pitch>
          <step>D</step>
          <octave>5</octave>
          </pitch>
        <duration>3</duration>
        <voice>1</voice>
        <type>half</type>
        <dot default-x="30.49" default-y="-5"/>
        <stem>down</stem>
        </note>
      <note default-x="69.12" default-y="-30" dynamics="85.56">
        <pitch>
          <step>G</step>
          <octave>4</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>up</stem>
        </note>
      </measure>
    <measure number="39" width="103.62">
      <note default-x="12.5" default-y="-30" dynamics="111.11">
        <pitch>
          <step>G</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>up</stem>
        </note>
      <note default-x="57.16" default-y="-25" dynamics="116.67">
        <pitch>
          <step>A</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>up</stem>
        </note>
      </measure>
    <measure number="40" width="147.08">
      <print new-system="yes">
        <system-layout>
          <system-margins>
            <left-margin>0</left-margin>
            <right-margin>0</right-margin>
            </system-margins>
          <system-distance>160</system-distance>
          </system-layout>
        </print>
      <note default-x="74.39" default-y="-30" dynamics="106.67">
        <pitch>
          <step>G</step>
          <octave>4</octave>
          </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>whole</type>
        </note>
      <barline location="right">
        <bar-style>light-heavy</bar-style>
        </barline>
      </measure>
    </part>
  </score-partwise>
`,
  "air_on_the_g_string.musicxml": `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 4.0 Partwise//EN" "http://www.musicxml.org/dtds/partwise.dtd">
<score-partwise version="4.0">
<work>
  <work-title>Air on the G String</work-title>
</work>
  <identification>
    <encoding>
      <software>MuseScore 4.5.2</software>
      <encoding-date>2025-06-25</encoding-date>
      <supports element="accidental" type="yes"/>
      <supports element="beam" type="yes"/>
      <supports element="print" attribute="new-page" type="yes" value="yes"/>
      <supports element="print" attribute="new-system" type="yes" value="yes"/>
      <supports element="stem" type="yes"/>
      </encoding>
    </identification>
  <defaults>
    <scaling>
      <millimeters>6.99911</millimeters>
      <tenths>40</tenths>
      </scaling>
    <page-layout>
      <page-height>1596.77</page-height>
      <page-width>1233.87</page-width>
      <page-margins type="even">
        <left-margin>85.7252</left-margin>
        <right-margin>85.7252</right-margin>
        <top-margin>85.7252</top-margin>
        <bottom-margin>85.7252</bottom-margin>
        </page-margins>
      <page-margins type="odd">
        <left-margin>85.7252</left-margin>
        <right-margin>85.7252</right-margin>
        <top-margin>85.7252</top-margin>
        <bottom-margin>85.7252</bottom-margin>
        </page-margins>
      </page-layout>
    <appearance>
      <line-width type="light barline">1.8</line-width>
      <line-width type="heavy barline">5.5</line-width>
      <line-width type="beam">5</line-width>
      <line-width type="bracket">4.5</line-width>
      <line-width type="dashes">1</line-width>
      <line-width type="enclosure">1</line-width>
      <line-width type="ending">1.1</line-width>
      <line-width type="extend">1</line-width>
      <line-width type="leger">1.6</line-width>
      <line-width type="pedal">1.1</line-width>
      <line-width type="octave shift">1.1</line-width>
      <line-width type="slur middle">2.1</line-width>
      <line-width type="slur tip">0.5</line-width>
      <line-width type="staff">1.1</line-width>
      <line-width type="stem">1</line-width>
      <line-width type="tie middle">2.1</line-width>
      <line-width type="tie tip">0.5</line-width>
      <line-width type="tuplet bracket">1</line-width>
      <line-width type="wedge">1.2</line-width>
      <note-size type="cue">70</note-size>
      <note-size type="grace">70</note-size>
      <note-size type="grace-cue">49</note-size>
      </appearance>
    <music-font font-family="Leland"/>
    <word-font font-family="Edwin" font-size="10"/>
    <lyric-font font-family="Edwin" font-size="10"/>
    </defaults>
  <credit page="1">
    <credit-words default-x="85.725171" default-y="1511.049022" justify="left" valign="top" font-size="14">Violoncello, Violoncello 1</credit-words>
    </credit>
  <part-list>
    <score-part id="P1">
      <part-name>Violoncello, Violoncello 1</part-name>
      <part-abbreviation>Vc.</part-abbreviation>
      <score-instrument id="P1-I1">
        <instrument-name>Violoncello</instrument-name>
        <instrument-sound>strings.cello</instrument-sound>
        </score-instrument>
      <midi-device id="P1-I1" port="1"></midi-device>
      <midi-instrument id="P1-I1">
        <midi-channel>1</midi-channel>
        <midi-program>43</midi-program>
        <volume>78.7402</volume>
        <pan>0</pan>
        </midi-instrument>
      </score-part>
    </part-list>
  <part id="P1">
    <measure number="1" width="199.38">
      <print>
        <system-layout>
          <system-margins>
            <left-margin>50</left-margin>
            <right-margin>0</right-margin>
            </system-margins>
          <top-system-distance>170</top-system-distance>
          </system-layout>
        </print>
      <attributes>
        <divisions>4</divisions>
        <key>
          <fifths>3</fifths>
          </key>
        <time>
          <beats>4</beats>
          <beat-type>4</beat-type>
          </time>
        <clef>
          <sign>F</sign>
          <line>4</line>
          </clef>
        </attributes>
      <direction placement="above" system="also-top">
        <direction-type>
          <metronome parentheses="no" default-x="-37.68" default-y="12.69" relative-y="20">
            <beat-unit>quarter</beat-unit>
            <per-minute>100</per-minute>
            </metronome>
          </direction-type>
        <sound tempo="100"/>
        </direction>
      <note default-x="119.38" default-y="10" dynamics="110">
        <pitch>
          <step>C</step>
          <alter>1</alter>
          <octave>4</octave>
          </pitch>
        <duration>16</duration>
        <tie type="start"/>
        <voice>1</voice>
        <type>whole</type>
        <notations>
          <tied type="start"/>
          </notations>
        </note>
      </measure>
    <measure number="2" width="92.5">
      <note default-x="12.5" default-y="10" dynamics="110">
        <pitch>
          <step>C</step>
          <alter>1</alter>
          <octave>4</octave>
          </pitch>
        <duration>16</duration>
        <tie type="stop"/>
        <tie type="start"/>
        <voice>1</voice>
        <type>whole</type>
        <notations>
          <tied type="stop"/>
          <tied type="start"/>
          </notations>
        </note>
      </measure>
    <measure number="3" width="191.05">
      <note default-x="12.5" default-y="10" dynamics="110">
        <pitch>
          <step>C</step>
          <alter>1</alter>
          <octave>4</octave>
          </pitch>
        <duration>4</duration>
        <tie type="stop"/>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        <notations>
          <tied type="stop"/>
          </notations>
        </note>
      <note default-x="46.83" default-y="25" dynamics="110">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">begin</beam>
        </note>
      <note default-x="69.71" default-y="15" dynamics="110">
        <pitch>
          <step>D</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">end</beam>
        </note>
      <note default-x="92.6" default-y="5" dynamics="110">
        <pitch>
          <step>B</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">begin</beam>
        </note>
      <note default-x="115.48" default-y="0" dynamics="110">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">continue</beam>
        </note>
      <note default-x="138.37" default-y="-5" dynamics="110">
        <pitch>
          <step>G</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">continue</beam>
        </note>
      <note default-x="161.25" default-y="0" dynamics="110">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">end</beam>
        </note>
      </measure>
    <measure number="4" width="132.19">
      <note default-x="12.5" default-y="-5" dynamics="110">
        <pitch>
          <step>G</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>8</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      <note default-x="63.99" default-y="-10" dynamics="110">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        </note>
      <note default-x="86.88" default-y="-15" dynamics="110">
        <pitch>
          <step>E</step>
          <octave>3</octave>
          </pitch>
        <duration>6</duration>
        <voice>1</voice>
        <type>quarter</type>
        <dot default-x="104.87" default-y="-15"/>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="5" width="92.5">
      <note default-x="12.5" default-y="20" dynamics="110">
        <pitch>
          <step>E</step>
          <octave>4</octave>
          </pitch>
        <duration>16</duration>
        <voice>1</voice>
        <type>whole</type>
        </note>
      </measure>
    <measure number="6" width="212.3">
      <note default-x="12.5" default-y="20" dynamics="110">
        <pitch>
          <step>E</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">begin</beam>
        </note>
      <note default-x="35.39" default-y="10" dynamics="110">
        <pitch>
          <step>C</step>
          <alter>1</alter>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">continue</beam>
        </note>
      <note default-x="62.22" default-y="-5" dynamics="110">
        <pitch>
          <step>G</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <accidental>natural</accidental>
        <stem>down</stem>
        <beam number="1">continue</beam>
        </note>
      <note default-x="85.1" default-y="-10" dynamics="110">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">end</beam>
        </note>
      <note default-x="107.99" default-y="5" dynamics="110">
        <pitch>
          <step>B</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">begin</beam>
        </note>
      <note default-x="136.74" default-y="0" dynamics="110">
        <pitch>
          <step>A</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <accidental>sharp</accidental>
        <stem>down</stem>
        <beam number="1">continue</beam>
        </note>
      <note default-x="159.62" default-y="20" dynamics="110">
        <pitch>
          <step>E</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">continue</beam>
        </note>
      <note default-x="182.51" default-y="15" dynamics="110">
        <pitch>
          <step>D</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">end</beam>
        </note>
      </measure>
    <measure number="7" width="92.5">
      <note default-x="12.5" default-y="15" dynamics="110">
        <pitch>
          <step>D</step>
          <octave>4</octave>
          </pitch>
        <duration>16</duration>
        <voice>1</voice>
        <type>whole</type>
        </note>
      </measure>
    <measure number="8" width="276.8">
      <print new-system="yes">
        <system-layout>
          <system-margins>
            <left-margin>0</left-margin>
            <right-margin>0</right-margin>
            </system-margins>
          <system-distance>169</system-distance>
          </system-layout>
        </print>
      <note default-x="98.23" default-y="15" dynamics="110">
        <pitch>
          <step>D</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">begin</beam>
        </note>
      <note default-x="119.34" default-y="5" dynamics="110">
        <pitch>
          <step>B</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">continue</beam>
        </note>
      <note default-x="140.45" default-y="-10" dynamics="110">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">continue</beam>
        </note>
      <note default-x="161.57" default-y="-15" dynamics="110">
        <pitch>
          <step>E</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">end</beam>
        </note>
      <note default-x="182.68" default-y="0" dynamics="110">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">begin</beam>
        </note>
      <note default-x="203.8" default-y="-5" dynamics="110">
        <pitch>
          <step>G</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">continue</beam>
        </note>
      <note default-x="224.91" default-y="15" dynamics="110">
        <pitch>
          <step>D</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">continue</beam>
        </note>
      <note default-x="247" default-y="10" dynamics="110">
        <pitch>
          <step>C</step>
          <alter>1</alter>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">end</beam>
        </note>
      </measure>
    <measure number="9" width="124.61">
      <note default-x="12.5" default-y="10" dynamics="110">
        <pitch>
          <step>C</step>
          <alter>1</alter>
          <octave>4</octave>
          </pitch>
        <duration>12</duration>
        <voice>1</voice>
        <type>half</type>
        <dot default-x="30.49" default-y="15"/>
        <stem>down</stem>
        </note>
      <note default-x="72.72" default-y="15" dynamics="110">
        <pitch>
          <step>D</step>
          <alter>1</alter>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <accidental>sharp</accidental>
        <stem>down</stem>
        <beam number="1">begin</beam>
        </note>
      <note default-x="94.82" default-y="20" dynamics="110">
        <pitch>
          <step>E</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">end</beam>
        </note>
      </measure>
    <measure number="10" width="197.19">
      <note default-x="12.5" default-y="0" dynamics="110">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="44.17" default-y="0" dynamics="110">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>16th</type>
        <stem>down</stem>
        <beam number="1">begin</beam>
        <beam number="2">begin</beam>
        </note>
      <note default-x="62.17" default-y="5" dynamics="110">
        <pitch>
          <step>B</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>16th</type>
        <stem>down</stem>
        <beam number="1">continue</beam>
        <beam number="2">end</beam>
        </note>
      <note default-x="81.96" default-y="10" dynamics="110">
        <pitch>
          <step>C</step>
          <alter>1</alter>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">end</beam>
        </note>
      <note default-x="104.05" default-y="10" dynamics="110">
        <pitch>
          <step>C</step>
          <alter>1</alter>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">begin</beam>
        </note>
      <note default-x="125.17" default-y="5" dynamics="110">
        <pitch>
          <step>B</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">continue</beam>
        </note>
      <note default-x="146.28" default-y="5" dynamics="110">
        <pitch>
          <step>B</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">continue</beam>
        </note>
      <note default-x="167.4" default-y="0" dynamics="110">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">end</beam>
        </note>
      </measure>
    <measure number="11" width="194.41">
      <note default-x="12.5" default-y="-5" dynamics="110">
        <pitch>
          <step>G</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">begin</beam>
        </note>
      <note default-x="33.61" default-y="-10" dynamics="110">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">end</beam>
        </note>
      <note default-x="54.73" default-y="-10" dynamics="110">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>16th</type>
        <stem>down</stem>
        <beam number="1">begin</beam>
        <beam number="2">begin</beam>
        </note>
      <note default-x="72.72" default-y="-5" dynamics="110">
        <pitch>
          <step>G</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>16th</type>
        <stem>down</stem>
        <beam number="1">continue</beam>
        <beam number="2">end</beam>
        </note>
      <note default-x="90.72" default-y="0" dynamics="110">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">end</beam>
        </note>
      <note default-x="111.83" default-y="0" dynamics="110">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="143.5" default-y="-5" dynamics="110">
        <pitch>
          <step>G</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">begin</beam>
        </note>
      <note default-x="164.62" default-y="-10" dynamics="110">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">end</beam>
        </note>
      </measure>
    <measure number="12" width="86.52">
      <note default-x="12.5" default-y="-15" dynamics="110">
        <pitch>
          <step>E</step>
          <octave>3</octave>
          </pitch>
        <duration>16</duration>
        <voice>1</voice>
        <type>whole</type>
        </note>
      </measure>
    <measure number="13" width="182.89">
      <note default-x="12.5" default-y="-5" dynamics="110">
        <pitch>
          <step>G</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>8</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      <note default-x="60.01" default-y="-5" dynamics="110">
        <pitch>
          <step>G</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">begin</beam>
        </note>
      <note default-x="81.12" default-y="0" dynamics="110">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>16th</type>
        <stem>down</stem>
        <beam number="1">continue</beam>
        <beam number="2">begin</beam>
        </note>
      <note default-x="99.12" default-y="-5" dynamics="110">
        <pitch>
          <step>G</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>16th</type>
        <stem>down</stem>
        <beam number="1">end</beam>
        <beam number="2">end</beam>
        </note>
      <note default-x="117.11" default-y="-10" dynamics="110">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>16th</type>
        <stem>down</stem>
        <beam number="1">begin</beam>
        <beam number="2">begin</beam>
        </note>
      <note default-x="135.1" default-y="-5" dynamics="110">
        <pitch>
          <step>G</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>16th</type>
        <stem>down</stem>
        <beam number="1">continue</beam>
        <beam number="2">end</beam>
        </note>
      <note default-x="153.1" default-y="-15" dynamics="110">
        <pitch>
          <step>E</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">end</beam>
        </note>
      </measure>
    <measure number="14" width="182.32">
      <print new-system="yes">
        <system-layout>
          <system-margins>
            <left-margin>0</left-margin>
            <right-margin>0</right-margin>
            </system-margins>
          <system-distance>169</system-distance>
          </system-layout>
        </print>
      <note default-x="98.23" default-y="20" dynamics="110">
        <pitch>
          <step>E</step>
          <octave>4</octave>
          </pitch>
        <duration>12</duration>
        <voice>1</voice>
        <type>half</type>
        <dot default-x="116.22" default-y="25"/>
        <stem>down</stem>
        </note>
      <note default-x="152.15" default-y="-5" dynamics="110">
        <pitch>
          <step>G</step>
          <octave>3</octave>
          </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <accidental>natural</accidental>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="15" width="165.3">
      <note default-x="12.5" default-y="-10" dynamics="110">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="40.86" default-y="25" dynamics="110">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>4</octave>
          </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="69.22" default-y="25" dynamics="110">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">begin</beam>
        </note>
      <note default-x="91.32" default-y="20" dynamics="110">
        <pitch>
          <step>E</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">continue</beam>
        </note>
      <note default-x="113.41" default-y="15" dynamics="110">
        <pitch>
          <step>D</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">continue</beam>
        </note>
      <note default-x="135.5" default-y="10" dynamics="110">
        <pitch>
          <step>C</step>
          <alter>1</alter>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">end</beam>
        </note>
      </measure>
    <measure number="16" width="181.62">
      <note default-x="12.5" default-y="15" dynamics="110">
        <pitch>
          <step>D</step>
          <octave>4</octave>
          </pitch>
        <duration>8</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      <note default-x="55.04" default-y="15" dynamics="110">
        <pitch>
          <step>D</step>
          <octave>4</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>16th</type>
        <stem>down</stem>
        <beam number="1">begin</beam>
        <beam number="2">begin</beam>
        </note>
      <note default-x="77.14" default-y="10" dynamics="110">
        <pitch>
          <step>C</step>
          <alter>1</alter>
          <octave>4</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>16th</type>
        <stem>down</stem>
        <beam number="1">continue</beam>
        <beam number="2">continue</beam>
        </note>
      <note default-x="96.93" default-y="5" dynamics="110">
        <pitch>
          <step>B</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>16th</type>
        <stem>down</stem>
        <beam number="1">continue</beam>
        <beam number="2">continue</beam>
        </note>
      <note default-x="114.92" default-y="0" dynamics="110">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>16th</type>
        <stem>down</stem>
        <beam number="1">end</beam>
        <beam number="2">end</beam>
        </note>
      <note default-x="132.92" default-y="-5" dynamics="110">
        <pitch>
          <step>G</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">begin</beam>
        </note>
      <note default-x="151.82" default-y="-10" dynamics="110">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">end</beam>
        </note>
      </measure>
    <measure number="17" width="152.91">
      <note default-x="18.76" default-y="-15" dynamics="110">
        <pitch>
          <step>E</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <accidental>sharp</accidental>
        <stem>down</stem>
        <beam number="1">begin</beam>
        </note>
      <note default-x="37.66" default-y="-10" dynamics="110">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">end</beam>
        </note>
      <note default-x="56.57" default-y="-5" dynamics="110">
        <pitch>
          <step>G</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="84.93" default-y="-5" dynamics="110">
        <pitch>
          <step>G</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">begin</beam>
        </note>
      <note default-x="103.84" default-y="0" dynamics="110">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">end</beam>
        </note>
      <note default-x="122.75" default-y="5" dynamics="110">
        <pitch>
          <step>B</step>
          <octave>3</octave>
          </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="18" width="127.09">
      <note default-x="12.5" default-y="5" dynamics="110">
        <pitch>
          <step>B</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">begin</beam>
        </note>
      <note default-x="32.29" default-y="10" dynamics="110">
        <pitch>
          <step>C</step>
          <alter>1</alter>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">end</beam>
        </note>
      <note default-x="54.39" default-y="15" dynamics="110">
        <pitch>
          <step>D</step>
          <octave>4</octave>
          </pitch>
        <duration>8</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      <note default-x="96.93" default-y="10" dynamics="110">
        <pitch>
          <step>C</step>
          <alter>1</alter>
          <octave>4</octave>
          </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="19" width="173.19">
      <note default-x="12.5" default-y="5" dynamics="110">
        <pitch>
          <step>B</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">begin</beam>
        </note>
      <note default-x="31.41" default-y="0" dynamics="110">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">continue</beam>
        </note>
      <note default-x="50.32" default-y="-5" dynamics="110">
        <pitch>
          <step>G</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">continue</beam>
        </note>
      <note default-x="69.22" default-y="-10" dynamics="110">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">end</beam>
        </note>
      <note default-x="88.13" default-y="-5" dynamics="110">
        <pitch>
          <step>G</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">begin</beam>
        </note>
      <note default-x="107.04" default-y="0" dynamics="110">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>16th</type>
        <stem>down</stem>
        <beam number="1">continue</beam>
        <beam number="2">begin</beam>
        </note>
      <note default-x="125.03" default-y="5" dynamics="110">
        <pitch>
          <step>B</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>16th</type>
        <stem>down</stem>
        <beam number="1">end</beam>
        <beam number="2">end</beam>
        </note>
      <note default-x="143.03" default-y="0" dynamics="110">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="20" width="80">
      <note default-x="12.5" default-y="-10" dynamics="110">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>16</duration>
        <voice>1</voice>
        <type>whole</type>
        </note>
      </measure>
    <measure number="21" width="238.61">
      <print new-system="yes">
        <system-layout>
          <system-margins>
            <left-margin>0</left-margin>
            <right-margin>0</right-margin>
            </system-margins>
          <system-distance>169</system-distance>
          </system-layout>
        </print>
      <note default-x="98.23" default-y="0" dynamics="110">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>8</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      <note default-x="145.62" default-y="0" dynamics="110">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">begin</beam>
        </note>
      <note default-x="166.69" default-y="10" dynamics="110">
        <pitch>
          <step>C</step>
          <alter>1</alter>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">continue</beam>
        </note>
      <note default-x="187.75" default-y="5" dynamics="110">
        <pitch>
          <step>B</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">continue</beam>
        </note>
      <note default-x="208.81" default-y="0" dynamics="110">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">end</beam>
        </note>
      </measure>
    <measure number="22" width="136.03">
      <note default-x="12.5" default-y="25" dynamics="110">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>4</octave>
          </pitch>
        <duration>12</duration>
        <voice>1</voice>
        <type>half</type>
        <dot default-x="30.49" default-y="25"/>
        <stem>down</stem>
        </note>
      <note default-x="72.58" default-y="20" dynamics="110">
        <pitch>
          <step>E</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">begin</beam>
        </note>
      <note default-x="106.23" default-y="15" dynamics="110">
        <pitch>
          <step>D</step>
          <alter>1</alter>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <accidental>sharp</accidental>
        <stem>down</stem>
        <beam number="1">end</beam>
        </note>
      </measure>
    <measure number="23" width="192.59">
      <note default-x="12.5" default-y="10" dynamics="110">
        <pitch>
          <step>C</step>
          <alter>1</alter>
          <octave>4</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>16th</type>
        <stem>down</stem>
        <beam number="1">begin</beam>
        <beam number="2">begin</beam>
        </note>
      <note default-x="32.29" default-y="5" dynamics="110">
        <pitch>
          <step>B</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>16th</type>
        <stem>down</stem>
        <beam number="1">continue</beam>
        <beam number="2">end</beam>
        </note>
      <note default-x="52.09" default-y="20" dynamics="110">
        <pitch>
          <step>E</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">end</beam>
        </note>
      <note default-x="73.15" default-y="-15" dynamics="110">
        <pitch>
          <step>E</step>
          <octave>3</octave>
          </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="104.75" default-y="-10" dynamics="110">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>6</duration>
        <voice>1</voice>
        <type>quarter</type>
        <dot default-x="122.74" default-y="-5"/>
        <stem>down</stem>
        </note>
      <note default-x="144.8" default-y="-5" dynamics="110">
        <pitch>
          <step>G</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>16th</type>
        <stem>down</stem>
        <beam number="1">begin</beam>
        <beam number="2">begin</beam>
        </note>
      <note default-x="162.8" default-y="0" dynamics="110">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>16th</type>
        <stem>down</stem>
        <beam number="1">end</beam>
        <beam number="2">end</beam>
        </note>
      </measure>
    <measure number="24" width="122.82">
      <note default-x="12.5" default-y="-5" dynamics="110">
        <pitch>
          <step>G</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>6</duration>
        <voice>1</voice>
        <type>quarter</type>
        <dot default-x="30.49" default-y="-5"/>
        <stem>down</stem>
        </note>
      <note default-x="52.55" default-y="-10" dynamics="110">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        </note>
      <note default-x="73.62" default-y="-15" dynamics="110">
        <pitch>
          <step>E</step>
          <octave>3</octave>
          </pitch>
        <duration>8</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="25" width="123.44">
      <note default-x="12.5" default-y="0" dynamics="110">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>12</duration>
        <voice>1</voice>
        <type>half</type>
        <dot default-x="30.49" default-y="5"/>
        <stem>down</stem>
        </note>
      <note default-x="72.58" default-y="10" dynamics="110">
        <pitch>
          <step>C</step>
          <alter>1</alter>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">begin</beam>
        </note>
      <note default-x="93.65" default-y="5" dynamics="110">
        <pitch>
          <step>B</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">end</beam>
        </note>
      </measure>
    <measure number="26" width="124.47">
      <note default-x="12.5" default-y="5" dynamics="110">
        <pitch>
          <step>B</step>
          <octave>3</octave>
          </pitch>
        <duration>12</duration>
        <voice>1</voice>
        <type>half</type>
        <dot default-x="30.49" default-y="5"/>
        <stem>down</stem>
        </note>
      <note default-x="72.58" default-y="15" dynamics="110">
        <pitch>
          <step>D</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">begin</beam>
        </note>
      <note default-x="94.68" default-y="10" dynamics="110">
        <pitch>
          <step>C</step>
          <alter>1</alter>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">end</beam>
        </note>
      </measure>
    <measure number="27" width="124.47">
      <note default-x="12.5" default-y="10" dynamics="110">
        <pitch>
          <step>C</step>
          <alter>1</alter>
          <octave>4</octave>
          </pitch>
        <duration>12</duration>
        <voice>1</voice>
        <type>half</type>
        <dot default-x="30.49" default-y="15"/>
        <stem>down</stem>
        </note>
      <note default-x="72.58" default-y="20" dynamics="110">
        <pitch>
          <step>E</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">begin</beam>
        </note>
      <note default-x="94.68" default-y="15" dynamics="110">
        <pitch>
          <step>D</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">end</beam>
        </note>
      </measure>
    <measure number="28" width="167.42">
      <print new-system="yes">
        <system-layout>
          <system-margins>
            <left-margin>0</left-margin>
            <right-margin>0</right-margin>
            </system-margins>
          <system-distance>169</system-distance>
          </system-layout>
        </print>
      <note default-x="97.26" default-y="15" dynamics="110">
        <pitch>
          <step>D</step>
          <octave>4</octave>
          </pitch>
        <duration>16</duration>
        <voice>1</voice>
        <type>whole</type>
        </note>
      </measure>
    <measure number="29" width="147.13">
      <note default-x="12.5" default-y="-15" dynamics="110">
        <pitch>
          <step>E</step>
          <octave>3</octave>
          </pitch>
        <duration>8</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      <note default-x="57.43" default-y="-15" dynamics="110">
        <pitch>
          <step>E</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">begin</beam>
        </note>
      <note default-x="77.4" default-y="-5" dynamics="110">
        <pitch>
          <step>G</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">continue</beam>
        </note>
      <note default-x="97.37" default-y="5" dynamics="110">
        <pitch>
          <step>B</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">continue</beam>
        </note>
      <note default-x="117.34" default-y="15" dynamics="110">
        <pitch>
          <step>D</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">end</beam>
        </note>
      </measure>
    <measure number="30" width="171.35">
      <note default-x="12.5" default-y="15" dynamics="110">
        <pitch>
          <step>D</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">begin</beam>
        </note>
      <note default-x="32.47" default-y="5" dynamics="110">
        <pitch>
          <step>B</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">end</beam>
        </note>
      <note default-x="52.44" default-y="10" dynamics="110">
        <pitch>
          <step>C</step>
          <alter>1</alter>
          <octave>4</octave>
          </pitch>
        <duration>8</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      <note default-x="97.37" default-y="10" dynamics="110">
        <pitch>
          <step>C</step>
          <alter>1</alter>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">begin</beam>
        </note>
      <note default-x="119.46" default-y="15" dynamics="110">
        <pitch>
          <step>D</step>
          <octave>4</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>16th</type>
        <stem>down</stem>
        <beam number="1">continue</beam>
        <beam number="2">begin</beam>
        </note>
      <note default-x="141.56" default-y="20" dynamics="110">
        <pitch>
          <step>E</step>
          <octave>4</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>16th</type>
        <stem>down</stem>
        <beam number="1">end</beam>
        <beam number="2">end</beam>
        </note>
      </measure>
    <measure number="31" width="157.72">
      <note default-x="12.5" default-y="0" dynamics="110">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>8</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      <note default-x="57.43" default-y="0" dynamics="110">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">begin</beam>
        </note>
      <note default-x="77.4" default-y="10" dynamics="110">
        <pitch>
          <step>C</step>
          <alter>1</alter>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">continue</beam>
        </note>
      <note default-x="99.5" default-y="20" dynamics="110">
        <pitch>
          <step>E</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">continue</beam>
        </note>
      <note default-x="127.93" default-y="30" dynamics="110">
        <pitch>
          <step>G</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <accidental>natural</accidental>
        <stem>down</stem>
        <beam number="1">end</beam>
        </note>
      </measure>
    <measure number="32" width="101.21">
      <note default-x="12.5" default-y="25" dynamics="110">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>4</octave>
          </pitch>
        <duration>12</duration>
        <voice>1</voice>
        <type>half</type>
        <dot default-x="30.49" default-y="25"/>
        <stem>down</stem>
        </note>
      <note default-x="69.46" default-y="0" dynamics="110">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="33" width="129.13">
      <note default-x="12.5" default-y="-5" dynamics="110">
        <pitch>
          <step>G</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">begin</beam>
        </note>
      <note default-x="32.47" default-y="5" dynamics="110">
        <pitch>
          <step>B</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">end</beam>
        </note>
      <note default-x="52.44" default-y="15" dynamics="110">
        <pitch>
          <step>D</step>
          <octave>4</octave>
          </pitch>
        <duration>8</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      <note default-x="97.37" default-y="-10" dynamics="110">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="34" width="188.45">
      <note default-x="12.5" default-y="-15" dynamics="110">
        <pitch>
          <step>E</step>
          <octave>3</octave>
          </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="42.45" default-y="5" dynamics="110">
        <pitch>
          <step>B</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">begin</beam>
        </note>
      <note default-x="62.42" default-y="10" dynamics="110">
        <pitch>
          <step>C</step>
          <alter>1</alter>
          <octave>4</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>16th</type>
        <stem>down</stem>
        <beam number="1">continue</beam>
        <beam number="2">begin</beam>
        </note>
      <note default-x="84.52" default-y="15" dynamics="110">
        <pitch>
          <step>D</step>
          <octave>4</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>16th</type>
        <stem>down</stem>
        <beam number="1">end</beam>
        <beam number="2">end</beam>
        </note>
      <note default-x="106.61" default-y="15" dynamics="110">
        <pitch>
          <step>D</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        </note>
      <note default-x="128.71" default-y="10" dynamics="110">
        <pitch>
          <step>C</step>
          <alter>1</alter>
          <octave>4</octave>
          </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="158.66" default-y="5" dynamics="110">
        <pitch>
          <step>B</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="35" width="742.34">
      <print new-system="yes">
        <system-layout>
          <system-margins>
            <left-margin>0</left-margin>
            <right-margin>0</right-margin>
            </system-margins>
          <system-distance>169</system-distance>
          </system-layout>
        </print>
      <note default-x="98.23" default-y="0" dynamics="110">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>16th</type>
        <stem>down</stem>
        <beam number="1">begin</beam>
        <beam number="2">begin</beam>
        </note>
      <note default-x="156.62" default-y="-5" dynamics="110">
        <pitch>
          <step>G</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>16th</type>
        <stem>down</stem>
        <beam number="1">end</beam>
        <beam number="2">end</beam>
        </note>
      <note default-x="215.01" default-y="-10" dynamics="110">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="346.39" default-y="-5" dynamics="110">
        <pitch>
          <step>G</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        </note>
      <note default-x="433.98" default-y="0" dynamics="110">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="565.37" default-y="-5" dynamics="110">
        <pitch>
          <step>G</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">begin</beam>
        </note>
      <note default-x="652.96" default-y="0" dynamics="110">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">end</beam>
        </note>
      </measure>
    <measure number="36" width="320.08">
      <note default-x="12.5" default-y="0" dynamics="110">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>16</duration>
        <voice>1</voice>
        <type>whole</type>
        </note>
      <barline location="right">
        <bar-style>light-heavy</bar-style>
        </barline>
      </measure>
    </part>
  </score-partwise>
`,
  "ode_to_joy.musicxml": `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 4.0 Partwise//EN" "http://www.musicxml.org/dtds/partwise.dtd">
<score-partwise version="4.0">
<work>
  <work-title>Ode to Joy</work-title>
</work>
  <identification>
    <encoding>
      <software>MuseScore 4.5.2</software>
      <encoding-date>2025-06-27</encoding-date>
      <supports element="accidental" type="yes"/>
      <supports element="beam" type="yes"/>
      <supports element="print" attribute="new-page" type="yes" value="yes"/>
      <supports element="print" attribute="new-system" type="yes" value="yes"/>
      <supports element="stem" type="yes"/>
      </encoding>
    </identification>
  <defaults>
    <scaling>
      <millimeters>6.99911</millimeters>
      <tenths>40</tenths>
      </scaling>
    <page-layout>
      <page-height>1596.77</page-height>
      <page-width>1233.87</page-width>
      <page-margins type="even">
        <left-margin>85.7252</left-margin>
        <right-margin>85.7252</right-margin>
        <top-margin>85.7252</top-margin>
        <bottom-margin>85.7252</bottom-margin>
        </page-margins>
      <page-margins type="odd">
        <left-margin>85.7252</left-margin>
        <right-margin>85.7252</right-margin>
        <top-margin>85.7252</top-margin>
        <bottom-margin>85.7252</bottom-margin>
        </page-margins>
      </page-layout>
    <appearance>
      <line-width type="light barline">1.8</line-width>
      <line-width type="heavy barline">5.5</line-width>
      <line-width type="beam">5</line-width>
      <line-width type="bracket">4.5</line-width>
      <line-width type="dashes">1</line-width>
      <line-width type="enclosure">1</line-width>
      <line-width type="ending">1.1</line-width>
      <line-width type="extend">1</line-width>
      <line-width type="leger">1.6</line-width>
      <line-width type="pedal">1.1</line-width>
      <line-width type="octave shift">1.1</line-width>
      <line-width type="slur middle">2.1</line-width>
      <line-width type="slur tip">0.5</line-width>
      <line-width type="staff">1.1</line-width>
      <line-width type="stem">1</line-width>
      <line-width type="tie middle">2.1</line-width>
      <line-width type="tie tip">0.5</line-width>
      <line-width type="tuplet bracket">1</line-width>
      <line-width type="wedge">1.2</line-width>
      <note-size type="cue">70</note-size>
      <note-size type="grace">70</note-size>
      <note-size type="grace-cue">49</note-size>
      </appearance>
    <music-font font-family="Leland"/>
    <word-font font-family="Edwin" font-size="10"/>
    <lyric-font font-family="Edwin" font-size="10"/>
    </defaults>
  <credit page="1">
    <credit-words default-x="85.725171" default-y="1511.049022" justify="left" valign="top" font-size="14">Violoncello, Violoncello 1</credit-words>
    </credit>
  <part-list>
    <score-part id="P1">
      <part-name>Violoncello, Violoncello 1</part-name>
      <part-abbreviation>Vc.</part-abbreviation>
      <score-instrument id="P1-I1">
        <instrument-name>Violoncello</instrument-name>
        <instrument-sound>strings.cello</instrument-sound>
        </score-instrument>
      <midi-device id="P1-I1" port="1"></midi-device>
      <midi-instrument id="P1-I1">
        <midi-channel>1</midi-channel>
        <midi-program>43</midi-program>
        <volume>70.8661</volume>
        <pan>0</pan>
        </midi-instrument>
      </score-part>
    </part-list>
  <part id="P1">
    <measure number="1" width="201.34">
      <print>
        <system-layout>
          <system-margins>
            <left-margin>50</left-margin>
            <right-margin>0</right-margin>
            </system-margins>
          <top-system-distance>170</top-system-distance>
          </system-layout>
        </print>
      <attributes>
        <divisions>1</divisions>
        <key>
          <fifths>2</fifths>
          </key>
        <time>
          <beats>4</beats>
          <beat-type>4</beat-type>
          </time>
        <clef>
          <sign>F</sign>
          <line>4</line>
          </clef>
        </attributes>
      <direction placement="above" system="also-top">
        <direction-type>
          <metronome parentheses="no" default-x="-37.68" relative-y="20">
            <beat-unit>quarter</beat-unit>
            <per-minute>300</per-minute>
            </metronome>
          </direction-type>
        <sound tempo="300"/>
        </direction>
      <note default-x="109.39" default-y="-10" dynamics="77.78">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        <lyric number="1" default-x="6.5" default-y="-40" relative-y="-30">
          <syllabic>single</syllabic>
          <text>Beethoven</text>
          </lyric>
        <lyric number="1" default-x="6.5" default-y="-40" relative-y="-30">
          <syllabic>single</syllabic>
          <text>Beethoven</text>
          </lyric>
        </note>
      <note default-x="154.46" default-y="-10" dynamics="84.44">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="2" width="104.45">
      <note default-x="12.5" default-y="-5" dynamics="83.33">
        <pitch>
          <step>G</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      <note default-x="57.58" default-y="0" dynamics="85.56">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="3" width="104.45">
      <note default-x="12.5" default-y="0" dynamics="85.56">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      <note default-x="57.58" default-y="-5" dynamics="78.89">
        <pitch>
          <step>G</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="4" width="104.45">
      <note default-x="12.5" default-y="-10" dynamics="82.22">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      <note default-x="57.58" default-y="-15" dynamics="85.56">
        <pitch>
          <step>E</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="5" width="104.45">
      <note default-x="12.5" default-y="-20" dynamics="82.22">
        <pitch>
          <step>D</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      <note default-x="57.58" default-y="-20" dynamics="84.44">
        <pitch>
          <step>D</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="6" width="104.45">
      <note default-x="12.5" default-y="-15" dynamics="86.67">
        <pitch>
          <step>E</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      <note default-x="57.58" default-y="-10" dynamics="85.56">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="7" width="101.49">
      <note default-x="12.5" default-y="-10" dynamics="82.22">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>3</duration>
        <voice>1</voice>
        <type>half</type>
        <dot default-x="30.49" default-y="-5"/>
        <stem>down</stem>
        </note>
      <note default-x="69.64" default-y="-15" dynamics="76.67">
        <pitch>
          <step>E</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="8" width="82.88">
      <note default-x="12.5" default-y="-15" dynamics="88.89">
        <pitch>
          <step>E</step>
          <octave>3</octave>
          </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>whole</type>
        </note>
      </measure>
    <measure number="9" width="104.45">
      <note default-x="12.5" default-y="-10" dynamics="87.78">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      <note default-x="57.58" default-y="-10" dynamics="85.56">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="10" width="174.35">
      <print new-system="yes">
        <system-layout>
          <system-margins>
            <left-margin>0</left-margin>
            <right-margin>0</right-margin>
            </system-margins>
          <system-distance>185</system-distance>
          </system-layout>
        </print>
      <note default-x="87.27" default-y="-5" dynamics="85.56">
        <pitch>
          <step>G</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      <note default-x="129.91" default-y="0" dynamics="91.11">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="11" width="99.58">
      <note default-x="12.5" default-y="0" dynamics="87.78">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      <note default-x="55.14" default-y="-5" dynamics="82.22">
        <pitch>
          <step>G</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="12" width="99.58">
      <note default-x="12.5" default-y="-10" dynamics="86.67">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      <note default-x="55.14" default-y="-15" dynamics="85.56">
        <pitch>
          <step>E</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="13" width="99.58">
      <note default-x="12.5" default-y="-20" dynamics="83.33">
        <pitch>
          <step>D</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      <note default-x="55.14" default-y="-20" dynamics="83.33">
        <pitch>
          <step>D</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="14" width="99.58">
      <note default-x="12.5" default-y="-15" dynamics="92.22">
        <pitch>
          <step>E</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      <note default-x="55.14" default-y="-10" dynamics="88.89">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="15" width="96.78">
      <note default-x="12.5" default-y="-15" dynamics="82.22">
        <pitch>
          <step>E</step>
          <octave>3</octave>
          </pitch>
        <duration>3</duration>
        <voice>1</voice>
        <type>half</type>
        <dot default-x="30.49" default-y="-15"/>
        <stem>down</stem>
        </note>
      <note default-x="66.55" default-y="-20" dynamics="82.22">
        <pitch>
          <step>D</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="16" width="80">
      <note default-x="12.5" default-y="-20" dynamics="80">
        <pitch>
          <step>D</step>
          <octave>3</octave>
          </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>whole</type>
        </note>
      </measure>
    <measure number="17" width="99.58">
      <note default-x="12.5" default-y="-15" dynamics="88.89">
        <pitch>
          <step>E</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      <note default-x="55.14" default-y="-15" dynamics="83.33">
        <pitch>
          <step>E</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="18" width="99.58">
      <note default-x="12.5" default-y="-10" dynamics="90">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      <note default-x="55.14" default-y="-20" dynamics="78.89">
        <pitch>
          <step>D</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="19" width="113.8">
      <note default-x="12.5" default-y="-15" dynamics="86.67">
        <pitch>
          <step>E</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      <note default-x="55.14" default-y="-10" dynamics="84.44">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="83.57" default-y="-5" dynamics="91.11">
        <pitch>
          <step>G</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="20" width="172.12">
      <print new-system="yes">
        <system-layout>
          <system-margins>
            <left-margin>0</left-margin>
            <right-margin>0</right-margin>
            </system-margins>
          <system-distance>185</system-distance>
          </system-layout>
        </print>
      <note default-x="87.27" default-y="-10" dynamics="74.44">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      <note default-x="128.79" default-y="-20" dynamics="83.33">
        <pitch>
          <step>D</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="21" width="111.5">
      <note default-x="12.5" default-y="-15" dynamics="88.89">
        <pitch>
          <step>E</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      <note default-x="54.02" default-y="-10" dynamics="90">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="81.71" default-y="-5" dynamics="88.89">
        <pitch>
          <step>G</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="22" width="97.35">
      <note default-x="12.5" default-y="-10" dynamics="78.89">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      <note default-x="54.02" default-y="-15" dynamics="84.44">
        <pitch>
          <step>E</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="23" width="97.35">
      <note default-x="12.5" default-y="-20" dynamics="81.11">
        <pitch>
          <step>D</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      <note default-x="54.02" default-y="-15" dynamics="88.89">
        <pitch>
          <step>E</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="24" width="97.35">
      <note default-x="12.5" default-y="-35" dynamics="77.78">
        <pitch>
          <step>A</step>
          <octave>2</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>up</stem>
        </note>
      <note default-x="54.02" default-y="-10" dynamics="91.11">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <tie type="start"/>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        <notations>
          <tied type="start"/>
          </notations>
        </note>
      </measure>
    <measure number="25" width="97.35">
      <note default-x="12.5" default-y="-10" dynamics="91.11">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <tie type="stop"/>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        <notations>
          <tied type="stop"/>
          </notations>
        </note>
      <note default-x="54.02" default-y="-10" dynamics="85.56">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="26" width="97.35">
      <note default-x="12.5" default-y="-5" dynamics="84.44">
        <pitch>
          <step>G</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      <note default-x="54.02" default-y="0" dynamics="88.89">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="27" width="97.35">
      <note default-x="12.5" default-y="0" dynamics="84.44">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      <note default-x="54.02" default-y="-5" dynamics="84.44">
        <pitch>
          <step>G</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="28" width="97.35">
      <note default-x="12.5" default-y="-10" dynamics="84.44">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      <note default-x="54.02" default-y="-15" dynamics="88.89">
        <pitch>
          <step>E</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="29" width="97.35">
      <note default-x="12.5" default-y="-20" dynamics="84.44">
        <pitch>
          <step>D</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      <note default-x="54.02" default-y="-20" dynamics="86.67">
        <pitch>
          <step>D</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="30" width="433.03">
      <print new-system="yes">
        <system-layout>
          <system-margins>
            <left-margin>0</left-margin>
            <right-margin>0</right-margin>
            </system-margins>
          <system-distance>185</system-distance>
          </system-layout>
        </print>
      <note default-x="87.27" default-y="-15" dynamics="91.11">
        <pitch>
          <step>E</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      <note default-x="259.25" default-y="-10" dynamics="90">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="31" width="346.96">
      <note default-x="12.5" default-y="-15" dynamics="82.22">
        <pitch>
          <step>E</step>
          <octave>3</octave>
          </pitch>
        <duration>3</duration>
        <voice>1</voice>
        <type>half</type>
        <dot default-x="30.49" default-y="-15"/>
        <stem>down</stem>
        </note>
      <note default-x="230.51" default-y="-20" dynamics="82.22">
        <pitch>
          <step>D</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="32" width="282.43">
      <note default-x="12.5" default-y="-20" dynamics="76.67">
        <pitch>
          <step>D</step>
          <octave>3</octave>
          </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>whole</type>
        </note>
      <barline location="right">
        <bar-style>light-heavy</bar-style>
        </barline>
      </measure>
    </part>
  </score-partwise>
`,
  "green_sleeves.musicxml": `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 4.0 Partwise//EN" "http://www.musicxml.org/dtds/partwise.dtd">
<score-partwise version="4.0">s
<work>
  <work-title>Green Sleeves</work-title>
</work>
  <identification>
    <encoding>
      <software>MuseScore 4.5.2</software>
      <encoding-date>2025-06-27</encoding-date>
      <supports element="accidental" type="yes"/>
      <supports element="beam" type="yes"/>
      <supports element="print" attribute="new-page" type="yes" value="yes"/>
      <supports element="print" attribute="new-system" type="yes" value="yes"/>
      <supports element="stem" type="yes"/>
      </encoding>
    </identification>
  <defaults>
    <scaling>
      <millimeters>6.99911</millimeters>
      <tenths>40</tenths>
      </scaling>
    <page-layout>
      <page-height>1596.77</page-height>
      <page-width>1233.87</page-width>
      <page-margins type="even">
        <left-margin>85.7252</left-margin>
        <right-margin>85.7252</right-margin>
        <top-margin>85.7252</top-margin>
        <bottom-margin>85.7252</bottom-margin>
        </page-margins>
      <page-margins type="odd">
        <left-margin>85.7252</left-margin>
        <right-margin>85.7252</right-margin>
        <top-margin>85.7252</top-margin>
        <bottom-margin>85.7252</bottom-margin>
        </page-margins>
      </page-layout>
    <appearance>
      <line-width type="light barline">1.8</line-width>
      <line-width type="heavy barline">5.5</line-width>
      <line-width type="beam">5</line-width>
      <line-width type="bracket">4.5</line-width>
      <line-width type="dashes">1</line-width>
      <line-width type="enclosure">1</line-width>
      <line-width type="ending">1.1</line-width>
      <line-width type="extend">1</line-width>
      <line-width type="leger">1.6</line-width>
      <line-width type="pedal">1.1</line-width>
      <line-width type="octave shift">1.1</line-width>
      <line-width type="slur middle">2.1</line-width>
      <line-width type="slur tip">0.5</line-width>
      <line-width type="staff">1.1</line-width>
      <line-width type="stem">1</line-width>
      <line-width type="tie middle">2.1</line-width>
      <line-width type="tie tip">0.5</line-width>
      <line-width type="tuplet bracket">1</line-width>
      <line-width type="wedge">1.2</line-width>
      <note-size type="cue">70</note-size>
      <note-size type="grace">70</note-size>
      <note-size type="grace-cue">49</note-size>
      </appearance>
    <music-font font-family="Leland"/>
    <word-font font-family="Edwin" font-size="10"/>
    <lyric-font font-family="Edwin" font-size="10"/>
    </defaults>
  <credit page="1">
    <credit-words default-x="85.725171" default-y="1511.049022" justify="left" valign="top" font-size="14">Violoncello, Violoncello 1</credit-words>
    </credit>
  <part-list>
    <score-part id="P1">
      <part-name>Violoncello, Violoncello 1</part-name>
      <part-abbreviation>Vc.</part-abbreviation>
      <score-instrument id="P1-I1">
        <instrument-name>Violoncello</instrument-name>
        <instrument-sound>strings.cello</instrument-sound>
        </score-instrument>
      <midi-device id="P1-I1" port="1"></midi-device>
      <midi-instrument id="P1-I1">
        <midi-channel>1</midi-channel>
        <midi-program>43</midi-program>
        <volume>78.7402</volume>
        <pan>0</pan>
        </midi-instrument>
      </score-part>
    </part-list>
  <part id="P1">
    <measure number="1" width="0">
      <print>
        <system-layout>
          <system-margins>
            <left-margin>50</left-margin>
            <right-margin>0</right-margin>
            </system-margins>
          <top-system-distance>170</top-system-distance>
          </system-layout>
        </print>
      <attributes>
        <divisions>1</divisions>
        <key>
          <fifths>0</fifths>
          </key>
        <time>
          <beats>3</beats>
          <beat-type>4</beat-type>
          </time>
        <clef>
          <sign>F</sign>
          <line>4</line>
          </clef>
        <measure-style>
          <multiple-rest>1</multiple-rest>
          </measure-style>
        </attributes>
      <direction placement="above" system="also-top">
        <direction-type>
          <metronome parentheses="no" relative-y="20">
            <beat-unit>quarter</beat-unit>
            <per-minute>200</per-minute>
            </metronome>
          </direction-type>
        <sound tempo="200"/>
        </direction>
      <note default-x="0" default-y="0">
        <rest measure="yes"/>
        <duration>3</duration>
        <voice>1</voice>
        </note>
      </measure>
    <measure number="2" width="91.39">
      <note default-x="12.5" default-y="-20">
        <rest/>
        <duration>1</duration>
        <voice>1</voice>
        <type>quarter</type>
        </note>
      <note default-x="43.34" default-y="0" dynamics="71.11">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="3" width="80">
      <note default-x="12.5" default-y="10" dynamics="85.56">
        <pitch>
          <step>C</step>
          <octave>4</octave>
          </pitch>
        <duration>3</duration>
        <tie type="start"/>
        <voice>1</voice>
        <type>half</type>
        <dot default-x="30.49" default-y="15"/>
        <stem>down</stem>
        <notations>
          <tied type="start"/>
          </notations>
        </note>
      </measure>
    <measure number="4" width="91.39">
      <note default-x="12.5" default-y="10" dynamics="85.56">
        <pitch>
          <step>C</step>
          <octave>4</octave>
          </pitch>
        <duration>1</duration>
        <tie type="stop"/>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        <notations>
          <tied type="stop"/>
          </notations>
        </note>
      <note default-x="43.34" default-y="15" dynamics="86.67">
        <pitch>
          <step>D</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="5" width="80">
      <note default-x="12.5" default-y="20" dynamics="84.44">
        <pitch>
          <step>E</step>
          <octave>4</octave>
          </pitch>
        <duration>3</duration>
        <voice>1</voice>
        <type>half</type>
        <dot default-x="30.49" default-y="25"/>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="6" width="91.39">
      <note default-x="12.5" default-y="25" dynamics="84.44">
        <pitch>
          <step>F</step>
          <octave>4</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="43.34" default-y="20" dynamics="75.56">
        <pitch>
          <step>E</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="7" width="80">
      <note default-x="12.5" default-y="15" dynamics="72.22">
        <pitch>
          <step>D</step>
          <octave>4</octave>
          </pitch>
        <duration>3</duration>
        <tie type="start"/>
        <voice>1</voice>
        <type>half</type>
        <dot default-x="30.49" default-y="15"/>
        <stem>down</stem>
        <notations>
          <tied type="start"/>
          </notations>
        </note>
      </measure>
    <measure number="8" width="91.39">
      <note default-x="12.5" default-y="15" dynamics="72.22">
        <pitch>
          <step>D</step>
          <octave>4</octave>
          </pitch>
        <duration>1</duration>
        <tie type="stop"/>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        <notations>
          <tied type="stop"/>
          </notations>
        </note>
      <note default-x="43.34" default-y="5" dynamics="80">
        <pitch>
          <step>B</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="9" width="80">
      <note default-x="12.5" default-y="-5" dynamics="72.22">
        <pitch>
          <step>G</step>
          <octave>3</octave>
          </pitch>
        <duration>3</duration>
        <voice>1</voice>
        <type>half</type>
        <dot default-x="30.49" default-y="-5"/>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="10" width="91.39">
      <note default-x="12.5" default-y="0" dynamics="78.89">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="43.34" default-y="5" dynamics="77.78">
        <pitch>
          <step>B</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="11" width="80">
      <note default-x="12.5" default-y="10" dynamics="80">
        <pitch>
          <step>C</step>
          <octave>4</octave>
          </pitch>
        <duration>3</duration>
        <tie type="start"/>
        <voice>1</voice>
        <type>half</type>
        <dot default-x="30.49" default-y="15"/>
        <stem>down</stem>
        <notations>
          <tied type="start"/>
          </notations>
        </note>
      </measure>
    <measure number="12" width="134.82">
      <print new-system="yes">
        <system-layout>
          <system-margins>
            <left-margin>0</left-margin>
            <right-margin>0</right-margin>
            </system-margins>
          <system-distance>169</system-distance>
          </system-layout>
        </print>
      <note default-x="59.06" default-y="10" dynamics="80">
        <pitch>
          <step>C</step>
          <octave>4</octave>
          </pitch>
        <duration>1</duration>
        <tie type="stop"/>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        <notations>
          <tied type="stop"/>
          </notations>
        </note>
      <note default-x="88.64" default-y="0" dynamics="74.44">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="13" width="80">
      <note default-x="12.5" default-y="0" dynamics="77.78">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>3</duration>
        <voice>1</voice>
        <type>half</type>
        <dot default-x="30.49" default-y="5"/>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="14" width="94.52">
      <note default-x="18.76" default-y="-5" dynamics="76.67">
        <pitch>
          <step>G</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>quarter</type>
        <accidental>sharp</accidental>
        <stem>down</stem>
        </note>
      <note default-x="48.34" default-y="0" dynamics="82.22">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="15" width="80">
      <note default-x="12.5" default-y="5" dynamics="81.11">
        <pitch>
          <step>B</step>
          <octave>3</octave>
          </pitch>
        <duration>3</duration>
        <tie type="start"/>
        <voice>1</voice>
        <type>half</type>
        <dot default-x="30.49" default-y="5"/>
        <stem>down</stem>
        <notations>
          <tied type="start"/>
          </notations>
        </note>
      </measure>
    <measure number="16" width="88.27">
      <note default-x="12.5" default-y="5" dynamics="81.11">
        <pitch>
          <step>B</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <tie type="stop"/>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        <notations>
          <tied type="stop"/>
          </notations>
        </note>
      <note default-x="42.09" default-y="-5" dynamics="72.22">
        <pitch>
          <step>G</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <accidental>sharp</accidental>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="17" width="80">
      <note default-x="12.5" default-y="-15" dynamics="70">
        <pitch>
          <step>E</step>
          <octave>3</octave>
          </pitch>
        <duration>3</duration>
        <tie type="start"/>
        <voice>1</voice>
        <type>half</type>
        <dot default-x="30.49" default-y="-15"/>
        <stem>down</stem>
        <notations>
          <tied type="start"/>
          </notations>
        </note>
      </measure>
    <measure number="18" width="88.27">
      <note default-x="12.5" default-y="-15" dynamics="70">
        <pitch>
          <step>E</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <tie type="stop"/>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        <notations>
          <tied type="stop"/>
          </notations>
        </note>
      <note default-x="42.09" default-y="0" dynamics="83.33">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="19" width="80">
      <note default-x="12.5" default-y="10" dynamics="88.89">
        <pitch>
          <step>C</step>
          <octave>4</octave>
          </pitch>
        <duration>3</duration>
        <tie type="start"/>
        <voice>1</voice>
        <type>half</type>
        <dot default-x="30.49" default-y="15"/>
        <stem>down</stem>
        <notations>
          <tied type="start"/>
          </notations>
        </note>
      </measure>
    <measure number="20" width="88.27">
      <note default-x="12.5" default-y="10" dynamics="88.89">
        <pitch>
          <step>C</step>
          <octave>4</octave>
          </pitch>
        <duration>1</duration>
        <tie type="stop"/>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        <notations>
          <tied type="stop"/>
          </notations>
        </note>
      <note default-x="42.09" default-y="15" dynamics="88.89">
        <pitch>
          <step>D</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="21" width="80">
      <note default-x="12.5" default-y="20" dynamics="83.33">
        <pitch>
          <step>E</step>
          <octave>4</octave>
          </pitch>
        <duration>3</duration>
        <voice>1</voice>
        <type>half</type>
        <dot default-x="30.49" default-y="25"/>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="22" width="88.27">
      <note default-x="12.5" default-y="25" dynamics="83.33">
        <pitch>
          <step>F</step>
          <octave>4</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="42.09" default-y="20" dynamics="78.89">
        <pitch>
          <step>E</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="23" width="80">
      <note default-x="12.5" default-y="15" dynamics="78.89">
        <pitch>
          <step>D</step>
          <octave>4</octave>
          </pitch>
        <duration>3</duration>
        <tie type="start"/>
        <voice>1</voice>
        <type>half</type>
        <dot default-x="30.49" default-y="15"/>
        <stem>down</stem>
        <notations>
          <tied type="start"/>
          </notations>
        </note>
      </measure>
    <measure number="24" width="138.96">
      <print new-system="yes">
        <system-layout>
          <system-margins>
            <left-margin>0</left-margin>
            <right-margin>0</right-margin>
            </system-margins>
          <system-distance>169</system-distance>
          </system-layout>
        </print>
      <note default-x="59.06" default-y="15" dynamics="78.89">
        <pitch>
          <step>D</step>
          <octave>4</octave>
          </pitch>
        <duration>1</duration>
        <tie type="stop"/>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        <notations>
          <tied type="stop"/>
          </notations>
        </note>
      <note default-x="90.3" default-y="5" dynamics="74.44">
        <pitch>
          <step>B</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="25" width="80">
      <note default-x="12.5" default-y="-5" dynamics="75.56">
        <pitch>
          <step>G</step>
          <octave>3</octave>
          </pitch>
        <duration>3</duration>
        <voice>1</voice>
        <type>half</type>
        <dot default-x="30.49" default-y="-5"/>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="26" width="92.4">
      <note default-x="12.5" default-y="0" dynamics="81.11">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="43.74" default-y="5" dynamics="82.22">
        <pitch>
          <step>B</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="27" width="80">
      <note default-x="12.5" default-y="10" dynamics="80">
        <pitch>
          <step>C</step>
          <octave>4</octave>
          </pitch>
        <duration>3</duration>
        <voice>1</voice>
        <type>half</type>
        <dot default-x="30.49" default-y="15"/>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="28" width="92.4">
      <note default-x="12.5" default-y="5" dynamics="72.22">
        <pitch>
          <step>B</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="43.74" default-y="0" dynamics="75.56">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="29" width="80">
      <note default-x="18.76" default-y="-5" dynamics="78.89">
        <pitch>
          <step>G</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>3</duration>
        <voice>1</voice>
        <type>half</type>
        <dot default-x="36.75" default-y="-5"/>
        <accidental>sharp</accidental>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="30" width="98.66">
      <note default-x="18.76" default-y="-10" dynamics="78.89">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>quarter</type>
        <accidental>sharp</accidental>
        <stem>down</stem>
        </note>
      <note default-x="50" default-y="-5" dynamics="76.67">
        <pitch>
          <step>G</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <accidental>sharp</accidental>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="31" width="80">
      <note default-x="12.5" default-y="0" dynamics="81.11">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>3</duration>
        <tie type="start"/>
        <voice>1</voice>
        <type>half</type>
        <dot default-x="30.49" default-y="5"/>
        <stem>down</stem>
        <notations>
          <tied type="start"/>
          </notations>
        </note>
      </measure>
    <measure number="32" width="80">
      <note default-x="12.5" default-y="0" dynamics="81.11">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>3</duration>
        <tie type="stop"/>
        <voice>1</voice>
        <type>half</type>
        <dot default-x="30.49" default-y="5"/>
        <stem>down</stem>
        <notations>
          <tied type="stop"/>
          </notations>
        </note>
      </measure>
    <measure number="33" width="80">
      <note default-x="12.5" default-y="0" dynamics="74.44">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>3</duration>
        <tie type="start"/>
        <voice>1</voice>
        <type>half</type>
        <dot default-x="30.49" default-y="5"/>
        <stem>down</stem>
        <notations>
          <tied type="start"/>
          </notations>
        </note>
      </measure>
    <measure number="34" width="80">
      <note default-x="12.5" default-y="0" dynamics="74.44">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>3</duration>
        <tie type="stop"/>
        <voice>1</voice>
        <type>half</type>
        <dot default-x="30.49" default-y="5"/>
        <stem>down</stem>
        <notations>
          <tied type="stop"/>
          </notations>
        </note>
      </measure>
    <measure number="35" width="80">
      <note default-x="12.5" default-y="30" dynamics="133.33">
        <pitch>
          <step>G</step>
          <octave>4</octave>
          </pitch>
        <duration>3</duration>
        <tie type="start"/>
        <voice>1</voice>
        <type>half</type>
        <dot default-x="30.49" default-y="35"/>
        <stem>down</stem>
        <notations>
          <tied type="start"/>
          </notations>
        </note>
      </measure>
    <measure number="36" width="123.26">
      <print new-system="yes">
        <system-layout>
          <system-margins>
            <left-margin>0</left-margin>
            <right-margin>0</right-margin>
            </system-margins>
          <system-distance>169</system-distance>
          </system-layout>
        </print>
      <note default-x="59.06" default-y="30" dynamics="133.33">
        <pitch>
          <step>G</step>
          <octave>4</octave>
          </pitch>
        <duration>3</duration>
        <tie type="stop"/>
        <voice>1</voice>
        <type>half</type>
        <dot default-x="77.05" default-y="35"/>
        <stem>down</stem>
        <notations>
          <tied type="stop"/>
          </notations>
        </note>
      </measure>
    <measure number="37" width="80">
      <note default-x="12.5" default-y="30" dynamics="116.67">
        <pitch>
          <step>G</step>
          <octave>4</octave>
          </pitch>
        <duration>3</duration>
        <voice>1</voice>
        <type>half</type>
        <dot default-x="30.49" default-y="35"/>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="38" width="90.58">
      <note default-x="12.5" default-y="25" dynamics="107.78">
        <pitch>
          <step>F</step>
          <octave>4</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="43.01" default-y="20" dynamics="107.78">
        <pitch>
          <step>E</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="39" width="80">
      <note default-x="12.5" default-y="15" dynamics="104.44">
        <pitch>
          <step>D</step>
          <octave>4</octave>
          </pitch>
        <duration>3</duration>
        <tie type="start"/>
        <voice>1</voice>
        <type>half</type>
        <dot default-x="30.49" default-y="15"/>
        <stem>down</stem>
        <notations>
          <tied type="start"/>
          </notations>
        </note>
      </measure>
    <measure number="40" width="90.58">
      <note default-x="12.5" default-y="15" dynamics="104.44">
        <pitch>
          <step>D</step>
          <octave>4</octave>
          </pitch>
        <duration>1</duration>
        <tie type="stop"/>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        <notations>
          <tied type="stop"/>
          </notations>
        </note>
      <note default-x="43.01" default-y="5" dynamics="105.56">
        <pitch>
          <step>B</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="41" width="80">
      <note default-x="12.5" default-y="-5" dynamics="95.56">
        <pitch>
          <step>G</step>
          <octave>3</octave>
          </pitch>
        <duration>3</duration>
        <voice>1</voice>
        <type>half</type>
        <dot default-x="30.49" default-y="-5"/>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="42" width="90.58">
      <note default-x="12.5" default-y="0" dynamics="110">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="43.01" default-y="5" dynamics="111.11">
        <pitch>
          <step>B</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="43" width="80">
      <note default-x="12.5" default-y="10" dynamics="112.22">
        <pitch>
          <step>C</step>
          <octave>4</octave>
          </pitch>
        <duration>3</duration>
        <tie type="start"/>
        <voice>1</voice>
        <type>half</type>
        <dot default-x="30.49" default-y="15"/>
        <stem>down</stem>
        <notations>
          <tied type="start"/>
          </notations>
        </note>
      </measure>
    <measure number="44" width="90.58">
      <note default-x="12.5" default-y="10" dynamics="112.22">
        <pitch>
          <step>C</step>
          <octave>4</octave>
          </pitch>
        <duration>1</duration>
        <tie type="stop"/>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        <notations>
          <tied type="stop"/>
          </notations>
        </note>
      <note default-x="43.01" default-y="0" dynamics="103.33">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="45" width="80">
      <note default-x="12.5" default-y="0" dynamics="113.33">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>3</duration>
        <voice>1</voice>
        <type>half</type>
        <dot default-x="30.49" default-y="5"/>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="46" width="96.84">
      <note default-x="18.76" default-y="-5" dynamics="107.78">
        <pitch>
          <step>G</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>quarter</type>
        <accidental>sharp</accidental>
        <stem>down</stem>
        </note>
      <note default-x="49.27" default-y="0" dynamics="108.89">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="47" width="80">
      <note default-x="12.5" default-y="5" dynamics="113.33">
        <pitch>
          <step>B</step>
          <octave>3</octave>
          </pitch>
        <duration>3</duration>
        <tie type="start"/>
        <voice>1</voice>
        <type>half</type>
        <dot default-x="30.49" default-y="5"/>
        <stem>down</stem>
        <notations>
          <tied type="start"/>
          </notations>
        </note>
      </measure>
    <measure number="48" width="140.52">
      <print new-system="yes">
        <system-layout>
          <system-margins>
            <left-margin>0</left-margin>
            <right-margin>0</right-margin>
            </system-margins>
          <system-distance>169</system-distance>
          </system-layout>
        </print>
      <note default-x="59.06" default-y="5" dynamics="113.33">
        <pitch>
          <step>B</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <tie type="stop"/>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        <notations>
          <tied type="stop"/>
          </notations>
        </note>
      <note default-x="90.92" default-y="-5" dynamics="96.67">
        <pitch>
          <step>G</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <accidental>sharp</accidental>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="49" width="80">
      <note default-x="12.5" default-y="-15" dynamics="87.78">
        <pitch>
          <step>E</step>
          <octave>3</octave>
          </pitch>
        <duration>3</duration>
        <tie type="start"/>
        <voice>1</voice>
        <type>half</type>
        <dot default-x="30.49" default-y="-15"/>
        <stem>down</stem>
        <notations>
          <tied type="start"/>
          </notations>
        </note>
      </measure>
    <measure number="50" width="80">
      <note default-x="12.5" default-y="-15" dynamics="87.78">
        <pitch>
          <step>E</step>
          <octave>3</octave>
          </pitch>
        <duration>3</duration>
        <tie type="stop"/>
        <voice>1</voice>
        <type>half</type>
        <dot default-x="30.49" default-y="-15"/>
        <stem>down</stem>
        <notations>
          <tied type="stop"/>
          </notations>
        </note>
      </measure>
    <measure number="51" width="80">
      <note default-x="12.5" default-y="30" dynamics="137.78">
        <pitch>
          <step>G</step>
          <octave>4</octave>
          </pitch>
        <duration>3</duration>
        <tie type="start"/>
        <voice>1</voice>
        <type>half</type>
        <dot default-x="30.49" default-y="35"/>
        <stem>down</stem>
        <notations>
          <tied type="start"/>
          </notations>
        </note>
      </measure>
    <measure number="52" width="80">
      <note default-x="12.5" default-y="30" dynamics="137.78">
        <pitch>
          <step>G</step>
          <octave>4</octave>
          </pitch>
        <duration>3</duration>
        <tie type="stop"/>
        <voice>1</voice>
        <type>half</type>
        <dot default-x="30.49" default-y="35"/>
        <stem>down</stem>
        <notations>
          <tied type="stop"/>
          </notations>
        </note>
      </measure>
    <measure number="53" width="80">
      <note default-x="12.5" default-y="30" dynamics="110">
        <pitch>
          <step>G</step>
          <octave>4</octave>
          </pitch>
        <duration>3</duration>
        <voice>1</voice>
        <type>half</type>
        <dot default-x="30.49" default-y="35"/>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="54" width="93.97">
      <note default-x="12.5" default-y="25" dynamics="100">
        <pitch>
          <step>F</step>
          <octave>4</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="44.37" default-y="20" dynamics="101.11">
        <pitch>
          <step>E</step>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="55" width="80">
      <note default-x="12.5" default-y="15" dynamics="100">
        <pitch>
          <step>D</step>
          <octave>4</octave>
          </pitch>
        <duration>3</duration>
        <tie type="start"/>
        <voice>1</voice>
        <type>half</type>
        <dot default-x="30.49" default-y="15"/>
        <stem>down</stem>
        <notations>
          <tied type="start"/>
          </notations>
        </note>
      </measure>
    <measure number="56" width="93.97">
      <note default-x="12.5" default-y="15" dynamics="100">
        <pitch>
          <step>D</step>
          <octave>4</octave>
          </pitch>
        <duration>1</duration>
        <tie type="stop"/>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        <notations>
          <tied type="stop"/>
          </notations>
        </note>
      <note default-x="44.37" default-y="5" dynamics="103.33">
        <pitch>
          <step>B</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="57" width="80">
      <note default-x="12.5" default-y="-5" dynamics="100">
        <pitch>
          <step>G</step>
          <octave>3</octave>
          </pitch>
        <duration>3</duration>
        <voice>1</voice>
        <type>half</type>
        <dot default-x="30.49" default-y="-5"/>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="58" width="93.97">
      <note default-x="12.5" default-y="0" dynamics="108.89">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="44.37" default-y="5" dynamics="110">
        <pitch>
          <step>B</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="59" width="80">
      <note default-x="12.5" default-y="10" dynamics="114.44">
        <pitch>
          <step>C</step>
          <octave>4</octave>
          </pitch>
        <duration>3</duration>
        <voice>1</voice>
        <type>half</type>
        <dot default-x="30.49" default-y="15"/>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="60" width="214.92">
      <print new-system="yes">
        <system-layout>
          <system-margins>
            <left-margin>0</left-margin>
            <right-margin>0</right-margin>
            </system-margins>
          <system-distance>169</system-distance>
          </system-layout>
        </print>
      <note default-x="59.06" default-y="5" dynamics="108.89">
        <pitch>
          <step>B</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="120.68" default-y="0" dynamics="104.44">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="61" width="137.74">
      <note default-x="18.76" default-y="-5" dynamics="108.89">
        <pitch>
          <step>G</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>3</duration>
        <voice>1</voice>
        <type>half</type>
        <dot default-x="36.75" default-y="-5"/>
        <accidental>sharp</accidental>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="62" width="174.62">
      <note default-x="18.76" default-y="-10" dynamics="97.78">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>quarter</type>
        <accidental>sharp</accidental>
        <stem>down</stem>
        </note>
      <note default-x="80.38" default-y="-5" dynamics="100">
        <pitch>
          <step>G</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>half</type>
        <accidental>sharp</accidental>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="63" width="131.48">
      <note default-x="12.5" default-y="0" dynamics="88.89">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>3</duration>
        <tie type="start"/>
        <voice>1</voice>
        <type>half</type>
        <dot default-x="30.49" default-y="5"/>
        <stem>down</stem>
        <notations>
          <tied type="start"/>
          </notations>
        </note>
      </measure>
    <measure number="64" width="131.48">
      <note default-x="12.5" default-y="0" dynamics="88.89">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>3</duration>
        <tie type="stop"/>
        <voice>1</voice>
        <type>half</type>
        <dot default-x="30.49" default-y="5"/>
        <stem>down</stem>
        <notations>
          <tied type="stop"/>
          </notations>
        </note>
      </measure>
    <measure number="65" width="131.48">
      <note default-x="12.5" default-y="0" dynamics="87.78">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>3</duration>
        <tie type="start"/>
        <voice>1</voice>
        <type>half</type>
        <dot default-x="30.49" default-y="5"/>
        <stem>down</stem>
        <notations>
          <tied type="start"/>
          </notations>
        </note>
      </measure>
    <measure number="66" width="140.68">
      <note default-x="12.5" default-y="0" dynamics="87.78">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>3</duration>
        <tie type="stop"/>
        <voice>1</voice>
        <type>half</type>
        <dot default-x="30.49" default-y="5"/>
        <stem>down</stem>
        <notations>
          <tied type="stop"/>
          </notations>
        </note>
      <barline location="right">
        <bar-style>light-heavy</bar-style>
        </barline>
      </measure>
    </part>
  </score-partwise>
`,
  "go_tell_aunt_rhody.musicxml": `
    <?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 4.0 Partwise//EN" "http://www.musicxml.org/dtds/partwise.dtd">
<score-partwise version="4.0">
  <identification>
    <encoding>
      <software>MuseScore 4.5.2</software>
      <encoding-date>2025-10-05</encoding-date>
      <supports element="accidental" type="yes"/>
      <supports element="beam" type="yes"/>
      <supports element="print" attribute="new-page" type="yes" value="yes"/>
      <supports element="print" attribute="new-system" type="yes" value="yes"/>
      <supports element="stem" type="yes"/>
      </encoding>
    </identification>
  <defaults>
    <scaling>
      <millimeters>6.99911</millimeters>
      <tenths>40</tenths>
      </scaling>
    <page-layout>
      <page-height>1596.77</page-height>
      <page-width>1233.87</page-width>
      <page-margins type="even">
        <left-margin>85.7252</left-margin>
        <right-margin>85.7252</right-margin>
        <top-margin>85.7252</top-margin>
        <bottom-margin>85.7252</bottom-margin>
        </page-margins>
      <page-margins type="odd">
        <left-margin>85.7252</left-margin>
        <right-margin>85.7252</right-margin>
        <top-margin>85.7252</top-margin>
        <bottom-margin>85.7252</bottom-margin>
        </page-margins>
      </page-layout>
    <appearance>
      <line-width type="light barline">1.8</line-width>
      <line-width type="heavy barline">5.5</line-width>
      <line-width type="beam">5</line-width>
      <line-width type="bracket">4.5</line-width>
      <line-width type="dashes">1</line-width>
      <line-width type="enclosure">1</line-width>
      <line-width type="ending">1.1</line-width>
      <line-width type="extend">1</line-width>
      <line-width type="leger">1.6</line-width>
      <line-width type="pedal">1.1</line-width>
      <line-width type="octave shift">1.1</line-width>
      <line-width type="slur middle">2.1</line-width>
      <line-width type="slur tip">0.5</line-width>
      <line-width type="staff">1.1</line-width>
      <line-width type="stem">1</line-width>
      <line-width type="tie middle">2.1</line-width>
      <line-width type="tie tip">0.5</line-width>
      <line-width type="tuplet bracket">1</line-width>
      <line-width type="wedge">1.2</line-width>
      <note-size type="cue">70</note-size>
      <note-size type="grace">70</note-size>
      <note-size type="grace-cue">49</note-size>
      </appearance>
    <music-font font-family="Leland"/>
    <word-font font-family="Edwin" font-size="10"/>
    <lyric-font font-family="Edwin" font-size="10"/>
    </defaults>
  <part-list>
    <score-part id="P1">
      <part-name>Violoncello, Violoncello</part-name>
      <part-abbreviation>Vc.</part-abbreviation>
      <score-instrument id="P1-I1">
        <instrument-name>Violoncello</instrument-name>
        <instrument-sound>strings.cello</instrument-sound>
        </score-instrument>
      <midi-device id="P1-I1" port="1"></midi-device>
      <midi-instrument id="P1-I1">
        <midi-channel>1</midi-channel>
        <midi-program>43</midi-program>
        <volume>78.7402</volume>
        <pan>0</pan>
        </midi-instrument>
      </score-part>
    </part-list>
  <part id="P1">
    <measure number="1" width="166.44">
      <print>
        <system-layout>
          <system-margins>
            <left-margin>50</left-margin>
            <right-margin>0</right-margin>
            </system-margins>
          <top-system-distance>70</top-system-distance>
          </system-layout>
        </print>
      <attributes>
        <divisions>2</divisions>
        <key>
          <fifths>1</fifths>
          </key>
        <time>
          <beats>4</beats>
          <beat-type>4</beat-type>
          </time>
        <clef>
          <sign>F</sign>
          <line>4</line>
          </clef>
        </attributes>
      <direction placement="above" system="only-top">
        <direction-type>
          <metronome parentheses="no" default-x="-37.68" relative-y="20">
            <beat-unit>quarter</beat-unit>
            <per-minute>50</per-minute>
            </metronome>
          </direction-type>
        <sound tempo="50"/>
        </direction>
      <note default-x="115.04" default-y="-10">
        <rest measure="yes"/>
        <duration>8</duration>
        <voice>1</voice>
        </note>
      </measure>
    <measure number="2" width="141.81">
      <note default-x="12.5" default-y="-10" dynamics="111.11">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="41.93" default-y="-10" dynamics="111.11">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">begin</beam>
        </note>
      <note default-x="61.54" default-y="-15" dynamics="111.11">
        <pitch>
          <step>E</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">end</beam>
        </note>
      <note default-x="81.16" default-y="-20" dynamics="111.11">
        <pitch>
          <step>D</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="110.59" default-y="-20" dynamics="111.11">
        <pitch>
          <step>D</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="3" width="141.81">
      <note default-x="12.5" default-y="-15" dynamics="111.11">
        <pitch>
          <step>E</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="41.93" default-y="-15" dynamics="111.11">
        <pitch>
          <step>E</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="71.35" default-y="-10" dynamics="111.11">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">begin</beam>
        </note>
      <note default-x="90.97" default-y="-15" dynamics="111.11">
        <pitch>
          <step>E</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">end</beam>
        </note>
      <note default-x="110.59" default-y="-20" dynamics="111.11">
        <pitch>
          <step>D</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="4" width="141.81">
      <note default-x="12.5" default-y="0" dynamics="111.11">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="41.93" default-y="0" dynamics="111.11">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">begin</beam>
        </note>
      <note default-x="61.54" default-y="-5" dynamics="111.11">
        <pitch>
          <step>G</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">end</beam>
        </note>
      <note default-x="81.16" default-y="-10" dynamics="111.11">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="110.59" default-y="-10" dynamics="111.11">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="5" width="136.91">
      <note default-x="12.5" default-y="-15" dynamics="111.11">
        <pitch>
          <step>E</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">begin</beam>
        </note>
      <note default-x="32.12" default-y="-20" dynamics="111.11">
        <pitch>
          <step>D</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">continue</beam>
        </note>
      <note default-x="51.74" default-y="-15" dynamics="111.11">
        <pitch>
          <step>E</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">continue</beam>
        </note>
      <note default-x="71.35" default-y="-10" dynamics="111.11">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">end</beam>
        </note>
      <note default-x="90.97" default-y="-20" dynamics="111.11">
        <pitch>
          <step>D</step>
          <octave>3</octave>
          </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="6" width="141.81">
      <note default-x="12.5" default-y="-10" dynamics="111.11">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="41.93" default-y="-10" dynamics="111.11">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">begin</beam>
        </note>
      <note default-x="61.54" default-y="-5" dynamics="111.11">
        <pitch>
          <step>G</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">end</beam>
        </note>
      <note default-x="81.16" default-y="0" dynamics="111.11">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="110.59" default-y="0" dynamics="111.11">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="7" width="141.81">
      <note default-x="12.5" default-y="5" dynamics="111.11">
        <pitch>
          <step>B</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="41.93" default-y="5" dynamics="111.11">
        <pitch>
          <step>B</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="71.35" default-y="0" dynamics="111.11">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">begin</beam>
        </note>
      <note default-x="90.97" default-y="-5" dynamics="111.11">
        <pitch>
          <step>G</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">end</beam>
        </note>
      <note default-x="110.59" default-y="-10" dynamics="111.11">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="8" width="234.74">
      <print new-system="yes">
        <system-layout>
          <system-margins>
            <left-margin>0</left-margin>
            <right-margin>0</right-margin>
            </system-margins>
          <system-distance>205</system-distance>
          </system-layout>
        </print>
      <note default-x="76.31" default-y="-10" dynamics="111.11">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="112.46" default-y="-10" dynamics="111.11">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">begin</beam>
        </note>
      <note default-x="136.55" default-y="-5" dynamics="111.11">
        <pitch>
          <step>G</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">end</beam>
        </note>
      <note default-x="160.65" default-y="0" dynamics="111.11">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="196.79" default-y="0" dynamics="111.11">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="9" width="140.81">
      <note default-x="12.5" default-y="5" dynamics="111.11">
        <pitch>
          <step>B</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="48.64" default-y="5" dynamics="111.11">
        <pitch>
          <step>B</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="84.79" default-y="0" dynamics="111.11">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="10" width="170.93">
      <note default-x="12.5" default-y="-10" dynamics="111.11">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="48.64" default-y="-10" dynamics="111.11">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">begin</beam>
        </note>
      <note default-x="72.74" default-y="-15" dynamics="111.11">
        <pitch>
          <step>E</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">end</beam>
        </note>
      <note default-x="96.84" default-y="-20" dynamics="111.11">
        <pitch>
          <step>D</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="132.98" default-y="-20" dynamics="111.11">
        <pitch>
          <step>D</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="11" width="170.93">
      <note default-x="12.5" default-y="-15" dynamics="111.11">
        <pitch>
          <step>E</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="48.64" default-y="-15" dynamics="111.11">
        <pitch>
          <step>E</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="84.79" default-y="-10" dynamics="111.11">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">begin</beam>
        </note>
      <note default-x="108.88" default-y="-15" dynamics="111.11">
        <pitch>
          <step>E</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">end</beam>
        </note>
      <note default-x="132.98" default-y="-20" dynamics="111.11">
        <pitch>
          <step>D</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="12" width="170.93">
      <note default-x="12.5" default-y="0" dynamics="111.11">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="48.64" default-y="0" dynamics="111.11">
        <pitch>
          <step>A</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">begin</beam>
        </note>
      <note default-x="72.74" default-y="-5" dynamics="111.11">
        <pitch>
          <step>G</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">end</beam>
        </note>
      <note default-x="96.84" default-y="-10" dynamics="111.11">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="132.98" default-y="-10" dynamics="111.11">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="13" width="174.1">
      <note default-x="12.5" default-y="-15" dynamics="111.11">
        <pitch>
          <step>E</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">begin</beam>
        </note>
      <note default-x="36.6" default-y="-20" dynamics="111.11">
        <pitch>
          <step>D</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">continue</beam>
        </note>
      <note default-x="60.69" default-y="-15" dynamics="111.11">
        <pitch>
          <step>E</step>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">continue</beam>
        </note>
      <note default-x="84.79" default-y="-10" dynamics="111.11">
        <pitch>
          <step>F</step>
          <alter>1</alter>
          <octave>3</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">end</beam>
        </note>
      <note default-x="108.88" default-y="-20" dynamics="111.11">
        <pitch>
          <step>D</step>
          <octave>3</octave>
          </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      <barline location="right">
        <bar-style>light-heavy</bar-style>
        </barline>
      </measure>
    </part>
  </score-partwise>
  `
};

export default scoresData;
