import React from 'react';
import ListItem from './ListItem';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { pageUp, pageDown } from '../actions';

const List = ({ queryResult, offset, pageUp, pageDown }) => {
  const nodes = queryResult.map(book => <ListItem key={book.id} {...book} />)
  return (
    <div className="list-container">
      <ol className="book-list">
        {nodes}
      </ol>
      <div className="button-container">
        <button disabled={offset===0} onClick={pageDown}>Previous Page</button> 
        <button disabled={queryResult.length<40} onClick={pageUp}>Next Page</button>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  offset: state.search.offset
});

List.propTypes = {
  pageUp: PropTypes.func.isRequired,
  pageDown: PropTypes.func.isRequired,
  queryResult: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string),
    image: PropTypes.string,
    publisher: PropTypes.string,
    title: PropTypes.string,
    info: PropTypes.string
  })),
  offset: PropTypes.number.isRequired
}

export default connect(mapStateToProps, { pageUp, pageDown })(List)
