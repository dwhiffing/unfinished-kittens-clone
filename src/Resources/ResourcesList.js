import React from 'react'
import { getResourcesGainedPerTick } from './utils'

const ResourcesList = ({ unlocks, buildings, jobs, resources }) => {
  const perTick = getResourcesGainedPerTick({ resources, buildings, jobs })
  return (
    <div className="flex flex-column">
      {resources
        .filter(resource =>
          unlocks.find(unlock => unlock.name === resource.name)
        )
        .map(resource => (
          <Resource
            key={`resource-${resource.name}`}
            {...resource}
            max={resource.getMax(buildings)}
            perSecond={(perTick[resource.name] * 5).toFixed(2)}
          />
        ))}
    </div>
  )
}

export default ResourcesList

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
