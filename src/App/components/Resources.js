import React from 'react'

const Resource = ({ name, value }) => (
  <div>
    <p>
      <span>{name}</span>: <span>{value.toFixed(2)}</span>
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
      />
    ))}
  </div>
)

export default Resources
