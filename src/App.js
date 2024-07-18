import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import ComposeEmail from "./components/ComposeEmail";
function App() {
  return(
  <Router>
     <Switch > 
            <Route path="/signup">
            <SignUp />
            </Route>
            <Route path="/composeEmail">
            <ComposeEmail />
            </Route>
            <Route path="/">
            <SignIn />
            </Route>
            
     </Switch>
   </Router>
)
}

export default App;
