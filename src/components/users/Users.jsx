import { useGithub } from '../context/github/GithubState';
import Spinner from '../layout/Spinner';
import UserItem from './UserItem';

const Users = () => {
  // we just need the github state without dispatch.
  const githubState = useGithub()[0];
  const { loading, users } = githubState;

  if (loading) {
    return <Spinner />;
  }
  return (
    <div style={userStyle}>
      {users.map((user) => {
        return <UserItem key={user.id} user={user} />;
      })}
    </div>
  );
};

const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  gridGap: '1rem',
};

export default Users;
