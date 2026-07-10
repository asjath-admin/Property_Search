import React, { useState, useEffect } from 'react';
import propertiesData from '../data/properties.json';
import PropertyCard from './PropertyCard';

function SearchPage() {
  // Helper function to convert month name to number
  const getMonthNumber = (monthName) => {
    const months = {
      'January': 0, 'February': 1, 'March': 2, 'April': 3,
      'May': 4, 'June': 5, 'July': 6, 'August': 7,
      'September': 8, 'October': 9, 'November': 10, 'December': 11
    };
    return months[monthName] || 0;
  };

  // State for search filters
  const [filters, setFilters] = useState({
    type: '',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    postcode: '',
    dateAdded: ''
  });

  // State for results and favourites
  const [results, setResults] = useState(propertiesData.properties || []);
  const [favourites, setFavourites] = useState([]);

  // Load favourites from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('favourites');
    if (saved) {
      setFavourites(JSON.parse(saved));
    }
  }, []);

  // Save favourites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  // Filter properties based on ALL criteria
  const handleSearch = () => {
    let filtered = propertiesData.properties || [];

    // Filter by type
    if (filters.type) {
      filtered = filtered.filter(p => p.type === filters.type);
    }

    // Filter by price range
    if (filters.minPrice) {
      filtered = filtered.filter(p => p.price >= parseInt(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(p => p.price <= parseInt(filters.maxPrice));
    }

    // Filter by bedroom range
    if (filters.minBedrooms) {
      filtered = filtered.filter(p => p.bedrooms >= parseInt(filters.minBedrooms));
    }
    if (filters.maxBedrooms) {
      filtered = filtered.filter(p => p.bedrooms <= parseInt(filters.maxBedrooms));
    }

    // Filter by location area
    if (filters.postcode) {
      filtered = filtered.filter(p => 
        p.location && p.location.toLowerCase().includes(filters.postcode.toLowerCase())
      );
    }

    // Filter by date added (properties added after selected date)
    if (filters.dateAdded) {
      filtered = filtered.filter(p => {
        if (p.added) {
          const propDate = new Date(p.added.year, getMonthNumber(p.added.month), p.added.day);
          return propDate >= new Date(filters.dateAdded);
        }
        return false;
      });
    }

    setResults(filtered);
  };

  // Reset all filters and show all properties
  const handleReset = () => {
    setFilters({
      type: '',
      minPrice: '',
      maxPrice: '',
      minBedrooms: '',
      maxBedrooms: '',
      postcode: '',
      dateAdded: ''
    });
    setResults(propertiesData.properties || []);
  };

  // Add/remove favourites (prevent duplicates)
  const toggleFavourite = (property) => {
    const exists = favourites.find(f => f.id === property.id);
    if (exists) {
      setFavourites(favourites.filter(f => f.id !== property.id));
    } else {
      setFavourites([...favourites, property]);
    }
  };

  // Clear all favourites
  const clearFavourites = () => {
    if (window.confirm('Remove all favourites?')) {
      setFavourites([]);
    }
  };

  // Drag and drop for favourites reordering
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (dropIndex) => {
    if (draggedIndex === null) return;
    const newFavourites = [...favourites];
    const draggedItem = newFavourites[draggedIndex];
    newFavourites.splice(draggedIndex, 1);
    newFavourites.splice(dropIndex, 0, draggedItem);
    setFavourites(newFavourites);
    setDraggedIndex(null);
  };

  return (
    <div className="search-page">
      {/* Search Form */}
      <div className="search-form">
        <h2>Search Properties</h2>
        <div className="form-grid">
          <div className="form-group">
            <label>Type:</label>
            <select value={filters.type} onChange={(e) => setFilters({...filters, type: e.target.value})}>
              <option value="">All</option>
              <option value="House">House</option>
              <option value="Flat">Flat</option>
              <option value="Bungalow">Bungalow</option>
            </select>
          </div>

          <div className="form-group">
            <label>Min Price (LKR):</label>
            <input 
              type="number" 
              value={filters.minPrice}
              onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
              placeholder="e.g. 20000000"
            />
          </div>

          <div className="form-group">
            <label>Max Price (LKR):</label>
            <input 
              type="number" 
              value={filters.maxPrice}
              onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
              placeholder="e.g. 80000000"
            />
          </div>

          <div className="form-group">
            <label>Min Bedrooms:</label>
            <input 
              type="number" 
              value={filters.minBedrooms}
              onChange={(e) => setFilters({...filters, minBedrooms: e.target.value})}
              placeholder="e.g. 2"
            />
          </div>

          <div className="form-group">
            <label>Max Bedrooms:</label>
            <input 
              type="number" 
              value={filters.maxBedrooms}
              onChange={(e) => setFilters({...filters, maxBedrooms: e.target.value})}
              placeholder="e.g. 4"
            />
          </div>

          <div className="form-group">
            <label>Location Area:</label>
            <input 
              type="text" 
              value={filters.postcode}
              onChange={(e) => setFilters({...filters, postcode: e.target.value})}
              placeholder="e.g. Orpington BR5"
            />
          </div>

          <div className="form-group">
            <label>Added After:</label>
            <input 
              type="date" 
              value={filters.dateAdded}
              onChange={(e) => setFilters({...filters, dateAdded: e.target.value})}
            />
          </div>
        </div>

        <div className="form-buttons">
          <button onClick={handleSearch} className="btn btn-primary">Search</button>
          <button onClick={handleReset} className="btn btn-secondary">Reset</button>
        </div>
      </div>

      {/* Favourites Section */}
      {favourites.length > 0 && (
        <div className="favourites-section">
          <div className="favourites-header">
            <h2>Favourites ({favourites.length})</h2>
            <button onClick={clearFavourites} className="btn btn-remove">Clear All</button>
          </div>
          <p className="drag-hint">Drag to reorder</p>
          <div className="results-grid">
            {favourites.map((property, index) => (
              <PropertyCard
                key={property.id}
                property={property}
                onFavourite={() => toggleFavourite(property)}
                isFavourite={true}
                draggable={true}
                onDragStart={() => handleDragStart(index)}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(index)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Search Results */}
      <div className="results-section">
        <h2>Results ({results.length})</h2>
        <div className="results-grid">
          {results.map(property => (
            <PropertyCard
              key={property.id}
              property={property}
              onFavourite={() => toggleFavourite(property)}
              isFavourite={favourites.some(f => f.id === property.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
