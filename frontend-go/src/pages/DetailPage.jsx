import { useGetPostDetailQuery } from "../slices/postsApiSlice";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import DOMPurify from "dompurify";

const RichTextDisplay = ({ content }) => {
  const sanitizedHTML = DOMPurify.sanitize(content);

  return <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />;
};

const DetailPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetPostDetailQuery(id);
  return (
    <div className="w-[600px] mt-8 mx-auto">
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <h1>{data.post.title}</h1>
          <RichTextDisplay content={data.post.content} />
        </div>
      )}
    </div>
  );
};

export default DetailPage;
