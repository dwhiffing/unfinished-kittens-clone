import { connect } from './utils/storeContext'
import AppView from './AppView'

const invertPrices = prices => {
  const obj = {}
  Object.keys(prices).forEach(priceKey => {
    const price = prices[priceKey]
    obj[priceKey] = -price
  })
  return obj
}

const mapStateToProps = ({ loading, resources, buildings, commands }) => ({
  loading,
  resources,
  buildings,
  commands,
})

const mapDispatchToProps = dispatch => ({
  save: () => dispatch({ type: 'SAVE' }),
  load: () => dispatch({ type: 'LOAD' }),
  tick: () => dispatch({ type: 'TICK' }),
  triggerCommand: ({ effects = [], prices }) => {
    effects.forEach(effect => dispatch(effect))
    prices &&
      dispatch({
        type: 'UPDATE_RESOURCES',
        payload: invertPrices(prices),
      })
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppView)
