import { fstore } from "../utils/fb";

function WriteForm() {
  async function onSubmit(event) {
    event.preventDefault();
    let formData = Object.fromEntries(new FormData(event.target));

    let contentData = { content: formData.content };
    let postData = {
      title: formData.title,
      date: new Date(),
      views: 0,
      comments: 0
    };

    let ref = await fstore.collection("blog-posts").add(postData);
    await fstore.collection("blog-contents").doc(ref.id).set(contentData);
    alert("Done!");
    event.target.reset();
  }
  return (
    <form onSubmit={onSubmit}>
      <div>
        title: <input name="title" />
      </div>
      <div>
        <textarea name="content" rows={20} style={{ width: "100%" }} />
      </div>
      <div>
        <button>Submit</button>
      </div>
    </form>
  );
}

export default WriteForm;
