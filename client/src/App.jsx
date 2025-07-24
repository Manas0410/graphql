import { useQuery, useMutation, gql } from "@apollo/client";

const GET_USERS = gql`
  query getUsers {
    getUsers {
      age
      id
      name
    }
  }
`;

const App = () => {
  const { loading, error, data } = useQuery(GET_USERS);
  console.log(data, "dfd");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>User List</h1>
      {data.getUsers.map((user) => (
        <div key={user.id}>
          <h2>{user.name}</h2>
        </div>
      ))}
    </div>
  );
};

export default App;
