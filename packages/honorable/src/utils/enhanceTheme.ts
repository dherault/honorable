import resolveColor from './resolveColor'

function enhanceTheme(theme) {
  return {
    ...theme,
    utils: {
      resolveColor: color => resolveColor(null, color, theme),
    },
  }
}

export default enhanceTheme
