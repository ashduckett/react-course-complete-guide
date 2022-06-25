import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const [enteredFilter, setEnteredFilter] = useState('');
  const { onLoadIngredients } = props;
  const inputRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredFilter === inputRef.current.value) {
        const query = enteredFilter.length === 0 ? '' : `?orderBy="title"&equalTo="${enteredFilter}"`;
    
        fetch('https://react-hooks-update-97da8-default-rtdb.firebaseio.com/ingredients.json' + query).then(response =>
          response.json()
        ).then(responseData => {
          const loadedIngredients = [];
          for (const key in responseData) {
            loadedIngredients.push({
              id: key,
              title: responseData[key].title,
              amount: responseData[key].amount
            })
          }
          onLoadIngredients(loadedIngredients);
          // setUserIngredients(loadedIngredients);
        });
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    }
  }, [enteredFilter, onLoadIngredients, inputRef]);
    

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" onChange={event => setEnteredFilter(event.target.value)} ref={inputRef} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
