import u from 'updeep'
import { INITIAL_MODELS } from '../storeContext'

const appReducer = (state, action) => {
  if (action.type === 'SAVE') {
    let obj = { ...INITIAL_MODELS, app: {} }
    obj.resources = state.resources.map(({ name, value }) => [name, value])
    obj.buildings = state.buildings.map(({ name, value }) => [name, value])
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
    const { app, buildings, resources, tabs } = state
    const unlocks = [...app.unlocks]
    console.log(buildings, resources, tabs)
    const possibleUnlocks = [...resources, ...buildings, ...tabs]
    possibleUnlocks
      .filter(
        possibleUnlock =>
          !unlocks.find(unlock => unlock.name === possibleUnlock.name)
      )
      .forEach(unlockable => {
        if (unlockable.isUnlocked({ buildings, resources, tabs })) {
          unlocks.push(unlockable)
        }
      })

    return u({ unlocks }, app)
  }
  return state.app
}

export default appReducer
