import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';
import PropTypes from 'prop-types';

class App extends React.Component {
  constructor() {
    super();
    this.addFish = this.addFish.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.removeFish = this.removeFish.bind(this);
    this.updateFish = this.updateFish.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);

    // getInitialState
    this.state = {
      fishes: {},
      order: {}
    }
	}

	componentWillMount() {
		// this runs right before the <App /> is rendered
		this.refeState = base.syncState(`${this.props.match.params.storeId}/fishes`, {
			context: this,
			state: 'fishes'
		});

		// check if there is any order in localStorage
		const localStorageRef = localStorage.getItem(`order-${this.props.match.params.storeId}`);

		if (localStorageRef) {
			// update our <App /> componten's order state
			this.setState({
				order: JSON.parse(localStorageRef)
			});
		}
	}

	componentWillUnmount() {
		base.removeBindig(this.refeState);
	}

	componentWillUpdate(nextProps, nextState) {
		localStorage.setItem(`order-${this.props.match.params.storeId}`, JSON.stringify(nextState.order));
	}

  addFish(fish) {
    // update our state
    const fishes = {...this.state.fishes};
    // add in our new fish
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;
    // set state
		this.setState({ fishes });
	}

	updateFish(key, updatedFish) {
		const fishes = {...this.state.fishes};
		fishes[key] = updatedFish;
		this.setState({ fishes });
	}

	removeFish(key) {
		const fishes = {...this.state.fishes};
		fishes[key] = null;
		this.setState({ fishes });
	}

  loadSamples() {
    this.setState({
      fishes: sampleFishes
    })
  }

  addToOrder(key) {
    // take a copy of our state
    const order = {...this.state.order};

    // update or add the new nuber of fish ordered
    order[key] = order[key] + 1 || 1;

    // update our state
    this.setState({order});
	}

	removeFromOrder(key) {
		const order = {...this.state.order};
		delete order[key];
		this.setState({ order });
	}

  render() {
		console.log('app');
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header age="500" tagline="Gohan es cool!" />
          <ul className="list-of-fishes">
            {
              Object
                .keys(this.state.fishes)
                .map(key =>
                  <Fish
                    addToOrder={this.addToOrder}
                    details={this.state.fishes[key]}
                    index={key}
                    key={key}
                  />
                )
            }
          </ul>
        </div>
        <Order
					order={this.state.order}
					params={this.props.match.params}
					removeFromOrder={this.removeFromOrder}
          fishes={this.state.fishes}
        />
        <Inventory
					addFish={this.addFish}
					fishes={this.state.fishes}
					loadSamples={this.loadSamples}
					updateFish={this.updateFish}
					removeFish={this.removeFish}
        />
      </div>
    )
  }
}

App.propTypes = {
	params: PropTypes.object
};

export default App;
