import { getEffect, getModel, getUnlock } from '../selectors'

export const getCommand = (state, name) => getModel(state, 'commands', name)

export const getCommands = state =>
  state.commands.map(command => ({
    ...command,
    summary: getCommandSummary(state, command),
    canAfford: getCommandAffordable(state, command),
  }))

export const getUnlockedCommands = state =>
  getCommands(state).filter(({ name }) => !!getUnlock(state, name))

export const getEffectsForCommand = (state, command) => {
  const effect = getEffect(state, 'improveCommand').find(
    e => e.payload.name === command.name
  )
  const upgradeValue = effect ? effect.payload.value * effect.multiplier : 1

  return command.effects
    .filter(({ type }) => type === 'updateResources')
    .map(effect => {
      let payload = { ...effect.payload }

      Object.entries(payload).forEach(([resource, amount]) => {
        payload[resource] = Array.isArray(amount) ? sample(amount) : amount
        payload[resource] *= upgradeValue
      })

      return { type: 'UPDATE_RESOURCES', payload }
    })
}

const getCommandSummary = (state, command) => {
  const upgradeValue = state.science
    .filter(s => s.value > 0)
    .map(s => s.effects.find(e => e.type === 'improveCommand'))
    .filter(e => e.payload.name === command.name)
    .reduce((prev, effect) => prev * effect.payload.value, 1)

  const data = command.effects
    .filter(({ type }) => type === 'updateResources')
    .map(effect =>
      Object.entries(effect.payload).map(([name, value]) => {
        if (!Array.isArray(value)) {
          return `${name}: ${value * upgradeValue}`
        }
        const min = value[0] * upgradeValue
        const max = value[value.length - 1] * upgradeValue
        return ` ${name}: ${min}-${max}`
      })
    )
  return data.join('')
}

const getCommandPrices = (state, command) => {
  let prices = {}
  let effects = command.effects || []
  effects.forEach(effect => {
    effect.payload &&
      Object.entries(effect.payload).forEach(([resourceKey, price]) => {
        if (price < 0) {
          prices[resourceKey] = -price
        }
      })
  })
  return prices
}

const getCommandAffordable = (state, command) => {
  return (
    Object.entries(getCommandPrices(state, command)).filter(
      ([resourceName, prices]) => {
        const resource = state.resources.find(
          ({ name }) => name === resourceName
        )
        const value = resource.value - prices
        return value < 0
      }
    ).length === 0
  )
}

const sample = arr => arr[Math.floor(Math.random() * arr.length)]
