const { default: tags } = require('../data/tags')
const { default: wrapComponentWithStyle } = require('../utils/wrapComponentWithStyle')
const { default: capitalize } = require('../utils/capitalize')

module.exports = Object.fromEntries(tags.map((tag: string) => [capitalize(tag), wrapComponentWithStyle(tag, tag)]))
