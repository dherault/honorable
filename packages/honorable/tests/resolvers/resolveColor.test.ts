import resolveColor from '../../src/resolvers/resolveColor'

import theme1 from '../themes/theme1'
import theme2 from '../themes/theme2'

describe('Color resolution', () => {

  test('it resolves non-colors as identity', () => {
    expect(resolveColor('nonsense', theme1)).toBe('nonsense')
    expect(resolveColor(123, theme1)).toBe(123)
  })

  test('it resolves an hex color', () => {
    expect(resolveColor('#ffffff', theme1)).toBe('#ffffff')
  })

  test('it resolves a shorten hex color', () => {
    expect(resolveColor('#fff', theme1)).toBe('#fff')
  })

  test('it resolves a named CSS color', () => {
    expect(resolveColor('white', theme1)).toBe('white')
  })

  test('it resolves a theme color', () => {
    expect(resolveColor('primary', theme1)).toBe(theme1.colors.primary)
  })

  test('it resolves an aliased theme color', () => {
    expect(resolveColor('aliasPrimary', theme1)).toBe(theme1.colors.primary)
  })

  test('it resolves a double aliased theme color', () => {
    expect(resolveColor('aliasAliasPrimary', theme1)).toBe(theme1.colors.primary)
  })

  test('it resolves a theme color based on mode', () => {
    expect(resolveColor('modedColor', theme1)).toBe(theme1.colors.modedColor.light)
    expect(resolveColor('modedColor', { ...theme1, mode: 'dark' })).toBe(theme1.colors.modedColor.dark)
  })

  test('it resolves a theme color based on mode, without a mode in theme', () => {
    expect(resolveColor('modedColor', { ...theme1, mode: null })).toBe(theme1.colors.modedColor.light)
  })

  test('it resolves an aliased theme color based on mode', () => {
    expect(resolveColor('aliasModedColor', theme1)).toBe(theme1.colors.primary)
    expect(resolveColor('aliasModedColor', { ...theme1, mode: 'dark' })).toBe(theme1.colors.secondary)
  })

})

describe('lighten and darken', () => {

  test('it returns a lightened hex color', () => {
    expect(resolveColor('lighten(#000000)', theme1)).toBe('#404040')
    expect(resolveColor('lighten( #000000)', theme1)).toBe('#404040')
    expect(resolveColor('lighten( #000000  )', theme1)).toBe('#404040')
  })

  test('it returns a darkened hex color', () => {
    expect(resolveColor('darken(#ffffff)', theme1)).toBe('#e0e0e0')
  })

  test('it returns a lightened hex color, with second argument', () => {
    expect(resolveColor('lighten(#000000, 10)', theme1)).toBe('#1a1a1a')
    expect(resolveColor('lighten(#000000,10)', theme1)).toBe('#1a1a1a')
    expect(resolveColor('lighten( #000000,  10 )', theme1)).toBe('#1a1a1a')
  })

  test('it returns a darkened hex color, with second argument', () => {
    expect(resolveColor('darken(#ffffff, 10)', theme1)).toBe('#e6e6e6')
  })

  test('it returns a lightened short hex color, with second argument', () => {
    expect(resolveColor('lighten(#000, 10)', theme1)).toBe('#1a1a1a')
  })

  test('it returns a darkened short hex color, with second argument', () => {
    expect(resolveColor('darken(#fff, 10)', theme1)).toBe('#e6e6e6')
  })

  test('it returns a resolved lightened theme color', () => {
    expect(resolveColor('lighten(primary, 10)', theme1)).toBe('#1a1aff')
    expect(resolveColor('lighten(border, 5)', theme1)).toBe('#eaeaea')
  })

  test('it returns a resolved lightened direct theme color', () => {
    expect(resolveColor('hover', theme2)).toBe('#eaeaea')
  })

  test('it returns a resolved darkened theme color', () => {
    expect(resolveColor('darken(primary, 10)', theme1)).toBe('#0000e6')
  })

  test('it returns a resolved lightened CSS color', () => {
    expect(resolveColor('lighten(blue, 10)', theme1)).toBe('#1a1aff')
  })

  test('it returns a resolved darkened CSS color', () => {
    expect(resolveColor('darken(blue, 10)', theme1)).toBe('#0000e6')
  })

  test('it returns the given color if not a valid color', () => {
    expect(resolveColor('lighten(#ffff, 10)', theme1)).toBe('#ffff')
  })

  test('it returns a resolved lightened color with transparency', () => {
    expect(resolveColor('lighten(#00000080, 10)', theme1)).toBe('#1a1a1a80')
  })

  test('it returns a resolved lightened color with rgb syntax', () => {
    expect(resolveColor('lighten(rgb(0,0,0), 10)', theme1)).toBe('#1a1a1a')
    expect(resolveColor('lighten(rgb(0, 0, 0) , 10)', theme1)).toBe('#1a1a1a')
    expect(resolveColor('lighten( rgb(0, 0, 0) , 10 )', theme1)).toBe('#1a1a1a')
  })

  test('it returns a resolved lighten color with rgba syntax', () => {
    expect(resolveColor('lighten(rgba(0, 0, 0, 0), 10)', theme1)).toBe('#1a1a1a00')
    expect(resolveColor('lighten(rgba(0, 0, 0, 128), 10)', theme1)).toBe('#1a1a1a80')
  })
})

