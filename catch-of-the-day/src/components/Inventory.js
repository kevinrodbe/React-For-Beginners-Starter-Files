import React from 'react';
import AddFishForm from './AddFishForm';
import PropTypes from 'prop-types';
import firebase from 'firebase';

class Inventory extends React.PureComponent {
	constructor() {
		super();
		this.authHandler = this.authHandler.bind(this);
		this.authenticate = this.authenticate.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.logout = this.logout.bind(this);
		this.renderInventory = this.renderInventory.bind(this);
		this.renderLogin = this.renderLogin.bind(this);
		this.state = {
			uid: null,
			owner: null
		};
	}

	componentDidMount() {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.authHandler({ user });
			}
		});
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

	authenticate(loginFrom) {
		let provider;
		switch (loginFrom) {
			case 'github':
				provider = new firebase.auth.GithubAuthProvider();
				break;
			case 'facebook':
				provider = new firebase.auth.FacebookAuthProvider();
				break;
			case 'twitter':
				provider = new firebase.auth.TwitterAuthProvider();
				break;
			default:
				return;
		}
		firebase.auth()
			.signInWithPopup(provider)
			.then(this.authHandler)
			.catch(function aEPrFn(err) {
				console.log(err);
			});
	}

	logout() {
		console.log('bye');
		firebase.auth().signOut();
		this.setState({
			uid: null
		});
	}

	authHandler(authData) {
		console.log(authData);

		// grab the store info
		const storeRef = firebase.database().ref(this.props.storeId);

		// query the firebase once for the store data
		storeRef.once('value', (snapshot) => {
			const data = snapshot.val() || {};
			console.log(data);
			// claim it as our own if there is no owner already
			if (!data.owner) {
				storeRef.set({
					owner: authData.user.uid
				});
			}

			this.setState({
				uid: authData.user.uid,
				owner: data.owner || authData.user.uid
			});
		});

	}

	renderLogin() {
		return(
			<nav className="login">
				<h2>Inventory</h2>
				<p>Sign in to manage your store&apos;s inventory</p>
				<button
					className="github"
					onClick={() => this.authenticate('github')}
				>
					Log In with Github
				</button>
				<button
					className="facebook"
					onClick={() => this.authenticate('facebook')}
				>
					Log In with Facebook
				</button>
				<button
					className="twitter"
					onClick={() => this.authenticate('twitter')}
				>
					Log In with Twitter
				</button>
			</nav>
		);
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
		const logout = <button onClick={this.logout}>Log Out!</button>

		// check if they are no logged in at all
		if (!this.state.uid) {
			return <div>{this.renderLogin()}</div>
		}

		// check if they are the owner of the current store
		if (this.state.uid !== this.state.owner) {
			return(
				<div>
					<p>Sorry, you aren&apos;t the owner of this store!</p>
					{logout}
				</div>
			);
		}

    return (
      <div>
				<h2>Inventory</h2>
				{logout}
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

Inventory.propTypes = {
	addFish: PropTypes.func.isRequired,
	fishes: PropTypes.object.isRequired,
	loadSamples: PropTypes.func.isRequired,
	removeFish: PropTypes.func.isRequired,
	storeId: PropTypes.string.isRequired,
	updateFish: PropTypes.func.isRequired
};

export default Inventory;
