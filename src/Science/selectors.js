import { getModel, getUnlock } from '../selectors'

export const getSciences = state =>
  state.science.map(science => ({
    ...science,
    summary: getScienceSummary(state, science),
    canAfford: getScienceAffordable(state, science),
    isPurchased: science.value > 0,
  }))

export const getScience = (state, name) => getModel(state, 'science', name)

export const getUnlockedScience = state =>
  getSciences(state).filter(({ name }) => !!getUnlock(state, name))

const getScienceAffordable = (state, science) => {
  return (
    science.value === 0 &&
    Object.entries(science.prices).filter(([resourceName, prices]) => {
      const resource = state.resources.find(({ name }) => name === resourceName)
      return resource.value - prices < 0
    }).length === 0
  )
}

const getScienceSummary = (state, science) => {
  const effect = science.effects.find(({ type }) => type === 'improveCommand')

  return `${effect.payload.name} value * ${effect.payload.value}`
}
