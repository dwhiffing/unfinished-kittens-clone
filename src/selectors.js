export const getModel = (state, modelName, instanceName) =>
  state[modelName].find(({ name }) => name === instanceName)

export const getModelIndex = (state, modelName, instanceName) =>
  state[modelName].findIndex(({ name }) => name === instanceName)

export const getUnlock = (state, name) => getModel(state, 'unlocks', name)

export const getEffects = state => {
  return state.buildings
    .concat(state.jobs)
    .concat(state.science.filter(s => s.value > 0))
    .map(({ effects = [], value: multiplier } = {}) =>
      effects.map(effect => ({ ...effect, multiplier }))
    )
    .flat()
}

export const getEffect = (state, type) => {
  return getEffects(state).filter(effect => effect.type === type)
}

export const getNewUnlocks = state => {
  const possibleUnlocks = [
    ...state.resources,
    ...state.buildings,
    ...state.tabs,
    ...state.jobs,
    ...state.science,
    ...state.commands,
  ]

  return possibleUnlocks.filter(
    unlockable =>
      !unlockable.unlockRequirements ||
      !!getUnlock(state, unlockable.name) ||
      Object.entries(unlockable.unlockRequirements).filter(
        ([resource, price]) =>
          state.resources.find(({ name }) => name === resource).value - price <
          0
      ).length === 0
  )
}

export const getMaxValue = (state, resource) => {
  if (typeof resource.max !== 'number') {
    return Number.MAX_SAFE_INTEGER
  }
  return (
    resource.max +
    getEffect(state, 'maxResource').reduce((total, effect) => {
      const {
        payload: { name, value },
        multiplier,
      } = effect
      return name === resource.name ? total + value * multiplier : total
    }, 0)
  )
}
