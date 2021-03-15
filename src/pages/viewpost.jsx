import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fstore, increment } from "../utils/fb";

function ViewPost() {
  let params = useParams();
  let [post, setPost] = useState(undefined);
  let [content, setContent] = useState(undefined);

  async function loadContent() {
    setPost(undefined);
    setContent(undefined);

    let doc = await fstore.collection("blog-contents").doc(params.docid).get();
    setContent(doc.data().content);

    doc = await fstore.collection("blog-posts").doc(params.docid).get();
    setPost(doc);
  }

  useEffect(() => {
    fstore
      .collection("blog-posts")
      .doc(params.docid)
      .update({ views: increment(1) });
  }, []);

  useEffect(() => {
    loadContent();
  }, [params.docid]);

  if (post === undefined || content === undefined) {
    return <div>Loading ... </div>;
  }

  return (
    <div>
      <h3>{post.data().title}</h3>
      <div>{post.data().views}</div>
      <div>{format(post.data().date.toDate(), "yyyy-MM-dd")}</div>
      <hr />
      <div className="preformatted">{content}</div>
    </div>
  );
}

export default ViewPost;
