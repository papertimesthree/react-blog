import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  Link,
  useParams
} from "react-router-dom";
import "./styles.css";
import { fstore } from "./utils/fb";

export default function App() {
  return (
    <BrowserRouter>
      <h1>WK Blog</h1>

      <hr />
      <List />
      <hr />

      <Switch>
        {/* <Route exact path="/" component={List} /> */}
        <Route path="/post/:title/:docid" component={ViewPost} />
      </Switch>
    </BrowserRouter>
  );
}

function List() {
  let [titles, setTitles] = useState([]);

  async function loadTitles() {
    const snapshot = await fstore
      .collection("blog-posts")
      .orderBy("date", "desc")
      .get();
    setTitles(snapshot.docs);
  }

  useEffect(() => {
    loadTitles();
  }, []);

  let [x, setX] = useState(1);
  return (
    <div className="App">
      <h1>Hello - {x}</h1>
      {titles.map((t) => (
        <div key={t.id}>
          <Link to={`/post/${t.data().title.replaceAll(" ", "-")}/${t.id}`}>
            {t.data().title}
          </Link>
        </div>
      ))}
    </div>
  );
}

function ViewPost() {
  let params = useParams();
  let [content, setContent] = useState("loading...");

  async function loadContent() {
    setContent("Loading...");
    let doc = await fstore.collection("blog-contents").doc(params.docid).get();
    setContent(doc.data().content);
  }
  useEffect(() => {
    loadContent();
  }, [params.docid]);
  return (
    <div>
      <h3>{params.title}</h3>
      <div>{content}</div>
    </div>
  );
}
