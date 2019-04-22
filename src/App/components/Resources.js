import React from 'react'
import { getPerTick } from '../utils'

const Resource = ({ name, value, max, perTick }) => (
  <div>
    <p>
      {name}: {value.toFixed(2)} / {max}{' '}
      {perTick > 0 && `(+${(perTick * 5).toFixed(2)}/sec)`}
    </p>
  </div>
)

const Resources = ({ buildings, resources }) => {
  const perTick = getPerTick(buildings)
  return (
    <div className="flex flex-column">
      {resources
        .filter(resource => resource.visible)
        .map(resource => (
          <Resource
            key={`resource-${resource.name}`}
            name={resource.name}
            value={resource.value}
            perTick={perTick[resource.name]}
            max={resource.max}
          />
        ))}
    </div>
  )
}

export default Resources
