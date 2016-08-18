import React from 'react';
import React3 from 'react-three-renderer';
import THREE from 'three';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import sagas from './sagas'

import reducers from './reducers'
import SimpleContainer from './containers/SimpleContainer'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducers, compose(
	applyMiddleware(sagaMiddleware),
	typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
));

sagaMiddleware.run(sagas)

ReactDOM.render(
	<Provider store={store}>
		<SimpleContainer/>
	</Provider>
, document.getElementById('root'));
