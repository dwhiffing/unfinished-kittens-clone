import { getModel, getUnlock, getNextCostForModel } from '../selectors'

export const getSciences = state =>
  state.science.map(science => ({
    ...science,
    summary: getScienceSummary(state, science),
    canAfford: getScienceAffordable(state, science),
    isPurchased: science.value > 0 && science.max === 1,
    prices: getNextCostForModel(state, science),
  }))

export const getScience = (state, name) => getModel(state, 'science', name)

export const getUnlockedScience = state =>
  getSciences(state)
    .filter(({ name }) => !!getUnlock(state, name))
    .filter(science => !science.max || science.value < science.max)

const getScienceAffordable = (state, science) => {
  return (
    (!science.max || science.value < science.max) &&
    Object.entries(getNextCostForModel(state, science)).filter(
      ([resourceName, prices]) => {
        const resource = state.resources.find(
          ({ name }) => name === resourceName
        )
        return resource.value - prices < 0
      }
    ).length === 0
  )
}

const getScienceSummary = (state, science) => {
  return science.effects
    .map(effect => `${effect.payload.name} value * ${effect.payload.value}`)
    .join('')
}
