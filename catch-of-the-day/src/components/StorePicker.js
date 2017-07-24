import React from 'react';
import PropTypes from 'prop-types';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  /*
  constructor() {
    super();
    this.goToStore = this.goToStore.bind(this);
  }
  */

  goToStore(e) {
    e.preventDefault();
    // 1. grab the text from the box
    const storeId = this.storeInput.value;
    // 2. we're going to transition from / to /store/:storeId
    this.context.router.history.push(`/store/${storeId}`);
  }

  render() {
    return (
      <form className="store-selector" onSubmit={ (e) => this.goToStore(e) } >
        <h2>Please enter a Store</h2>
        <input
          type="text"
          required
          placeholder="Store name"
          defaultValue={getFunName()}
          ref={(input) => { this.storeInput = input; }} />
        <button type="submit">Visit Store</button>
      </form>
    )
  }
}

// tell React that the StorePicker component expects something called "router"
// and React will say "ok, I'll make this 'router' available to you"
StorePicker.contextTypes = {
  router: PropTypes.object
}

export default StorePicker;