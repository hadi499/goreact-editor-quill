import { useState } from "react";
import { useCreatePostMutation } from "../slices/postsApiSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [createPost] = useCreatePostMutation();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const id = userInfo.id;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createPost({ title, content, user_id: id }).unwrap();
      navigate("/posts");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  var toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"], // toggled buttons

    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ align: [] }],

    ["link", "image"],
    ["clean"],

  ];
  const moduleQuill = {
    toolbar: toolbarOptions,
  };

  return (
    <div className="mt-8 w-[600px] mx-auto">
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-3 bg-blue-200 p-6 rounded-lg shadow-lg"
      >
        <h1 className="text-center text-2xl my-2">Create Post</h1>
        <label htmlFor="title" className="text-lg font-semibold">
          Title
        </label>
        <input
          type="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="px-3 py-1 rounded-lg"
        />

        <label htmlFor="content" className="text-lg font-semibold">
          Content
        </label>
        <div>
          <ReactQuill
            modules={moduleQuill}
            theme="snow"
            value={content}
            onChange={setContent}
            className=" bg-slate-100"
          />
        </div>
        {/* <textarea
          name="content"
          id="content"
          cols="30"
          rows="10"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="px-3 py-1 rounded-lg"
        ></textarea>*/}
        <div className="mt-3">
          <button className="px-3 py-1 bg-slate-700 hover:opacity-80 text-white rounded-lg">
            submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePage;
