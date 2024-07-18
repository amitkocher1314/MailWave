import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import ComposeEmail from "./components/ComposeEmail";
import Layout from "./components/Layout";
import Inbox from "./components/Inbox";
import Sent from "./components/Sent";
import Starred from "./components/Starred";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/">
          <Layout>
            <Switch>
              <Route path="/composeEmail">
                <ComposeEmail />
              </Route>
              <Route path="/inbox">
                <Inbox />
              </Route>
              <Route path="/sent">
                <Sent />
              </Route>
              <Route path="/starred">
                <Starred />
              </Route>
              {/* Redirect to inbox by default */}
              <Route path="/">
                <Inbox />
              </Route>
            </Switch>
          </Layout>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
