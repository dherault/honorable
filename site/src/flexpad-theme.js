import flexpad from 'flexpad'

export default {
  global: [
    ({ xflex }) => typeof xflex === 'string' && flexpad(xflex),
  ],
}
