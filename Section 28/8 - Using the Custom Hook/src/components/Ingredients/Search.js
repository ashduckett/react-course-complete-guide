import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';
import useHttp from '../../hooks/http';
import ErrorModal from '../UI/ErrorModal';

const Search = React.memo(props => {


  const [enteredFilter, setEnteredFilter] = useState('');
  const { onLoadIngredients } = props;
  const inputRef = useRef();
  const { isLoading, data, error, sendRequest, clear } = useHttp();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredFilter === inputRef.current.value) {
        const query = enteredFilter.length === 0 ? '' : `?orderBy="title"&equalTo="${enteredFilter}"`;
        
        sendRequest('https://react-hooks-update-97da8-default-rtdb.firebaseio.com/ingredients.json' + query, 'GET');

        // fetch('https://react-hooks-update-97da8-default-rtdb.firebaseio.com/ingredients.json' + query).then(response =>
        //   response.json()
        // ).then(responseData => {
        //   const loadedIngredients = [];
        //   for (const key in responseData) {
        //     loadedIngredients.push({
        //       id: key,
        //       title: responseData[key].title,
        //       amount: responseData[key].amount
        //     })
        //   }
        //   onLoadIngredients(loadedIngredients);
        //   // setUserIngredients(loadedIngredients);
        // });
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    }
  }, [enteredFilter, inputRef, sendRequest]);
  
  useEffect(() => {
    if (!isLoading && !error && data) {
      const loadedIngredients = [];
        for (const key in data) {
          loadedIngredients.push({
            id: key,
            title: data[key].title,
            amount: data[key].amount
          })
        }
        onLoadIngredients(loadedIngredients);
    }
  }, [isLoading, error, data, onLoadIngredients])

  return (
    <section className="search">
      { error && <ErrorModal onClose={clear}>{error}</ErrorModal> }
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          {isLoading && <span>Loading...</span>}
          <input type="text" onChange={event => setEnteredFilter(event.target.value)} ref={inputRef} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
