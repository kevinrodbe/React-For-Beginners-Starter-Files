import React from 'react';
import { formatPrice } from '../helpers';
import PropTypes from 'prop-types';

const Fish = (props) => {
  const { details, index, addToOrder } = props;
  const isAvailable = details.status === 'available';
  const buttonText = isAvailable ? 'Add To Order' : 'Sold Out';

  return (
    <li className="menu-fish">
      <img src={details.image} alt={details.name} />
      <h3 className="fish-name">
        {details.name}
        <span className="price">{formatPrice(details.price)}</span>
      </h3>
      <p>{details.desc}</p>
      <button
        disabled={!isAvailable}
        onClick={ () => addToOrder(index) } >
          {buttonText}
      </button>
    </li>
  )
}

Fish.propTypes = {
	addToOrder: PropTypes.func.isRequired,
	details: PropTypes.object.isRequired,
	index: PropTypes.string.isRequired
};

export default Fish;
