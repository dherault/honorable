import PropTypes from 'prop-types'

import MomentContext from '../../contexts/MomentContext'

export type MomentProviderProps = {
  children: React.ReactNode
  moment: any
}

export const MomentProviderPropTypes = {
  children: PropTypes.node.isRequired,
  moment: PropTypes.any.isRequired,
}

export function MomentProvider({ moment, children }: MomentProviderProps) {
  return (
    <MomentContext.Provider value={moment}>
      {children}
    </MomentContext.Provider>
  )
}
