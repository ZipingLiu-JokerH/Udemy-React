import React, { useState, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = () => {

  const [userIngredients, setUserIngredients] = useState([]);

  const filterIngredientsHandler = useCallback(filterIngredients => {
    setUserIngredients(filterIngredients);
  }, []);

  const addIngredientHandler = ingredient => {
    fetch('https://react-hook-update-9d742.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      return response.json();
    }).then(responseData => {
      setUserIngredients(prevIngredients => [
        ...prevIngredients,
        { id: responseData.name, ...ingredient }
      ]);
    })
  };

  const removeIngredientHandler = id => {
    setUserIngredients(prevIngredients => prevIngredients.filter(ig => ig.id !== id));
  }

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search onLoadIngredients={filterIngredientsHandler} />
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler} />
      </section>
    </div>
  );
}

export default Ingredients;
