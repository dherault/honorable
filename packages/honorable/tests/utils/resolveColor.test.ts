import resolveColor from '../../src/utils/resolveColor'

test('it resolves an hex color', () => {
  expect(resolveColor('#ffffff')).toBe('#ffffff')
})

test('it resolves a shorten hex color', () => {
  expect(resolveColor('#fff')).toBe('#fff')
})
