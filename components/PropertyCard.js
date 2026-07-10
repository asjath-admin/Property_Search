import React from 'react';
import { Link } from 'react-router-dom';

// Simple reusable PropertyCard component for both results and favourites
function PropertyCard({ property, onFavourite, isFavourite, draggable, onDragStart, onDragOver, onDrop }) {
  return (
    <div 
      className="property-card"
      draggable={draggable}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <img src={property.picture || property.images?.[0]} alt={property.type} className="property-image" />
      <div className="property-info">
        <h3>LKR {property.price.toLocaleString()}</h3>
        <p>{property.bedrooms} bed {property.type} - {property.location}</p>
        <p className="property-desc">{property.description.substring(0, 100)}...</p>
        <div className="property-actions">
          <Link to={`/property/${property.id}`} className="btn btn-primary">View Details</Link>
          <button 
            onClick={onFavourite} 
            className={`btn ${isFavourite ? 'btn-remove' : 'btn-secondary'}`}
          >
            {isFavourite ? 'Remove' : 'Add to Favourites'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;
