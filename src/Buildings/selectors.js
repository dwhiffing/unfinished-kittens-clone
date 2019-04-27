import {
  getModel,
  getUnlock,
  getNextCostForModel,
  getCanAffordModel,
  getMaxValue,
} from '../selectors'

export const getBuilding = (state, name) => getModel(state, 'buildings', name)

export const getBuildings = state =>
  state.buildings.map(building => ({
    ...building,
    prices: getNextCostForModel(state, building),
    canAfford: getCanAffordModel(state, building),
    max: getMaxValue(state, building),
    isMaxed: getMaxValue(state, building) === building.value,
  }))

export const getUnlockedBuildings = state =>
  getBuildings(state).filter(({ name }) => !!getUnlock(state, name))
