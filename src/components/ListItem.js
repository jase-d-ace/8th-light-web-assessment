import React from 'react';

const ListItem = ({title, etag, authors, image, info, publisher}) => (
  <li key={etag}>
    <span>{title}, by {authors[0]}</span> 
    <img src={image} alt="book" />
    <p>Publisher: {publisher}</p>
      <p>More Info: <a href={info}>Click Here</a></p>
  </li>
);

export default ListItem
