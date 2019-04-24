import { getModel, getUnlock } from '../selectors'

export const getBuilding = (state, name) => getModel(state, 'buildings', name)

export const getBuildings = state =>
  state.buildings.map(building => ({
    ...building,
    prices: getNextCostForBuilding(state, building),
    canAfford: getCanAffordBuilding(state, building),
  }))

export const getUnlockedBuildings = state =>
  getBuildings(state).filter(({ name }) => !!getUnlock(state, name))

const getNextCostForBuilding = (state, building) => {
  const obj = {}

  Object.entries(building.prices || {}).forEach(([resource, price]) => {
    obj[resource] = price * Math.pow(1.12, building.value)
  })

  return obj
}

const getCanAffordBuilding = (state, building) => {
  return (
    Object.entries(getNextCostForBuilding(state, building)).filter(
      ([resourceName, prices]) => {
        const resource = state.resources.find(
          ({ name }) => name === resourceName
        )
        return resource.value - prices < 0
      }
    ).length === 0
  )
}
