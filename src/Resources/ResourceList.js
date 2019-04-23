import { connect } from '../storeContext'
import React from 'react'
import { getResourcesGainedPerTick } from './utils'
import { Link } from 'react-router-dom'

const ResourcesList = ({ unlocks, buildings, jobs, resources }) => {
  const perTick = getResourcesGainedPerTick({ resources, buildings, jobs })
  return (
    <>
      <Links unlocks={unlocks} />
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
    </>
  )
}

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
      <p style={{ marginLeft: -5, fontSize: 11 }}>
        {perSecond > 0 && '+'}
        {perSecond}/sec
      </p>
    </div>
  </div>
)

const Links = ({ unlocks }) => (
  <div className="flex flex-column">
    <Link to="/">Bonfire</Link>

    {unlocks.find(unlock => unlock.name === 'farm') && (
      <Link to="/farm">Farm</Link>
    )}
    {unlocks.find(unlock => unlock.name === 'forestry') && (
      <Link to="/forestry">Forestry</Link>
    )}
    <Link
      to=""
      onClick={() => {
        const shouldReset = window.confirm('sure?')
        if (shouldReset) {
          localStorage.removeItem('save')
          document.location.reload()
        }
      }}>
      Reset
    </Link>
  </div>
)

const mapStateToProps = ({ unlocks, buildings, resources, jobs }) => ({
  buildings,
  resources,
  jobs,
  unlocks,
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResourcesList)
