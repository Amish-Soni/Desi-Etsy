import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { Category } from '../types';

interface FiltersProps {
  categories: Category[];
  priceRange: [number, number];
  setPriceRange: (value: [number, number]) => void;
  selectedCategories: string[];
  toggleCategory: (categoryId: string) => void;
  selectedRating: number | null;
  handleRatingChange: (rating: number) => void;
  clearFilters: () => void;
  renderStars: (rating: number) => React.ReactNode;
}

const Filters: React.FC<FiltersProps> = ({
  categories,
  priceRange,
  setPriceRange,
  selectedCategories,
  toggleCategory,
  selectedRating,
  handleRatingChange,
  clearFilters,
  renderStars,
}) => {
  return (
    <>
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-3">Price Range</h4>
        <div className="flex items-center justify-between text-sm mb-2 text-gray-600">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
        <input type="range" min="0" max="200" step="5" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])} />
      </div>
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-3">Categories</h4>
        {categories.map((category) => (
          <div key={category.id} className="flex items-center mb-2">
            <input type="checkbox" id={`d-category-${category.id}`} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" checked={selectedCategories.includes(category.id)} onChange={() => toggleCategory(category.id)} />
            <label htmlFor={`d-category-${category.id}`} className="ml-2 text-sm text-gray-700 cursor-pointer">{category.name}</label>
          </div>
        ))}
      </div>
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-3">Customer Rating</h4>
        {[4, 3, 2, 1].map((rating) => (
          <div key={rating} className="flex items-center mb-2">
            <input type="radio" id={`d-rating-${rating}`} name="rating" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" checked={selectedRating === rating} onChange={() => handleRatingChange(rating)} />
            <label htmlFor={`d-rating-${rating}`} className="ml-2 text-sm text-gray-700 flex items-center space-x-px cursor-pointer">
              {renderStars(rating)}
              <span className="ml-1 text-gray-600">& Up</span>
            </label>
          </div>
        ))}
      </div>
      <button onClick={clearFilters} className="w-full py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-200 font-medium text-sm">Clear All Filters</button>
    </>
  );
};

export default Filters;