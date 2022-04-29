// Icons from https://icons.modulz.app/
// Top 100 films from https://mui.com/material-ui/react-autocomplete/
import { useState } from 'react'
import { Autocomplete } from 'honorable'

export default {
  title: 'Autocomplete',
  component: Autocomplete,
  argTypes: {
    argTypes: {
      backgroundColor: { control: 'color' },
    },
  },
}

function Template(args) {
  return <Autocomplete {...args} />
}

function TemplateControlled(args) {
  const [value, setValue] = useState('')

  return (
    <Autocomplete
      value={value}
      onChange={event => setValue(event.target.value)}
      {...args}
    />
  )
}

const top100Films = [
  'The Shawshank Redemption',
  'The Godfather',
  'The Godfather: Part II',
  'The Dark Knight',
  '12 Angry Men',
  "Schindler's List",
  'Pulp Fiction',
  'The Lord of the Rings: The Return of the King',
  'The Good, the Bad and the Ugly',
  'Fight Club',
  'The Lord of the Rings: The Fellowship of the Ring',
  'Star Wars: Episode V - The Empire Strikes Back',
  'Forrest Gump',
  'Inception',
  'The Lord of the Rings: The Two Towers',
  "One Flew Over the Cuckoo's Nest",
  'Goodfellas',
  'The Matrix',
  'Seven Samurai',
  'Star Wars: Episode IV - A New Hope',
  'City of God',
  'Se7en',
  'The Silence of the Lambs',
  "It's a Wonderful Life",
  'Life Is Beautiful',
  'The Usual Suspects',
  'Léon: The Professional',
  'Spirited Away',
  'Saving Private Ryan',
  'Once Upon a Time in the West',
  'American History X',
  'Interstellar',
  'Casablanca',
  'City Lights',
  'Psycho',
  'The Green Mile',
  'The Intouchables',
  'Modern Times',
  'Raiders of the Lost Ark',
  'Rear Window',
  'The Pianist',
  'The Departed',
  'Terminator 2: Judgment Day',
  'Back to the Future',
  'Whiplash',
  'Gladiator',
  'Memento',
  'The Prestige',
  'The Lion King',
  'Apocalypse Now',
  'Alien',
  'Sunset Boulevard',
  'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
  'The Great Dictator',
  'Cinema Paradiso',
  'The Lives of Others',
  'Grave of the Fireflies',
  'Paths of Glory',
  'Django Unchained',
  'The Shining',
  'WALL·E',
  'American Beauty',
  'The Dark Knight Rises',
  'Princess Mononoke',
  'Aliens',
  'Oldboy',
  'Once Upon a Time in America',
  'Witness for the Prosecution',
  'Das Boot',
  'Citizen Kane',
  'North by Northwest',
  'Vertigo',
  'Star Wars: Episode VI - Return of the Jedi',
  'Reservoir Dogs',
  'Braveheart',
  'M',
  'Requiem for a Dream',
  'Amélie',
  'A Clockwork Orange',
  'Like Stars on Earth',
  'Taxi Driver',
  'Lawrence of Arabia',
  'Double Indemnity',
  'Eternal Sunshine of the Spotless Mind',
  'Amadeus',
  'To Kill a Mockingbird',
  'Toy Story 3',
  'Logan',
  'Full Metal Jacket',
  'Dangal',
  'The Sting',
  '2001: A Space Odyssey',
  "Singin' in the Rain",
  'Toy Story',
  'Bicycle Thieves',
  'The Kid',
  'Inglourious Basterds',
  'Snatch',
  '3 Idiots',
  'Monty Python and the Holy Grail',
]

const top100FilmsObject = top100Films.map(title => ({ value: title, label: title }))

export const Default = Template.bind({})
Default.args = {
  options: top100Films,
  disabled: false,
}

export const ObjectOptions = Template.bind({})
ObjectOptions.args = {
  options: top100FilmsObject,
  disabled: false,
}

export const DefaultValue = Template.bind({})
DefaultValue.args = {
  defaultValue: 'Text me if you can',
  options: top100Films,
  disabled: false,
}

export const Controlled = TemplateControlled.bind({})
Controlled.args = {
  options: top100Films,
  disabled: false,
}

export const AutoFocus = Template.bind({})
AutoFocus.args = {
  options: top100Films,
  disabled: false,
  autoFocus: true,
}

export const StartIcon = Template.bind({})
StartIcon.args = {
  options: top100Films,
  disabled: false,
  startIcon: (
    <svg
      width={16}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  ),
}

export const EndIcon = Template.bind({})
EndIcon.args = {
  options: top100Films,
  disabled: false,
  endIcon: (
    <svg
      width={16}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  ),
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
}

export const Multiline = Template.bind({})
Multiline.args = {
  multiline: true,
  options: top100Films,
  disabled: false,
}

export const MultilineControlled = TemplateControlled.bind({})
MultilineControlled.args = {
  multiline: true,
  options: top100Films,
  disabled: false,
}

export const AutoHighlight = Template.bind({})
AutoHighlight.args = {
  autoHighlight: true,
  options: top100Films,
  disabled: false,
}
