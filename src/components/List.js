import React from 'react';
import ListItem from './ListItem';

const List = ({ queryResult }) => {
  const nodes = queryResult.map(book => <ListItem key={book.id} {...book} />)
  return (
    <ol className="book-list">
      {nodes}
    </ol>
  );
};
export default List;
