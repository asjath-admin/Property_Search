import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import propertiesData from '../data/properties.json';
import Tabs from './Tabs';

function PropertyPage() {
  const { id } = useParams();
  const properties = propertiesData.properties || [];
  const property = properties.find(p => p.id === id);

  // State for main image (click thumbnails to change)
  const [mainImage, setMainImage] = useState(property ? (property.picture || property.images?.[0] || '') : '');

  if (!property) {
    return (
      <div className="property-page">
        <p>Property not found</p>
        <Link to="/" className="btn btn-primary">Back to Search</Link>
      </div>
    );
  }

  // Format date from added object
  const formatDate = () => {
    if (property.added) {
      return `${property.added.month} ${property.added.day}, ${property.added.year}`;
    }
    return property.dateAdded || 'N/A';
  };

  // Tab configuration
  const tabs = [
    {
      label: 'Description',
      content: (
        <div className="tab-description">
          <h3>About this property</h3>
          <p dangerouslySetInnerHTML={{__html: property.description}}></p>
          <ul>
            <li><strong>Type:</strong> {property.type}</li>
            <li><strong>Price:</strong> LKR {property.price.toLocaleString()}</li>
            <li><strong>Bedrooms:</strong> {property.bedrooms}</li>
            {property.tenure && <li><strong>Tenure:</strong> {property.tenure}</li>}
            <li><strong>Location:</strong> {property.location}</li>
            <li><strong>Date Added:</strong> {formatDate()}</li>
          </ul>
          {property.features && (
            <>
              <h3 style={{marginTop: '30px'}}>Property Features</h3>
              <ul className="features-list">
                {property.features.map((feature, index) => (
                  <li key={index}>✓ {feature}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="property-page">
      <Link to="/" className="btn btn-secondary back-button">← Back to Search</Link>

      <h1>LKR {property.price.toLocaleString()}</h1>
      <p className="property-subtitle">{property.bedrooms} bed {property.type} in {property.location}</p>

      {/* Image Gallery */}
      {(property.picture || property.images) && (
        <div className="gallery">
          <div className="main-image">
            <img src={mainImage} alt="Main property view" />
          </div>
          {property.images && property.images.length > 1 && (
            <div className="thumbnails">
              {property.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`View ${index + 1}`}
                  className={mainImage === img ? 'active' : ''}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tabs Component */}
      <Tabs tabs={tabs} />
    </div>
  );
}

export default PropertyPage;
