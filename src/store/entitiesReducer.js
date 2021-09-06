import { combineReducers } from 'redux'
import countryReducer from './country'

export default  combineReducers({
  countries: countryReducer
})