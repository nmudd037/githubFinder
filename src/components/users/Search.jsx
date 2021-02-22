import PropTypes from 'prop-types';
import { useContext, useState } from 'react';

import AlertContext from '../context/alert/AlertContext';
import { clearUsers, searchUsers, useGithub } from '../context/github/GithubState';

const Search = () => {
  const [githubState, githubDispatch] = useGithub();
  const { users } = githubState;
  const { setAlert } = useContext(AlertContext);

  const [text, setText] = useState('');

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (text === '') {
      return setAlert('Please enter a name to search!', 'light');
    }
    searchUsers(githubDispatch, text);
    setText('');
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="form">
        <input
          type="text"
          name="text"
          placeholder="Search Github Users..."
          value={text}
          onChange={onChange}
        />
        <input type="submit" value="Search" className="btn btn-dark btn-block" />
      </form>
      {users.length > 0 && (
        <button className="btn btn-light btn-block" onClick={clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
};

Search.propTypes = {
  setAlert: PropTypes.func,
};

export default Search;
