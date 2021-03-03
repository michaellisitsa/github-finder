import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import GithubContext from "../../context/github/githubContext"; //bring in context
// GithubContext passes all the global state into this function

const Search = ({ setAlert, setAlert1 }) => {
  const githubContext = useContext(GithubContext); //initialise context

  const [text, setText] = useState(""); //useState has default value

  //As Search is not a class, you need const before defining the object
  const onSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      setAlert("Please enter something", "light");
      setAlert1("Please enter something1:", "light");
    } else {
      githubContext.searchUsers(text); //call whatever piece of state or action associated with that context
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
      {githubContext.users.length > 0 && (
        <button
          className='btn btn-light btn-block'
          onClick={githubContext.clearUsers}
        >
          Clear
        </button>
      )}
    </div>
  );
};

//Note proptypes are placed outside the function
Search.propTypes = {
  setAlert: PropTypes.func.isRequired,
  setAlert1: PropTypes.func.isRequired,
};

export default Search;
