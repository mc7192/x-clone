import CustomImage from "./Image";

const PostInfo = () => {
  return (
    <div className="cursor-pointer w-4 h-4 relative">
      <CustomImage src="icons/infoMore.svg" alt="" width={16} height={16} />
    </div>
  );
};

export default PostInfo;
