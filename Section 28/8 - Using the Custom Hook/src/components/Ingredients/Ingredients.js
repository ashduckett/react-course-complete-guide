import React, { useState, useReducer, useEffect, useCallback, useMemo } from 'react';


import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal';
import useHttp from '../../hooks/http';

const ingredientReducer = (currentIngredients, action) => {
  switch(action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentIngredients, action.ingredient];
    case 'DELETE':
      return currentIngredients.filter(ing => ing.id !== action.id);
    default:
      throw new Error('Should not get there!');
  }
};




function Ingredients() {
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
  const { isLoading, data, error, sendRequest, reqExtra, reqIdentifier, clear } = useHttp();


//   const [userIngredients, setUserIngredients] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();

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
    if (!isLoading && !error && reqIdentifier === 'REMOVE_INGREDIENT') {
      dispatch({ type: 'DELETE', id: reqExtra });
    } else if (!isLoading && !error && reqIdentifier === 'ADD_INGREDIENT') {
      dispatch({ type: 'ADD', ingredient: {id: data.name, ...reqExtra } });
    }
  }, [data, reqExtra, reqIdentifier, error, isLoading]);

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    dispatch({ type: 'SET', ingredients: filteredIngredients });
  }, []);



  const addIngredientHandler = useCallback(ingredient => {
    sendRequest('https://react-hooks-update-97da8-default-rtdb.firebaseio.com/ingredients.json', 'POST', JSON.stringify(ingredient), ingredient, 'ADD_INGREDIENT');
  }, [sendRequest]);

  const removeIngredientHandler = useCallback(ingredientId => {
   sendRequest(`https://react-hooks-update-97da8-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`, 'DELETE', null, ingredientId, 'REMOVE_INGREDIENT');
  }, [sendRequest]);
  

  const ingredientList = useMemo(() => {
    return (
      <IngredientList 
        ingredients={userIngredients} 
        onRemoveItem={removeIngredientHandler} 
      />
    );
  }, [removeIngredientHandler, userIngredients]);

  return (
    <div className="App">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />

        {/* Need to add list here! */}
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
