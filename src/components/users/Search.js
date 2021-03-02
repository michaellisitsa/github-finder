import React, { useState } from "react";
import PropTypes from "prop-types";

const Search = ({
  searchUsers,
  showClear,
  clearUsers,
  setAlert,
  setAlert1,
}) => {
  const [text, setText] = useState(""); //useState has default value

  //As Search is not a class, you need const before defining the object
  const onSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      setAlert("Please enter something", "light");
      setAlert1("Please enter something1:", "light");
    } else {
      searchUsers(text);
      setText("");
    }
  };

  const onChange = (e) => setText(e.target.value);

  return (
    <div>
      <form onSubmit={onSubmit} className='form'>
        <input
          type='text'
          name='text'
          placeholder='Search Users...'
          value={text}
          onChange={onChange}
        />
        <input
          type='submit'
          value='Search'
          className='btn btn-dark btn-block'
        />
      </form>
      {showClear && (
        <button className='btn btn-light btn-block' onClick={clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
};

//Note proptypes are placed outside the function
Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired,
  setAlert1: PropTypes.func.isRequired,
};

export default Search;
