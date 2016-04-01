import React from 'react'
import {Router, Route, IndexRoute, hashHistory } from 'react-router'
import ReactDOM from 'react-dom'

var App = require('./components/App');
var Audience = require('./components/Audience');
var Speaker = require('./components/Speaker');
var Board = require('./components/Board');
var Whoops404 = require('./components/Whoops404');

ReactDOM.render(<Router history={hashHistory}>
                    <Route path="/" component={App}>
                     	<IndexRoute component={Audience} />
				        <Route path="speaker" component={Speaker}/>
				        <Route path="board" component={Board}/>
				        <Route path="*" component={Whoops404}/>
				    </Route>
                </Router>
                , document.getElementById('react-container'));


