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

export const getResourcesGainedPerTick = state => {
  const obj = {}
  getEffect(state, 'resourcePerTick').forEach(({ payload, multiplier }) => {
    const { name, value } = payload
    obj[name] = obj[name] || 0
    obj[name] += value * multiplier
  })
  obj.food -=
    parseInt(state.resources.find(r => r.name === 'folks').value + 1) *
    FOOD_DRAIN
  return obj
}
