import React from 'react';
import PropTypes from 'prop-types';

const ListItem = ({title, etag, authors, image, info, publisher}) => {

  const authorCheck = authors.length > 1 ? (authors.map(author => <span>{author}, </span>)) : (<span>{authors[0]}</span>)

  return(
    <li className="book-item" key={etag}>
      <img src={image} alt="book" />
      <p>{title}, by {authorCheck}</p> 
      <p>Publisher: {publisher}</p>
      <p>More Info: <a href={info}>Click Here</a></p>
    </li>
  )
}


ListItem.propTypes = {
  etag: PropTypes.string.isRequired,
  authors: PropTypes.arrayOf(PropTypes.string),
  image: PropTypes.string,
  publisher: PropTypes.string,
  title: PropTypes.string,
  info: PropTypes.string
}

export default ListItem;
