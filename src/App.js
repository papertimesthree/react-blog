import {
  BrowserRouter,
  Route,
  Switch,
  Link,
  useParams
} from "react-router-dom";
import "./styles.css";
import List from "./pages/list";
import ViewPost from "./pages/viewpost";
import WriteForm from "./pages/writeform";

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <h1>
          <Link to="/">WK Blog</Link>
        </h1>
      </nav>

      <Switch>
        <Route exact path="/" component={List} />
        <Route path="/post/:title/:docid" component={ViewPost} />
        <Route path="/write" component={WriteForm} />
      </Switch>
    </BrowserRouter>
  );
}
