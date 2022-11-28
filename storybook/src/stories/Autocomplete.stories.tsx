// Icons from https://icons.modulz.app/
// Top 100 films from https://mui.com/material-ui/react-autocomplete/
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Autocomplete, Button, Div } from 'honorable'

export default {
  title: 'Components/Autocomplete',
  component: Autocomplete,
  argTypes: {
    argTypes: {
      backgroundColor: { control: 'color' },
    },
  },
}

function Template(args: any) {
  return (
    <Autocomplete {...args} />
  )
}

function TemplateControlled(args: any) {
  const [value, setValue] = useState('')

  return (
    <>
      <div>{value}</div>
      <Autocomplete
        value={value}
        onChange={(value: any) => setValue(value)}
        mt={1}
        {...args}
      />
      <Button
        mt={1}
        onClick={() => setValue('')}
      >
        Set value to ''
      </Button>
    </>
  )
}

function TemplateOnSelect(args: any) {
  const [value, setValue] = useState('')
  const [selected, setSelected] = useState('')

  return (
    <>
      <div>
        Value:
        {' '}
        {value}
      </div>
      <div>
        Selected:
        {' '}
        {selected}
      </div>
      <Autocomplete
        value={value}
        onChange={setValue}
        onSelect={setSelected}
        mt={1}
        {...args}
      />
    </>
  )
}

const allClasses = [
  'hero',
  'hero-body',
  'container',
  'columns',
  'rows',
]

const ecuCreateOption = `__ecu_create_option__${Math.random()}`

function CssClassesSelector() {
  const [classes, setClasses] = useState<string[]>([])
  const [value, setValue] = useState('')

  const options = useMemo(() => allClasses.filter(c => !classes.includes(c)), [classes])

  const handleSelect = useCallback((selectedValue: any) => {
    setClasses(x => [...new Set(selectedValue === ecuCreateOption ? !value ? x : [...x, value] : [...x, selectedValue])])
    setValue('')
  }, [setClasses, value])

  return (
    <Div
      xflex="x41"
      position="relative"
      fontSize="0.85rem"
      backgroundColor="white"
      border="1px solid border"
      borderRadius="medium"
      gap={0.25}
      p={0.25}
    >
      {classes.map(className => (
        <Div key={className}>
          {className}
        </Div>
      ))}
      <Autocomplete
        autoHighlight
        placeholder={`${classes.length ? 'Combine' : 'Choose'} or create class`}
        options={options}
        anyOption={{ value: ecuCreateOption, label: 'Create new class' }}
        value={value}
        onChange={setValue}
        onSelect={handleSelect}
        flexGrow
        flexShrink={1}
        position="initial" // Give the menu to the parent
      />
    </Div>
  )
}

function TemplateOnOpen(args: any) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {open ? 'Open' : 'Closed'}
      <Autocomplete
        onOpen={setOpen}
        {...args}
      />
    </>
  )
}

function TemplateForceOpen(args: any) {
  const [forceOpen, setForceOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => setForceOpen(true)}
        mb={1}
      >
        Force Open
      </Button>
      <Autocomplete
        forceOpen={forceOpen}
        onForceOpen={() => setForceOpen(false)}
        {...args}
      />

    </>
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

const top100FilmsObject = top100Films.map(title => ({ value: `_value_${title}`, label: title }))

export const Default = Template.bind({}) as any
Default.args = {
  options: top100Films,
}

export const Width100 = Template.bind({}) as any
Width100.args = {
  options: top100Films,
  width: '100%',
}

export const OnSelect = TemplateOnSelect.bind({}) as any
OnSelect.args = {
  options: top100Films,
}

export const ObjectOptions = Template.bind({}) as any
ObjectOptions.args = {
  options: top100FilmsObject,
}

export const ObjectOptionsControlled = TemplateControlled.bind({}) as any
ObjectOptionsControlled.args = {
  options: top100FilmsObject,
}

export const DefaultValue = Template.bind({}) as any
DefaultValue.args = {
  defaultValue: 'Text me if you can',
  options: top100Films,
}

export const Controlled = TemplateControlled.bind({}) as any
Controlled.args = {
  options: top100Films,
}

export const AutoFocus = Template.bind({}) as any
AutoFocus.args = {
  options: top100Films,
  autoFocus: true,
}

export const StartIcon = Template.bind({}) as any
StartIcon.args = {
  options: top100Films,
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

export const EndIcon = Template.bind({}) as any
EndIcon.args = {
  options: top100Films,
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

export const Disabled = Template.bind({}) as any
Disabled.args = {
  disabled: true,
}

export const Multiline = Template.bind({}) as any
Multiline.args = {
  multiline: true,
  options: top100Films,
}

export const MultilineControlled = TemplateControlled.bind({}) as any
MultilineControlled.args = {
  multiline: true,
  options: top100Films,
}

export const AnyOption = Template.bind({}) as any
AnyOption.args = {
  options: top100Films,
  anyOption: 'Any option!',
}

export const AnyOptionWithValue = TemplateControlled.bind({}) as any
AnyOptionWithValue.args = {
  options: top100Films,
  anyOption: { label: 'Any option!', value: '*' },
}

export const InputProps = Template.bind({}) as any
InputProps.args = {
  options: top100Films,
  inputProps: {
    color: 'red',
  },
}

export const Selector = CssClassesSelector.bind({}) as any
Selector.args = {
  options: top100Films,
}

export const OnOpen = TemplateOnOpen.bind({}) as any
OnOpen.args = {
  options: top100Films,
}

export const ForceOpen = TemplateForceOpen.bind({}) as any
ForceOpen.args = {
  options: top100Films,
}
