import { connect } from '../storeContext'
import React from 'react'
import { getResourceDiffPerTick, getUnlockedResources } from './selectors'

const mapStateToProps = state => ({
  resources: getUnlockedResources(state),
  perTick: getResourceDiffPerTick(state),
  unlocks: state.unlocks,
})

const mapDispatchToProps = dispatch => ({})

const ResourcesList = ({ unlocks, resources, perTick }) => (
  <div className="flex flex-column">
    {resources.map(resource => (
      <Resource
        key={`resource-${resource.name}`}
        {...resource}
        perSecond={(perTick[resource.name] || 0) * 5}
      />
    ))}
  </div>
)

const Resource = ({ name, value, max, color, perSecond }) => (
  <div className="flex flex-row" style={{ marginTop: 10 }}>
    <div>
      <p style={{ color }}>{name}:</p>
    </div>
    <div style={{ marginLeft: 5 }}>
      <div className="flex flex-row align-center">
        <p>
          {value.toFixed(2)}
          <span style={{ color: '#aaa' }}> /{max}</span>
        </p>
      </div>
      {perSecond !== 0 && (
        <p style={{ marginLeft: -5, fontSize: 11 }}>
          {perSecond > 0 && '+'}
          {perSecond.toFixed(2)}/sec
        </p>
      )}
    </div>
  </div>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResourcesList)
