import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  Link,
  useParams
} from "react-router-dom";
import { fstore } from "../utils/fb";

function List() {
  let [titles, setTitles] = useState([]);
  let [page, setPage] = useState(1);
  let [reachedEnd, setReachedEnd] = useState(false);

  useEffect(() => {
    loadTitles();
  }, []);

  async function loadTitles() {
    const snapshot = await fstore
      .collection("blog-posts")
      .orderBy("date", "desc")
      .limit(3)
      .get();
    setTitles(snapshot.docs);
  }

  async function loadNext() {
    const snapshot = await fstore
      .collection("blog-posts")
      .orderBy("date", "desc")
      .startAfter(titles[titles.length - 1])
      .limit(3)
      .get();
    setTitles(snapshot.docs);
    if (snapshot.docs.length < 3) setReachedEnd(true);
    setPage(page + 1);
  }

  async function loadPrev() {
    const snapshot = await fstore
      .collection("blog-posts")
      .orderBy("date", "desc")
      .endBefore(titles[0])
      .limit(3)
      .get();
    setTitles(snapshot.docs);
    setPage(page - 1);
  }
  return (
    <div className="App">
      <h1>Hello</h1>
      {titles.map((t) => (
        <div key={t.id}>
          <Link to={`/post/${t.data().title.replaceAll(" ", "-")}/${t.id}`}>
            {t.data().title}
          </Link>
        </div>
      ))}

      <div>
        {page === 1 ? undefined : (
          <a href="#" onClick={loadPrev}>
            Prev
          </a>
        )}
        {reachedEnd ? undefined : (
          <a href="#" onClick={loadNext}>
            Next
          </a>
        )}
      </div>
    </div>
  );
}

export default List;
