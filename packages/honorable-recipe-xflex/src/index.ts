import flexpad from 'flexpad'

function resolveXflex() {
  return ({ xflex }: any) => typeof xflex === 'string' && flexpad(xflex)
}

export default resolveXflex
