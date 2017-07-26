import React from 'react';
import AddFishForm from './AddFishForm';

class Inventory extends React.PureComponent {
	constructor() {
		super();
		this.renderInventory = this.renderInventory.bind(this);
	}

	handleChange(e, key) {
		const fish = this.props.fishes[key];
		// take a copy of that fish and update it with the new data
		const updatedFish = {
			...fish,
			[e.target.name]: e.target.value
		};
		this.props.updateFish(key, updatedFish)
		console.log(updatedFish);
	}

	renderInventory(key) {
		const fish = this.props.fishes[key];

		return (
			<div className="fish-edit" key={key}>
				<input
					name="name"
					onChange={(e) => this.handleChange(e, key)}
					placeholder="Fish Name"
					type="text"
					value={fish.name}
				/>
				<input
					name="price"
					onChange={(e) => this.handleChange(e, key)}
					placeholder="Fish Price"
					type="text"
					value={fish.price}
				/>
				<select
					name="status"
					onChange={(e) => this.handleChange(e, key)}
					value={fish.status}
				>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
				<textarea
					name="desc"
					onChange={(e) => this.handleChange(e, key)}
					placeholder="Fish Desc"
					value={fish.desc}>
				</textarea>
				<input
					name="image"
					onChange={(e) => this.handleChange(e, key)}
					placeholder="Fish Image"
					type="text"
					value={fish.image}
				/>
				<button onClick={() => this.props.removeFish(key)}>Remove fish</button>
			</div>
		);
	}

	render() {
		console.log('inventory');
    return (
      <div>
				<h2>Inventory</h2>
				{
					Object
						.keys(this.props.fishes)
						.map(this.renderInventory)
				}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSamples} >Load Sample Fishes</button>
      </div>
    )
  }
}

export default Inventory;
