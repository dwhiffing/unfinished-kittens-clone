import React from 'react'

const ScienceList = ({ name, isPurchased, onClick, canAfford, prices }) => (
  <div
    className="button building"
    onClick={onClick}
    style={{ opacity: isPurchased ? 0.5 : 1 }}>
    <p style={{ color: canAfford ? 'white' : 'red' }}>{name}</p>
    {Object.entries(prices).map(([resourceName, price]) => (
      <p
        key={`key-${resourceName}`}
        style={{ color: canAfford ? 'white' : 'red' }}>
        {resourceName}: {price.toFixed(2)}
      </p>
    ))}
  </div>
)

const ScienceView = ({ tab, unlocks, resources, science, buyScience }) => {
  const availableScience = science
    .filter(science => science.tab === tab)
    .filter(science => unlocks.find(unlock => unlock.name === science.name))

  if (availableScience.length === 0) {
    return false
  }

  return (
    <>
      <p>Research</p>
      {availableScience.map(science => (
        <ScienceList
          key={science.name}
          {...science}
          isPurchased={science.value > 0}
          canAfford={science.value === 1 || science.getCanAfford(resources)}
          onClick={() =>
            science.getCanAfford(resources) &&
            science.value === 0 &&
            buyScience(science)
          }
        />
      ))}
    </>
  )
}

export default ScienceView
