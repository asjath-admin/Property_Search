import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SearchPage from './components/SearchPage';
import '@testing-library/jest-dom';

// Helper to render with router
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Search Filtering Tests', () => {
  
  test('1. Filter by property type', () => {
    renderWithRouter(<SearchPage />);
    
    // Select "house" type
    const typeSelect = screen.getByRole('combobox');
    fireEvent.change(typeSelect, { target: { value: 'house' } });
    
    // Click search
    const searchButton = screen.getAllByRole('button').find(btn => btn.textContent === 'Search');
    fireEvent.click(searchButton);
    
    // Should show only houses (3 houses in data)
    const results = screen.getByText(/Results \(3\)/i);
    expect(results).toBeInTheDocument();
  });

  test('2. Filter by price range', () => {
    renderWithRouter(<SearchPage />);
    
    // Set price range 20000000-60000000 (20M-60M LKR)
    const inputs = screen.getAllByRole('spinbutton');
    const minPrice = inputs[0];
    const maxPrice = inputs[1];
    fireEvent.change(minPrice, { target: { value: '20000000' } });
    fireEvent.change(maxPrice, { target: { value: '60000000' } });
    
    // Click search
    const searchButton = screen.getAllByRole('button').find(btn => btn.textContent === 'Search');
    fireEvent.click(searchButton);
    
    // Should show properties in range (4 properties)
    const results = screen.getByText(/Results \(4\)/i);
    expect(results).toBeInTheDocument();
  });

  test('3. Filter by bedroom range', () => {
    renderWithRouter(<SearchPage />);
    
    // Set bedroom range 3-4
    const inputs = screen.getAllByRole('spinbutton');
    const minBed = inputs[2];
    const maxBed = inputs[3];
    fireEvent.change(minBed, { target: { value: '3' } });
    fireEvent.change(maxBed, { target: { value: '4' } });
    
    // Click search
    const searchButton = screen.getAllByRole('button').find(btn => btn.textContent === 'Search');
    fireEvent.click(searchButton);
    
    // Should show 3-4 bedroom properties (4 properties)
    const results = screen.getByText(/Results \(4\)/i);
    expect(results).toBeInTheDocument();
  });

  test('4. Reset filters shows all properties', () => {
    renderWithRouter(<SearchPage />);
    
    // Apply some filters
    const typeSelect = screen.getByRole('combobox');
    fireEvent.change(typeSelect, { target: { value: 'flat' } });
    
    const buttons = screen.getAllByRole('button');
    const searchButton = buttons.find(btn => btn.textContent === 'Search');
    fireEvent.click(searchButton);
    
    // Click reset
    const resetButton = buttons.find(btn => btn.textContent === 'Reset');
    fireEvent.click(resetButton);
    
    // Should show all 7 properties
    const results = screen.getByText(/Results \(7\)/i);
    expect(results).toBeInTheDocument();
  });

});

describe('Favourites Logic Tests', () => {
  
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  test('5. Add property to favourites', () => {
    renderWithRouter(<SearchPage />);
    
    // Find first "Add to Favourites" button
    const addButtons = screen.getAllByText(/Add to Favourites/i);
    fireEvent.click(addButtons[0]);
    
    // Favourites section should appear with count 1
    const favouritesHeading = screen.getByText(/Favourites \(1\)/i);
    expect(favouritesHeading).toBeInTheDocument();
  });

  test('6. Prevent duplicate favourites', () => {
    renderWithRouter(<SearchPage />);
    
    // Add same property twice
    const addButtons = screen.getAllByText(/Add to Favourites/i);
    fireEvent.click(addButtons[0]);
    
    // Button should now say "Remove"
    const allButtons = screen.getAllByRole('button');
    const removeButton = allButtons.find(btn => btn.textContent === 'Remove' && !btn.textContent.includes('Clear'));
    expect(removeButton).toBeInTheDocument();
    
    // Click remove
    fireEvent.click(removeButton);
    
    // Favourites section should disappear
    const favouritesHeading = screen.queryByText(/Favourites \(/i);
    expect(favouritesHeading).not.toBeInTheDocument();
  });

});
