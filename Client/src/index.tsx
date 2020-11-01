import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './index.scss';

import {DeskApp} from './components/DeskApp';
import {PhoneApp} from './components/PhoneApp';

class Choice extends React.Component {
	render() {
		return (<div className="Choice-wrap">
			<p><Link to="/desk">Desktop</Link></p>
			<p><Link to="/mobile">Mobile</Link></p>
		</div>);
	}
}

ReactDOM.render(
<Router>
	<Route exact path="/" component={Choice} />
	<Route exact path="/desk" component={DeskApp} />
	<Route exact path="/mobile" component={PhoneApp} />
</Router>, document.getElementById('root'));
