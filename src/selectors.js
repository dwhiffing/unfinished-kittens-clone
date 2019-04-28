export const getModel = (state, modelName, instanceName) =>
  state[modelName].find(({ name }) => name === instanceName)

export const getModelIndex = (state, modelName, instanceName) =>
  state[modelName].findIndex(({ name }) => name === instanceName)

export const getUnlock = (state, name) => getModel(state, 'unlocks', name)

export const getEffects = state => {
  return state.buildings
    .concat(state.jobs)
    .concat(state.resources)
    .concat(state.science.filter(s => s.value > 0))
    .map(effectable => {
      const effects = effectable.effects || []
      return effects.map(effect => ({
        ...effect,
        parent: effectable,
        multiplier: effectable.value,
      }))
    })
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
      Object.entries(unlockable.unlockRequirements).filter(([model, price]) => {
        const possibleUnlock = possibleUnlocks.find(
          ({ name }) => name === model
        )
        return possibleUnlock && possibleUnlock.value - price < 0
      }).length === 0
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

export const getNextCostForModel = (state, model) => {
  const obj = {}
  Object.entries(model.prices || {}).forEach(([resource, price]) => {
    obj[resource] = price * Math.pow(model.ratio || 1.12, model.value)
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
