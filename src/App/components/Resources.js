import React from 'react'
import { getResourcesGainedPerTick } from '../utils'

const Resources = ({ buildings, resources }) => {
  const perTick = getResourcesGainedPerTick(buildings)
  return (
    <div className="flex flex-column">
      {resources
        .filter(resource => resource.visible || resource.value > 0)
        .map(resource => (
          <Resource
            key={`resource-${resource.name}`}
            {...resource}
            perSecond={(perTick[resource.name] * 5).toFixed(2)}
          />
        ))}
    </div>
  )
}

export default Resources

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
      {perSecond > 0 && (
        <p style={{ marginLeft: -5, fontSize: 11 }}>+{perSecond}/sec</p>
      )}
    </div>
  </div>
)
