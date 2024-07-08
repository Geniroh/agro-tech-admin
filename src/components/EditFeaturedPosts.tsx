import { useParams } from "react-router-dom";

const EditFeaturedPosts = () => {
  const params = useParams();
  const { id } = params;
  return <div>EditFeaturedPosts {id}</div>;
};

export default EditFeaturedPosts;
