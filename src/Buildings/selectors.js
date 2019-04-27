import { getModel, getUnlock } from '../selectors'

export const getBuilding = (state, name) => getModel(state, 'buildings', name)

export const getBuildings = state =>
  state.buildings.map(building => ({
    ...building,
    prices: getNextCostForModel(state, building),
    canAfford: getCanAffordModel(state, building),
  }))

export const getUnlockedBuildings = state =>
  getBuildings(state).filter(({ name }) => !!getUnlock(state, name))

export const getNextCostForModel = (state, model) => {
  const obj = {}

  Object.entries(model.prices || {}).forEach(([resource, price]) => {
    obj[resource] = price * Math.pow(1.12, model.value)
  })

  return obj
}

export const getCanAffordModel = (state, model) => {
  return (
    Object.entries(getNextCostForModel(state, model)).filter(
      ([resourceName, prices]) => {
        const resource = state.resources.find(
          ({ name }) => name === resourceName
        )
        return resource.value - prices < 0
      }
    ).length === 0
  )
}
