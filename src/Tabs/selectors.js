import { getModel, getUnlock } from '../selectors'

export const getTabs = state => state.tabs

export const getTab = (state, name) => getModel(state, 'tabs', name)

export const getUnlockedTabs = state =>
  getTabs(state).filter(({ name }) => !!getUnlock(state, name))
