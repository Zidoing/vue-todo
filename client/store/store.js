import Vuex from 'vuex'
import defaultState from './state'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

export default () => {
  return new Vuex.Store({
    state: defaultState,
    mutations,
    getters,
    actions,
  })
}
