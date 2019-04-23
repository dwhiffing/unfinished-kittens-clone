import u from 'updeep'
import { INITIAL_MODELS } from '../storeContext'

const appReducer = (state, action) => {
  if (action.type === 'SAVE') {
    let obj = { ...INITIAL_MODELS, app: {} }
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
    const { app, buildings, resources, tabs, jobs, science } = state
    const unlocks = [...app.unlocks]
    const possibleUnlocks = [
      ...resources,
      ...buildings,
      ...tabs,
      ...jobs,
      ...science,
    ]
    possibleUnlocks
      .filter(
        possibleUnlock =>
          !unlocks.find(unlock => unlock.name === possibleUnlock.name)
      )
      .forEach(unlockable => {
        let isUnlocked =
          !unlockable.unlockRequirements ||
          Object.entries(unlockable.unlockRequirements).filter(
            ([resourceName, price]) => {
              const resource = resources.find(
                ({ name }) => name === resourceName
              )
              return resource.value - price < 0
            }
          ).length === 0

        if (isUnlocked) {
          unlocks.push(unlockable)
        }
      })

    return u({ unlocks }, app)
  }
  return state.app
}

export default appReducer
