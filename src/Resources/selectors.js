import {
  getModel,
  getUnlock,
  getEffects,
  getModelMaxValue,
  getEffectsByType,
} from '../selectors'

export const getResource = (state, name) => getModel(state, 'resources', name)

export const getResources = state =>
  state.resources.map(resource => ({
    ...resource,
    max: getModelMaxValue(state, resource),
  }))

export const getUnlockedResources = state =>
  getResources(state).filter(({ name }) => !!getUnlock(state, name))

const FOOD_DRAIN = 0.1
export const getResourcesGainedPerTick = state => {
  const obj = {}
  getEffectsByType(state, 'resourcePerTick').forEach(
    ({ payload, multiplier }) => {
      const { name, value } = payload
      obj[name] = obj[name] || 0
      obj[name] += value * multiplier
    }
  )
  obj.food -=
    parseInt(state.resources.find(r => r.name === 'folks').value + 1) *
    FOOD_DRAIN
  return obj
}
