import React, { useState, useReducer, useEffect, useCallback } from 'react';


import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal';

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

const httpReducer = (curHttpState, action) => {
  switch(action.type) {
    case 'SEND':
      return { loading: true, error: null };
    case 'RESPONSE':
      return { ...curHttpState, loading: false };
    case 'ERROR':
      return { loading: false, error: action.errorMessage };
    case 'CLEAR':
      return { ...curHttpState, error: null };
    default:
      throw new Error('Should now be reached!');
  }
};


function Ingredients() {
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
  const [httpState, dispatchHttp] = useReducer(httpReducer, { loading: false, error: null });
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
    console.log('RENDERING INGREDIENTS', userIngredients);
  }, [userIngredients]);

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    // setUserIngredients(filteredIngredients);
    console.log('here')
    console.log(filteredIngredients)
    dispatch({ type: 'SET', ingredients: filteredIngredients });
  }, []);



  const addIngredientHandler = useCallback(ingredient => {
    // console.log(ingredient)
    // setIsLoading(true);
    dispatchHttp({ type: 'SEND' });
    fetch('https://react-hooks-update-97da8-default-rtdb.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      return response.json();
    }).then(responseData => {
      // setIsLoading(false);
      dispatchHttp({ type: 'RESPONSE' });


      dispatch({ type: 'ADD', ingredient: { id: responseData.name, ...ingredient } });
      // setUserIngredients(prevIngredients => [...prevIngredients, { id: responseData.name, ...ingredient }]);  
    });

    
  }, []);

  const removeIngredientHandler = useCallback(ingredientId => {
    // setIsLoading(true);
    dispatchHttp( { type: 'SEND' } );
    fetch(`https://react-hooks-update-97da8-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`, {
      method: 'DELETE'
    }).then(response => {
      // setUserIngredients(prevIngredients => prevIngredients.filter(ingredient => ingredient.id !== ingredientId));
      dispatch({ type: 'DELETE', id: ingredientId });
      dispatchHttp( { type: 'RESPONSE' } );
      // setIsLoading(false);
    }).catch(error => {
      // setError('Something went wrong!');
      // setIsLoading(false);
      dispatchHttp({ type: 'ERROR', errorMessage: 'Something went wrong!' });
    });

  }, []);
  
  const clearError = () => {
    dispatchHttp({ type: 'CLEAR' });
  };
  return (
    <div className="App">
      {httpState.error && <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>}
      <IngredientForm onAddIngredient={addIngredientHandler} loading={httpState.loading} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler} />
        {/* Need to add list here! */}
      </section>
    </div>
  );
}

export default Ingredients;
