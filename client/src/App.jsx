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

const GET_USER_BY_ID = gql`
  query GetUserById($getUserByIdId: ID!) {
    getUserById(id: $getUserByIdId) {
      name
      age
      id
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $age: Int!, $isMarried: Boolean!) {
    createUser(name: $name, age: $age, isMarried: $isMarried) {
      name
    }
  }
`;

const App = () => {
  const {
    loading: getUsersLoading,
    error: getUsersError,
    data: getUsersData,
  } = useQuery(GET_USERS);

  const {
    loading: getUserByIdLoading,
    error: getUserByIdError,
    data: getUserByIdData,
  } = useQuery(GET_USER_BY_ID, {
    variables: { getUserByIdId: "1" },
    skip: !getUsersData, // Skip if getUsersData is not available
  });

  const [createUser] = useMutation(CREATE_USER);

  console.log(getUsersData, "dfd");

  if (getUsersLoading) return <p>Loading...</p>;
  if (getUsersError) return <p>Error: {getUsersError.message}</p>;

  return (
    <div>
      <div>
        <button
          onClick={() =>
            createUser({
              variables: { name: "Arjun", age: 21, isMarried: false },
            })
          }
        >
          Create User
        </button>
      </div>
      <h1>User List</h1>
      {getUsersData.getUsers.map((user) => (
        <div key={user.id}>
          <h2>{user.name}</h2>
          <p>Age: {user.age}</p>
          <p>ID: {user.id}</p>
        </div>
      ))}
      {getUserByIdLoading && <p>Loading user by ID...</p>}
      {getUserByIdError && <p>Error: {getUserByIdError.message}</p>}
      {getUserByIdData && (
        <div>
          <h2>User by ID 1</h2>
          <p>Name: {getUserByIdData.getUserById.name}</p>
          <p>Age: {getUserByIdData.getUserById.age}</p>
          <p>ID: {getUserByIdData.getUserById.id}</p>
        </div>
      )}
    </div>
  );
};

export default App;
