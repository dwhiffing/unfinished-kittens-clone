import { FOOD_DRAIN } from './constants'
import { getModel, getUnlock, getMaxValue, getEffect } from '../selectors'

export const getResource = (state, name) => getModel(state, 'resources', name)

export const getResources = state =>
  state.resources.map(resource => ({
    ...resource,
    max: getMaxValue(state, resource),
  }))

export const getUnlockedResources = state =>
  getResources(state).filter(({ name }) => !!getUnlock(state, name))

export const getFoodDrain = state =>
  parseInt(state.resources.find(r => r.name === 'folks').value + 1) * FOOD_DRAIN

export const getEffectTotal = (state, effectName, instanceName) => {
  return getEffect(state, effectName)
    .filter(effect => effect.payload.name === instanceName)
    .reduce(
      (total, { payload: { value = 0 }, multiplier = 0 }) =>
        total + value * multiplier,
      1
    )
}

export const getResourcesGainedPerTick = state => {
  const obj = {}
  getEffect(state, 'resourcePerTick').forEach(
    ({ parentName, payload, multiplier }) => {
      const { name, value } = payload
      multiplier *= getEffectTotal(state, 'improveJob', parentName)
      obj[name] = obj[name] || 0
      obj[name] += value * multiplier
    }
  )
  obj.food -= getFoodDrain(state)
  return obj
}
