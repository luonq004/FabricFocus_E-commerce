import { createContext, useContext, useReducer } from "react";

interface UserContextType {
  _id: string | null;
  clerkId: string | null;
  role: string | null;
  login: (user: { _id: string; clerkId: string; role: string }) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

type State = {
  _id: string | null;
  clerkId: string | null;
  role: string | null;
};

const initialState: State = {
  _id: null,
  clerkId: null,
  role: null,
};

type Action =
  | { type: "LOGIN"; payload: { _id: string; clerkId: string; role: string } }
  | { type: "LOGOUT" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        ...action.payload,
      };
    case "LOGOUT":
      return {
        _id: null,
        clerkId: null,
        role: null,
      };
    default:
      return state;
  }
}

function UserInfoProvider({ children }: { children: React.ReactNode }) {
  const [{ _id, role, clerkId }, dispatch] = useReducer(reducer, initialState);

  function login(user: { _id: string; clerkId: string; role: string }) {
    dispatch({ type: "LOGIN", payload: user });
  }

  function logout() {
    dispatch({ type: "LOGOUT" });
  }

  return (
    <UserContext.Provider
      value={{
        _id,
        role,
        clerkId,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

function useUserContext() {
  const context = useContext(UserContext);
  if (context === null)
    throw new Error("useUserContext must be used within a UserInfoProvider");
  return context;
}

export { UserInfoProvider, useUserContext };
