import React from 'react';
import PropTypes from 'prop-types';

const ListItem = ({title, id, authors, thumbnail, infoLink, publisher}) => {

  /*
   * The google API returns authors as an array
   * Sometimes, the API doesn't return authors at all.
   * For the most part, the data that comes back is pretty consistent, being arrays of length 1.
   * For the exceptions, this check returns a string of all the authors separated by commas. 
   * The check first looks to see if authors are defined at all (in some cases, authors comes back undefined)
   * Then it checks to see if there is more than one author listed.
   * If there is, map over and separate by comma. If not, just return the first (and only) author.
  */

  const separateAuthors = (arr) => {
    //destructure the reversed array, putting the first entries at the end since es6 doesn't allow destructuring in the beginning
    const [beginning, ...end] = arr.reverse();
    //join the end of the reversed array (the beginning of the original) with commas, and drop ', and ' before the last
    return <span>{`${end.join(', ')}, and ${beginning}`}</span>
  }
  const authorCheck = authors ? authors.length > 1 ? (separateAuthors((authors))) : (<span>{authors[0]}</span>) : (<span>Author Unavailable</span>)

  return(
    <li className="book-item">
    {thumbnail ? (<img src={thumbnail}alt="book" />) : <div className="placeholder"><span className="placeholder-text">No Image Available</span></div>}
      <h4>{title}</h4>
      <p> by {authorCheck}</p>
      <p>Publisher: {publisher ? publisher : "Publisher Unavailable"}</p>
      <p>More Info: <a target="_blank" rel="noopener noreferrer" href={infoLink}>Click Here</a></p>
    </li>
  )
}


ListItem.propTypes = {
  id: PropTypes.number.isRequired,
  authors: PropTypes.arrayOf(PropTypes.string),
  thumbnail: PropTypes.string,
  publisher: PropTypes.string,
  title: PropTypes.string,
  infoLink: PropTypes.string
}

export default ListItem;
