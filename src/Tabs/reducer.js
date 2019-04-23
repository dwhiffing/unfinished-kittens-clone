import u from 'updeep'
import { INITIAL_MODELS } from '../reducer'

const unlockReducer = (state, action) => {
  //TODO: This shouldn't be here
  if (action.type === 'SAVE') {
    let obj = { ...INITIAL_MODELS }
    obj.resources = state.resources.map(({ name, value }) => [name, value])
    obj.buildings = state.buildings.map(({ name, value }) => [name, value])
    obj.science = state.science.map(({ name, value }) => [name, value])
    obj.jobs = state.jobs.map(({ name, value }) => [name, value])
    obj.unlocks = state.unlocks
    localStorage.setItem('save', JSON.stringify(obj))
  }

  if (action.type === 'LOAD') {
    return u([...action.payload.unlocks], state.unlocks)
  }

  if (action.type === 'TICK') {
    const possibleUnlocks = [
      ...state.resources,
      ...state.buildings,
      ...state.tabs,
      ...state.jobs,
      ...state.science,
    ]
    return u(
      possibleUnlocks.filter(
        unlockable =>
          state.unlocks.find(unlock => unlock.name === unlockable.name) ||
          !unlockable.unlockRequirements ||
          Object.entries(unlockable.unlockRequirements).filter(
            ([resource, price]) =>
              state.resources.find(({ name }) => name === resource).value -
                price <
              0
          ).length === 0
      ),
      state.unlocks
    )
  }
  return state.unlocks
}

export default unlockReducer
