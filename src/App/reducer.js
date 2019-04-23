import u from 'updeep'
import { INITIAL_MODELS } from '../storeContext'

const appReducer = (state, action) => {
  if (action.type === 'SAVE') {
    let obj = { ...INITIAL_MODELS, app: { unlocks: [] } }
    obj.resources = state.resources.map(({ name, value }) => [name, value])
    obj.buildings = state.buildings.map(({ name, value }) => [name, value])
    obj.science = state.science.map(({ name, value }) => [name, value])
    obj.jobs = state.jobs.map(({ name, value }) => [name, value])
    obj.app.unlocks = state.app.unlocks
    localStorage.setItem('save', JSON.stringify(obj))
  }

  if (action.type === 'LOAD') {
    return u(
      { loading: false, unlocks: [...action.payload.app.unlocks] },
      state.app
    )
  }

  if (action.type === 'TICK') {
    const unlocks = [...state.app.unlocks]
    const unlockables = state.resources
      .concat(state.buildings)
      .concat(state.science)
    const remaining = unlockables.filter(u => !unlocks.includes(u.name))
    remaining.forEach(unlockable => {
      if (unlockable.isUnlocked(state.resources)) {
        unlocks.push(unlockable.name)
      }
    })
    return u({ unlocks }, state.app)
  }
  return state.app
}

export default appReducer
