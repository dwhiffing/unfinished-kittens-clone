import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from './storeContext'

const Home = ({ buildings, resources, gatherFood, buyBuilding }) => (
  <div className="flex flex-row height-100">
    <div className="flex flex-column" style={{ flex: 1 }}>
      <Links />
      <Commands gatherFood={gatherFood} />
      <Resources resources={resources} />
    </div>
    <div style={{ flex: 2 }}>
      <Buildings
        resources={resources}
        buildings={buildings}
        buyBuilding={buyBuilding}
      />
    </div>
  </div>
)

const mapStateToProps = ({ buildings, resources }) => ({
  buildings,
  resources,
})

const mapDispatchToProps = dispatch => ({
  buyBuilding: building =>
    dispatch({ type: 'BUY_BUILDING', payload: building }),
  gatherFood: () => dispatch({ type: 'GATHER_FOOD' }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

const Slat = ({ label, onClick, color = 'white' }) => (
  <div onClick={onClick}>
    <p style={{ color }}>{label}</p>
  </div>
)

const Links = () => (
  <div className="flex flex-column">
    <Link to="/">Bonfire</Link>
    <Link to="/townhall">Village</Link>
    <Link to="/research">Research</Link>
    <Link to="/crafting">Crafting</Link>
    <Link to="/settings">Settings</Link>
  </div>
)

const Command = ({ name, onClick }) => (
  <div onClick={onClick}>
    <p>{name}</p>
  </div>
)

const Commands = ({ gatherFood }) => (
  <div className="flex flex-column">
    <Command name="Gather food" onClick={gatherFood} />
  </div>
)

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

const Buildings = ({ resources, buildings, buyBuilding }) =>
  buildings.map(building => {
    const foodCost = building.getNextCost().food
    const canAfford = resources[0].value >= foodCost
    return (
      <Slat
        key={building.name}
        color={canAfford ? 'white' : 'red'}
        label={`${building.name} - ${building.value} cost: ${foodCost.toFixed(
          2
        )}`}
        onClick={() =>
          canAfford &&
          buyBuilding({
            name: building.name,
            value: 1,
            cost: building.getNextCost({ negated: true }),
          })
        }
      />
    )
  })
