import React from 'react';
import PropTypes from 'prop-types';

const ListItem = ({title, etag, authors, image, info, publisher}) => {

  /*
   * The google API returns authors as an array
   * Sometimes, the API doesn't return authors at all.
   * For the most part, the data that comes back is pretty consistent, being arrays of length 1.
   * For the exceptions, this check returns a string of all the authors separated by commas. 
   * Not exactly the cleanest solution, and leads to some awkward formatting when viewed, but it gets the job done.
   * The check first looks to see if authors are defined at all (in some cases, authors comes back undefined)
   * Then it checks to see if there is more than one author listed.
   * If there is, map over and separate by comma. If not, just return the first (and only) author.
  */
  const authorCheck = authors ? authors.length > 1 ? (authors.map(author => <span>{author}, </span>)) : (<span>{authors[0]}</span>) : (<span>Author Unavailable</span>)

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
