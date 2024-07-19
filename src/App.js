import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import ComposeEmail from "./components/ComposeEmail";
import Layout from "./components/Layout";
import Inbox from "./components/Inbox";
import Sent from "./components/Sent";
import Starred from "./components/Starred";
import EmailInboxDetail from "./components/EmailInboxDetail";
import EmailSentDetail from "./components/EmailSentDetail";
import { useSelector } from "react-redux";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Router>
      <Switch>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
        {isAuthenticated ? (
          <Layout>
            <Switch>
              <Route path="/composeEmail">
                <ComposeEmail />
              </Route>
              <Route path="/inbox" exact>
                <Inbox />
              </Route>
              <Route path="/inbox/:id">
                <EmailInboxDetail />
              </Route>
              <Route path="/sent" exact>
                <Sent />
              </Route>
              <Route path="/sent/:id">
                <EmailSentDetail />
              </Route>
              <Route path="/starred">
                <Starred />
              </Route>
              <Route path="/">
                <Inbox />
              </Route>
            </Switch>
          </Layout>
        ) : (
          <Redirect to="/signin" />
        )}
      </Switch>
    </Router>
  );
}

export default App;
