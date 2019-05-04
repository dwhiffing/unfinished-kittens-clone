import { CHEAT_FACTOR } from './constants'
import { getUnlock, getMaxValue, getEffect, getModelIndex } from '../selectors'

export const getResource = (state, name) =>
  getResources(state)[getModelIndex(state, 'resources', name)]

export const getResources = state =>
  state.resources.map(resource => ({
    ...resource,
    max: getMaxValue(state, resource),
  }))

export const getUnlockedResources = state =>
  getResources(state).filter(({ name }) => !!getUnlock(state, name))

export const getEffectTotal = (state, effectName, instanceName) => {
  const value = getEffect(state, effectName)
    .filter(effect => effect.payload.name === instanceName)
    .reduce(
      (total, { payload: { value = 0 }, multiplier = 0 }) =>
        total + value * multiplier,
      0
    )

  return value === 0 ? 1 : value
}

const getResourcesGainedPerTick = state => {
  const obj = {}
  const effects = getEffect(state, 'resourcePerTick').filter(
    ({ parent }) => parent.value > 0
  )
  effects.forEach(
    ({
      parent,
      payload: {
        name: resourceName,
        value,
        useMultiplier = true,
        integer = false,
      },
      multiplier,
    }) => {
      multiplier *= getEffectTotal(state, 'improveJob', parent.name)
      if (integer) {
        multiplier = Math.ceil(multiplier)
      }
      if (!useMultiplier) {
        multiplier = 1
      }
      obj[resourceName] = obj[resourceName] || 0
      obj[resourceName] += value * multiplier * CHEAT_FACTOR
    }
  )
  return obj
}

export const getResourceDiffPerTick = state => {
  const obj = getResourcesGainedPerTick(state)
  Object.entries(obj).forEach(([resourceName, value]) => {
    const resource = getResource(state, resourceName)
    if (resource.value + value > resource.max) {
      obj[resourceName] = resource.max - resource.value
    }
    if (resource.value === 0 && value < 0) {
      obj[resourceName] = 0
    }
  })
  return obj
}

export const getFoodDrain = state =>
  Math.abs(
    getEffect(state, 'resourcePerTick')
      .filter(({ payload }) => payload.name === 'food' && payload.value < 0)
      .reduce(
        (total, { payload: { value }, multiplier }) =>
          total + value * Math.ceil(multiplier),
        0
      )
  ) * 5
