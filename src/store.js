import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import { routerForHash } from 'redux-little-router';
import { createReducer as createOrmReducer } from 'redux-orm';

import reducers from './reducers';
import routes from './routes';
import orm from './orm';

const {
  reducer: routeReducer,
  middleware: routeMiddleware,
  enhancer: routeEnhancer
} = routerForHash({ routes });

const reducer = combineReducers(reducers);
const reducerWithRouter = combineReducers({
  router: routeReducer,
  state: reducer,
  orm: createOrmReducer(orm),
});

const middleware = applyMiddleware(apiMiddleware, routeMiddleware);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default (initialState) => 
  createStore(reducerWithRouter, initialState, composeEnhancers(routeEnhancer, middleware));