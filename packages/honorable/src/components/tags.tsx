import tags from '../data/tags'
import withHonorable from '../withHonorable'
import capitalize from '../utils/capitalize'

export default Object.fromEntries(tags.map((tag: string) => [capitalize(tag), withHonorable(tag, tag)]))
