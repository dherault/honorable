import { useEffect, useState } from 'react'
import { Div, P } from 'honorable'

const lyrics = `Is this the real life?
Is this just fantasy?
Caught in a landside,
No escape from reality
Open your eyes,
Look up to the skies and see,
I'm just a poor boy, I need no sympathy,
Because I'm easy come, easy go,
Little high, little low,
Any way the wind blows doesn't really matter to
Me, to me
Mamaaa,
Just killed a man,
Put a gun against his head, pulled my trigger,
Now he's dead
Mamaaa, life had just begun,
But now I've gone and thrown it all away
Mama, oooh,
Didn't mean to make you cry,
If I'm not back again this time tomorrow,
Carry on, carry on as if nothing really matters
Too late, my time has come,
Sends shivers down my spine, body's aching all
The time
Goodbye, everybody, I've got to go,
Gotta leave you all behind and face the truth
Mama, oooh
I don't want to die,
I sometimes wish I'd never been born at all.
I see a little silhouetto of a man,
Scaramouch, Scaramouch, will you do the Fandango!
Thunderbolts and lightning, very, very frightening me
Galileo, Galileo
Galileo, Galileo
Galileo, Figaro - magnificoo
I'm just a poor boy nobody loves me
He's just a poor boy from a poor family,
Spare him his life from this monstrosity
Easy come, easy go, will you let me go
Bismillah! No, we will not let you go
(Let him go!) Bismillah! We will not let you go
(Let him go!) Bismillah! We will not let you go
(Let me go) Will not let you go
(Let me go)(Never) Never let you go
(Let me go) (Never) let you go (Let me go) Ah
No, no, no, no, no, no, no
Oh mama mia, mama mia, mama mia, let me go
Beelzebub has a devil put aside for me, for me,
For meee
So you think you can stop me and spit in my eye
So you think you can love me and leave me to die
Oh, baby, can't do this to me, baby,
Just gotta get out, just gotta get right outta here
Nothing really matters, Anyone can see,
Nothing really matters,
Nothing really matters to me
Any way the wind blows...`

function Karaoke(props) {
  return (
    <Div
      p={2}
      borderRadius={4}
      backgroundColor="background"
      border="1px solid border"
      width={256 + 128}
      maxWidth={256 + 128}
      {...props}
    >
      <KaraokeBox lyrics={lyrics} />
    </Div>
  )
}

function KaraokeBox({ lyrics }) {
  const lyricsArray = lyrics.split('\n')
  const [currentLineIndex, setCurrentLineIndex] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentLineIndex(x => x === lyricsArray.length - 1 ? 0 : x + 1)
    }, 60 * 60 * 1000 / 141 / 8)

    return () => {
      clearInterval(intervalId)
    }
  }, [lyricsArray])

  return (
    <Div
      backgroundColor="primary"
      px={2}
      py={3}
      borderRadius={4}
    >
      <P
        fontSize={24}
        color="transparencify(white, 50)"
        height={56}
        xflex="x4"
      >
        {currentLineIndex > 0 ? lyricsArray[currentLineIndex - 1] : ''}
      </P>
      <P
        my={1}
        fontSize={24}
        color="white"
        height={56}
        xflex="x4"
      >
        {lyricsArray[currentLineIndex]}
      </P>
      <P
        fontSize={24}
        color="transparencify(white, 50)"
        height={56}
        xflex="x4"
      >
        {currentLineIndex < lyricsArray.length - 1 ? lyricsArray[currentLineIndex + 1] : ''}
      </P>
    </Div>
  )
}

export default Karaoke
