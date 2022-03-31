import { Route, Redirect } from "react-router-dom";

function PublicRoute({ children, isAuthenticated, ...rest }) {
  console.log(isAuthenticated);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        !isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PublicRoute;
