import React, { useState } from 'react';
import { PersonFillIcon } from '@primer/octicons-react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [selectedMenu, setSelectedMenu] = useState("Personalize");

  // State to manage selected recipes and items
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [selectedItems, setSelectedItems] = useState(Array(15).fill(false)); // Update to 15 for more items

  const [selectedViewMode, setSelectedViewMode] = useState("Recipe");
  
  // Example list of recipes with images
  const recipes = [
    {
      title: "Spaghetti Bolognese",
      description: "A delicious Italian classic",
      image: "https://www.kitchensanctuary.com/wp-content/uploads/2019/09/Spaghetti-Bolognese-square-FS-0204.jpg",
      ingredients: ["Spaghetti", "Ground beef", "Tomato sauce", "Onion", "Garlic"],
    },
    {
      title: "Chicken Curry",
      description: "Spicy and flavorful",
      image: "https://www.allrecipes.com/thmb/FL-xnyAllLyHcKdkjUZkotVlHR8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/46822-indian-chicken-curry-ii-DDMFS-4x3-39160aaa95674ee395b9d4609e3b0988.jpg",
      ingredients: ["Chicken", "Curry powder", "Coconut milk", "Onion", "Garlic", "Ginger"],
    },
    {
      title: "Grilled Cheese Sandwich",
      description: "A quick and tasty snack",
      image: "https://cdn.loveandlemons.com/wp-content/uploads/2023/01/grilled-cheese.jpg",
      ingredients: ["Bread", "Cheese", "Butter"],
    },
    {
      title: "Caesar Salad",
      description: "Healthy and refreshing",
      image: "https://www.allrecipes.com/thmb/mXZ0Tulwn3x9_YB_ZbkiTveDYFE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/229063-Classic-Restaurant-Caesar-Salad-ddmfs-4x3-231-89bafa5e54dd4a8c933cf2a5f9f12a6f.jpg",
      ingredients: ["Romaine lettuce", "Caesar dressing", "Croutons", "Parmesan cheese"],
    },
    {
      title: "Chocolate Cake",
      description: "Rich and decadent dessert",
      image: "https://hips.hearstapps.com/hmg-prod/images/chocolate-cake-index-64b83bce2df26.jpg?crop=0.6668359143606668xw:1xh;center,top&resize=1200:*",
      ingredients: ["Flour", "Cocoa powder", "Sugar", "Eggs", "Butter", "Milk"],
    },
    {
      title: "Beef Tacos",
      description: "Flavorful beef wrapped in soft tortillas",
      image: "https://www.onceuponachef.com/images/2023/08/Beef-Tacos.jpg",
      ingredients: ["Ground beef", "Taco seasoning", "Tortillas", "Lettuce", "Tomatoes", "Cheese"],
    },
    {
      title: "Vegetable Stir-Fry",
      description: "A mix of fresh vegetables and soy sauce",
      image: "https://www.dinneratthezoo.com/wp-content/uploads/2019/02/vegetable-stir-fry-3.jpg",
      ingredients: ["Mixed vegetables", "Soy sauce", "Garlic", "Ginger"],
    },
    {
      title: "Margarita Pizza",
      description: "Classic pizza topped with tomatoes and mozzarella",
      image: "https://cdn.loveandlemons.com/wp-content/uploads/2023/07/margherita-pizza-recipe.jpg",
      ingredients: ["Pizza dough", "Tomato sauce", "Mozzarella cheese", "Basil"],
    },
    {
      title: "Pancakes",
      description: "Fluffy pancakes served with syrup",
      image: "https://www.allrecipes.com/thmb/WqWggh6NwG-r8PoeA3OfW908FUY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/21014-Good-old-Fashioned-Pancakes-mfs_001-1fa26bcdedc345f182537d95b6cf92d8.jpg",
      ingredients: ["Flour", "Baking powder", "Milk", "Eggs", "Butter", "Sugar"],
    },
    {
      title: "Sushi Rolls",
      description: "Delicious rolls filled with fresh fish and vegetables",
      image: "https://sarahsvegankitchen.b-cdn.net/wp-content/uploads/2023/07/Vegan-California-Rolls-8.jpg",
      ingredients: ["Sushi rice", "Nori", "Cucumber", "Avocado", "Crab meat"],
    },
  ];

  // List of cuisine types
  const cuisineTypes = [
    "Italian",
    "Indian",
    "Mexican",
    "Chinese",
    "Japanese",
    "Mediterranean",
    "Thai",
    "French",
    "Spanish",
    "American",
    "Greek",
    "Vietnamese",
    "Korean",
    "Middle Eastern",
    "Brazilian",
    "Caribbean",
  ];

  // Function to toggle recipe selection
  const toggleSelectRecipe = (index) => {
    setSelectedRecipes((prevSelected) => {
      if (prevSelected.includes(index)) {
        return prevSelected.filter(i => i !== index); // Unselect if already selected
      } else {
        return [...prevSelected, index]; // Select if not selected
      }
    });
  };

  // Function to toggle item selection
  const toggleSelectItem = (index) => {
    setSelectedItems((prevSelected) => {
      const newSelected = [...prevSelected];
      newSelected[index] = !newSelected[index]; // Toggle selection
      return newSelected;
    });
  };

  // Function to handle the "Next" button click
  const handleNext = () => {
    // Move to the next section
    setSelectedMenu(selectedMenu === "Choose" ? "Review" : "Choose");
  };

  // Render the selected recipes in the "Review" section
  const renderSelectedRecipes = () => {
    const selectedRecipeObjects = selectedRecipes.map(index => recipes[index]);
    return selectedRecipeObjects.length > 0 ? (
      selectedRecipeObjects.map((recipe, index) => (
        <div
          key={index}
          className="recipe-container"
          style={{ backgroundColor: '#D9D9D9', display: 'flex', alignItems: 'center', margin: '10px 0', padding: '10px', borderRadius: '8px' }} // Updated style
        >
          <div className="recipe-text">
            <div className="recipe-title">{recipe.title}</div>
            <div className="recipe-description">{recipe.description}</div>
          </div>
          <img src={recipe.image} alt={recipe.title} className="recipe-image" style={{ width: '100px', height: '100px', borderRadius: '8px', marginRight: '10px' }} />
        </div>
      ))
    ) : (
      <div></div>
    );
  };

  // Render content based on selected menu
  const renderContent = () => {
    switch (selectedMenu) {
      case "Personalize":
        return (
          <div className="personalize-content">
            <h1 className="personalize-title">Personalize</h1>

            {/* Cuisine styles section */}
            <div className="menu-descriptor">Choose from the list of cuisine styles</div>
            <div className="personalize-select-container">
              {cuisineTypes.map((cuisine, index) => (
                <div
                  key={index}
                  className={`personalize-select-item ${selectedItems[index] ? 'selected' : ''}`} // Correct class name and condition
                  onClick={() => toggleSelectItem(index)} // Toggle on click
                >
                  {cuisine} {/* Updated to show actual cuisine types */}
                </div>
              ))}
            </div>

            {/* Custom recipe interests section */}
            <div className="menu-descriptor">Add custom recipe interests here</div>

            {/* Text Input Box */}
            <input
              type="text"
              placeholder="Enter your custom recipe interests"
              className="custom-recipe-input"
            />

            {/* Next Button */}
            <div className="next-button-container">
              <button className="next-button" onClick={handleNext}>Next</button>
            </div>
          </div>
        );
      case "Choose":
        return (
          <div className="personalize-content">
            <h1 className="personalize-title">Choose</h1>
            <div className="menu-descriptor">Choose from the list of generated recipes</div>
            <div className="recipes-container">
              {recipes.map((recipe, index) => (
                <div
                  key={index}
                  className={`recipe-container ${selectedRecipes.includes(index) ? 'selected' : ''}`}
                  onClick={() => toggleSelectRecipe(index)} // Toggle recipe selection
                  style={{ backgroundColor: selectedRecipes.includes(index) ? '#D9D9D9' : '#F4F4F4', display: 'flex', alignItems: 'center', margin: '10px 0', padding: '10px', borderRadius: '8px' }} // Updated style
                >
                  
                  <div className="recipe-text">
                    <div className="recipe-title">{recipe.title}</div>
                    <div className="recipe-description">{recipe.description}</div>
                  </div>
                  <img src={recipe.image} alt={recipe.title} className="recipe-image" style={{ width: '100px', height: '100px', borderRadius: '8px', marginRight: '10px' }} />
                </div>
              ))}
            </div>
            {/* Next Button */}
            <div className="next-button-container">
              <button className="next-button" onClick={handleNext}>Next</button>
            </div>
          </div>
        );
      case "Review":
        return (
          <div className="personalize-content">
            <h1 className="personalize-title">Review</h1>
            <div className="menu-descriptor">Review your selections</div>
            <div className='review-mode-container'>
              <button onClick={() => setSelectedViewMode("Recipe")} className={`review-mode-item ${selectedViewMode === "Recipe" ? 'active' : ''}`}>Recipe View</button>
              <button onClick={() => setSelectedViewMode("Ingredient")} className={`review-mode-item ${selectedViewMode === "Ingredient" ? 'active' : ''}`}>Ingredient View</button>
            </div>
            <div className="review-container">
              {selectedViewMode === "Recipe" ? renderSelectedRecipes() : (
                <div>
                  <h3>Ingredients for selected recipes:</h3>
                  <ul>
                    {selectedRecipes.map((index) => (
                      <li key={index}>
                        {recipes[index].title}: {recipes[index].ingredients.join(", ")}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="next-button-container">
              <button className="next-button" onClick={() => alert("Submission logic goes here")}>Submit</button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="top-bar">
          <div className="top-bar-left">
            <img src={logo} className="App-logo" alt="logo" />
            <span className="top-bar-text">Grocery Optimizer</span>
          </div>
          <div className="top-bar-right">
            <div className="user-icon-circle">
              <PersonFillIcon size={24} />
            </div>
          </div>
        </div>
      </header>

      <div className="menu-bar">
        {["Personalize", "Choose", "Review"].map(menuItem => (
          <div
            key={menuItem}
            className={`menu-item ${selectedMenu === menuItem ? 'selected' : ''}`}
            onClick={() => setSelectedMenu(menuItem)}
          >
            {menuItem}
          </div>
        ))}
      </div>

      <div className="content">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;
