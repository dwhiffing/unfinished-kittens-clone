import { connect } from '../storeContext'
import React from 'react'
import { getUnlockedScience } from './selectors'

const mapStateToProps = state => ({
  science: getUnlockedScience(state),
})

const mapDispatchToProps = dispatch => ({
  buyScience: ({ name, prices }) =>
    dispatch({ type: 'BUY_SCIENCE', payload: { name, prices } }),
})

const ScienceView = ({ tab, science, buyScience }) => {
  if (science.length === 0) {
    return false
  }

  return (
    <>
      <p>Research</p>
      {science
        .filter(science => science.tab === tab)
        .map(science => (
          <ScienceItem
            key={science.name}
            {...science}
            onClick={() => science.canAfford && buyScience(science)}
          />
        ))}
    </>
  )
}

const ScienceItem = ({
  name,
  value,
  labels,
  isPurchased,
  onClick,
  canAfford,
  summary,
  prices,
}) => (
  <div
    className="button building"
    onClick={onClick}
    style={{ opacity: isPurchased ? 0.5 : 1 }}>
    <p style={{ color: !canAfford && !isPurchased ? 'red' : 'white' }}>
      {labels[value] || `${name}${value}`}
    </p>
    {!isPurchased &&
      Object.entries(prices).map(([resourceName, price]) => (
        <p
          key={`key-${resourceName}`}
          style={{ color: !canAfford && !isPurchased ? 'red' : 'white' }}>
          {resourceName}: {price.toFixed(2)}
        </p>
      ))}
    <p>{summary}</p>
  </div>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScienceView)
