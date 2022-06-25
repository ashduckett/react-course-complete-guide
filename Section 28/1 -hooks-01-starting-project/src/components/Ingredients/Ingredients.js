import React, { useState, useEffect, useCallback } from 'react';


import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal';

function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  // useEffect(() =>{
  //   fetch('https://react-hooks-update-97da8-default-rtdb.firebaseio.com/ingredients.json').then(response =>
  //     response.json()
  //   ).then(responseData => {
  //     const loadedIngredients = [];
  //     for (const key in responseData) {
  //       loadedIngredients.push({
  //         id: key,
  //         title: responseData[key].title,
  //         amount: responseData.amount
  //       })
  //     }
  //     setUserIngredients(loadedIngredients);
  //   });
  // }, []);

  useEffect(() => {
    console.log('RENDERING INGREDIENTS', userIngredients);
  }, [userIngredients]);

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    setUserIngredients(filteredIngredients);
  }, []);



  const addIngredientHandler = ingredient => {
    console.log(ingredient)
    setIsLoading(true);
    fetch('https://react-hooks-update-97da8-default-rtdb.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      return response.json();
    }).then(responseData => {
      setIsLoading(false);
      setUserIngredients(prevIngredients => [...prevIngredients, { id: responseData.name, ...ingredient }]);  
    });

    
  };

  const removeIngredientHandler = ingredientId => {
    setIsLoading(true);
    fetch(`https://react-hooks-update-97da8-default-rtdb.firebaseio.com/ingredients/${ingredientId}.jon`, {
      method: 'DELETE'
    }).then(response => {
      setUserIngredients(prevIngredients => prevIngredients.filter(ingredient => ingredient.id !== ingredientId));
      setIsLoading(false);
    }).catch(error => {
      setError('Something went wrong!');
      setIsLoading(false);
    });

  };
  
  const clearError = () => {
    setError(null);
  };
  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler} />
        {/* Need to add list here! */}
      </section>
    </div>
  );
}

export default Ingredients;
