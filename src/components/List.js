import React from 'react';
import ListItem from './ListItem';

const List = ({ queryResult }) => {
  const nodes = queryResult.map(book => <ListItem {...book} />)
  return (
    <ol className="book-list">
      {nodes}
    </ol>
  )
}
export default List;