describe('transparencify', () => {

  test('it returns a transparencified hex color', () => {
    expect(resolveColor('transparency(#000000)', theme1)).toBe('#00000080')
  })

  test('it returns a transparencified hex color, with second argument', () => {
    expect(resolveColor('transparency(#000000, 10)', theme1)).toBe('#000000e6')
  })

  test('it returns a transparencified short hex color, with second argument', () => {
    expect(resolveColor('transparency(#000, 10)', theme1)).toBe('#000000e6')
  })

  test('it returns a resolved transparencified theme color', () => {
    expect(resolveColor('transparency(primary, 10)', theme1)).toBe('#0000ffe6')
  })

  test('it returns a resolved transparencified CSS color', () => {
    expect(resolveColor('transparency(blue, 10)', theme1)).toBe('#0000ffe6')
  })

  test('it returns the given color if not a valid color', () => {
    expect(resolveColor('transparency(#ffff, 10)', theme1)).toBe('#ffff')
  })

  test('it returns a resolved transparencified color with transparency', () => {
    expect(resolveColor('transparency(#00000080, 10)', theme1)).toBe('#00000066')
  })

  test('it returns a resolved transparencified color with rgb syntax', () => {
    expect(resolveColor('transparency(rgb(0, 0, 0), 10)', theme1)).toBe('#000000e6')
  })

  test('it returns a resolved transparencified color with rgba syntax', () => {
    expect(resolveColor('transparency(rgba(0, 0, 0, 0), 10)', theme1)).toBe('#000000e6')
    expect(resolveColor('transparency(rgba(0, 0, 0, 128), 10)', theme1)).toBe('#00000066')
    expect(resolveColor('transparency(rgba(0, 0, 0, 128), 75)', theme1)).toBe('#00000000')
  })

})

describe('complex color strings', () => {

  test('it resolves an hex color', () => {
    expect(resolveColor('1px solid #ffffff', theme1)).toBe('1px solid #ffffff')
  })

  test('it resolves a shorten hex color', () => {
    expect(resolveColor('1px solid #fff', theme1)).toBe('1px solid #fff')
  })

  test('it resolves a named CSS color', () => {
    expect(resolveColor('1px solid white', theme1)).toBe('1px solid white')
  })

  test('it resolves a theme color', () => {
    expect(resolveColor('1px solid primary', theme1)).toBe(`1px solid ${theme1.colors.primary}`)
  })

  test('it resolves a rgb color', () => {
    expect(resolveColor('1px solid rgb(128, 0, 0)', theme1)).toBe('1px solid rgb(128, 0, 0)')
  })

  test('it resolves a ligthened color', () => {
    expect(resolveColor('1px solid lighten(#000000)', theme1)).toBe('1px solid #404040')
    expect(resolveColor('1px solid lighten(black)', theme1)).toBe('1px solid #404040')
    expect(resolveColor('1px solid lighten(rgb(0, 0, 0))', theme1)).toBe('1px solid #404040')
    expect(resolveColor('1px solid lighten(rgba(0, 0, 0, 0))', theme1)).toBe('1px solid #40404000')
  })

})
