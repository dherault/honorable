const { default: tags } = require('../data/tags')
const { default: withHonorable } = require('../withHonorable')
const { default: capitalize } = require('../utils/capitalize')

module.exports = Object.fromEntries(tags.map((tag: string) => [capitalize(tag), withHonorable(tag, tag)]))
