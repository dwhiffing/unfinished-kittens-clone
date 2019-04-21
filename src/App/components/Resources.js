import React from 'react'

const Resource = ({ name, value, max }) => (
  <div>
    <p>
      {name}: {value.toFixed(2)} / {max}
    </p>
  </div>
)

const Resources = ({ resources }) => (
  <div className="flex flex-column">
    {resources.map(resource => (
      <Resource
        key={`resource-${resource.name}`}
        name={resource.name}
        value={resource.value}
        max={resource.max}
      />
    ))}
  </div>
)

export default Resources
