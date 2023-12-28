import axios from 'axios';

// Fetch initial data
const fetchData = async () => {
  try {
    const response = await axios.get('/api/auth/status');
    return response.data;
  } catch (error) {
    // Handle error or set default values
    console.error('Error fetching initial data:', error);
    return { loggedIn: false };
  }
};

// Reducer function
const authReducer = (state = { loggedIn: false }, action) => {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        loggedIn: true,
      };
    case 'logout':
      return {
        ...state,
        loggedIn: false,
      };
    default:
      return state;
  }
};

// Async initialization
const initializeAuthState = async () => {
  const data = await fetchData();
  const initialState = { loggedIn: data.loggedIn };
  return initialState;
};

// Export an async function that resolves to the initialized state
export const initializeAuth = async () => {
  const initialState = await initializeAuthState();
  return { auth: initialState };
};

export default authReducer;
