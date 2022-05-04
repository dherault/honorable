import createMediaQuery from '../../src/utils/createMediaQuery'

import { theme } from '../theme'

describe('createMediaQuery', () => {

  test('Creates simple media queries', () => {
    expect(createMediaQuery('mobile', 'up', theme)).toBe('@media (min-width: 0px)')
    expect(createMediaQuery('tablet', 'up', theme)).toBe('@media (min-width: 600px)')
    expect(createMediaQuery('desktop', 'up', theme)).toBe('@media (min-width: 1000px)')
    expect(createMediaQuery('mobile', 'down', theme)).toBe('@media (max-width: 0px)')
    expect(createMediaQuery('tablet', 'down', theme)).toBe('@media (max-width: 600px)')
    expect(createMediaQuery('desktop', 'down', theme)).toBe('@media (max-width: 1000px)')
    expect(createMediaQuery('mobile', 'exact', theme)).toBe('@media (min-width: 0px) and (max-width: 600px)')
    expect(createMediaQuery('tablet', 'exact', theme)).toBe('@media (min-width: 600px) and (max-width: 1000px)')
    expect(createMediaQuery('desktop', 'exact', theme)).toBe('@media (min-width: 1000px)')
  })

  test('Returns null on error', () => {
    expect(createMediaQuery('foo', 'up', theme)).toBe(null)
    // @ts-expect-error
    expect(createMediaQuery('mobile', 'foo', theme)).toBe(null)
  })

})
