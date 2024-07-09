// import { useParams } from "react-router-dom";
// import { api } from "../api/api";
// import { useQuery } from "react-query";
// import { useState } from "react";
// import { IFeaturedPosts } from "../types";
// import {
//   message,
//   Skeleton,
//   Card,
//   Form,
//   Input,
//   Upload,
//   Select,
//   Button,
//   Radio,
// } from "antd";
// import ImgCrop from "antd-img-crop";
// import type { RadioChangeEvent, UploadProps } from "antd";
// import ReactPlayer from "react-player";
// import { BACKEND_API } from "../constants";
// import { VALUE_CHAIN_OPTIONS } from "../constants";

// const EditFeaturedPosts = () => {
//   const [post, setPost] = useState<IFeaturedPosts | null>(null);
//   const [choice, setChoice] = useState<string>("image");
//   const [mediaUrl, setMediaUrl] = useState<string>();
//   const { id } = useParams<{ id: string }>();

//   const [form] = Form.useForm();

//   // const onFinishFailed = () => {
//   //   message.error("Please fill ")
//   // }

//   const getPost = async (id: string) => {
//     const { data } = await api.get(`/featured/${id}`);
//     return data;
//   };

//   const { isLoading } = useQuery(["get-post-id", id], () => getPost(id!), {
//     enabled: !!id, // Ensure the query only runs if id is defined
//     onSuccess: (data) => {
//       setPost(data);
//     },
//     onError: () => {
//       message.error("Network Error");
//     },
//   });

//   const props: UploadProps = {
//     name: "file",
//     action: `${BACKEND_API}/upload`,
//     showUploadList: { showRemoveIcon: false },
//     listType: "picture-card",
//     maxCount: 1,
//     onChange(info) {
//       if (info.file.status === "done") {
//         if (info.file.response && info.file.response.file.url) {
//           const mediaUrl = info.file.response.file.url;
//           setMediaUrl(mediaUrl);
//           //  setFileList([info.file]);
//         } else {
//           message.error("Failed to upload file");
//         }
//       } else if (info.file.status === "error") {
//         message.error(`${info.file.name} file upload failed.`);
//       }
//     },
//   };

//   const handleChoice = (e: RadioChangeEvent) => {
//     setChoice(e.target.value);
//     setMediaUrl("");
//     form.resetFields(["mediaUrl"]);
//   };

//   if (isLoading) {
//     return <Skeleton />;
//   }

//   return (
//     <div>
//       <Card bordered={false} className="w-full">
//         <div className="text-xl md:text-3xl font-bold">Add New Post</div>

//         <Form className="mt-5" form={form}>
//           <Form.Item name="title" label="Title">
//             <Input />
//           </Form.Item>
//           <Form.Item name="tag" label="Tag">
//             <Select
//               mode="tags"
//               allowClear
//               className="w-full"
//               placeholder=""
//               filterSort={(optionA, optionB) =>
//                 (optionA?.label ?? "")
//                   .toLowerCase()
//                   .localeCompare((optionB?.label ?? "").toLowerCase())
//               }
//               options={VALUE_CHAIN_OPTIONS}
//             />
//           </Form.Item>

//           <Form.Item label="Media Type">
//             <Radio.Group onChange={handleChoice} defaultValue={"image"}>
//               <Radio value="image"> Image upload </Radio>
//               <Radio value="video"> Video Upload </Radio>
//               <Radio value="link"> Video Link </Radio>
//             </Radio.Group>
//           </Form.Item>

//           {choice !== "link" && (
//             <Form.Item
//               label="Media"
//               valuePropName="fileList"
//               // getValueFromEvent={() => fileList}
//               // rules={[
//               //   { required: true, message: "Please upload a media file" },
//               // ]}
//             >
//               {choice === "image" && (
//                 <ImgCrop aspect={16 / 9}>
//                   <Upload {...props}>
//                     <button
//                       style={{ border: 0, background: "none" }}
//                       type="button"
//                     >
//                       {/* <PlusOutlined /> */}
//                       <div style={{ marginTop: 8 }}>Upload Image</div>
//                     </button>
//                   </Upload>
//                 </ImgCrop>
//               )}

//               {choice === "video" && (
//                 <Upload {...props}>
//                   <button
//                     style={{ border: 0, background: "none" }}
//                     type="button"
//                   >
//                     {/* <PlusOutlined /> */}
//                     <div style={{ marginTop: 8 }}>Upload Video</div>
//                   </button>
//                 </Upload>
//               )}
//             </Form.Item>
//           )}

//           {choice === "link" && (
//             <Form.Item
//               name="mediaUrl"
//               label="Media"
//               rules={[{ required: true, message: "Please enter a video link" }]}
//             >
//               <Input onChange={(e) => setMediaUrl(e.target.value)} />
//             </Form.Item>
//           )}

//           {choice === "link" && (
//             <div>
//               Preview:
//               <div className="w-[150px] h-[150px]">
//                 <ReactPlayer
//                   url={mediaUrl}
//                   width="100%"
//                   height="100%"
//                   muted={true}
//                   playing={true}
//                   controls={false}
//                   config={{
//                     youtube: {
//                       playerVars: {
//                         showinfo: 0,
//                         controls: 0,
//                         modestbranding: 1,
//                       },
//                     },
//                   }}
//                 />
//               </div>
//             </div>
//           )}

//           <Button
//             type="primary"
//             className="mt-3"
//             // loading={isLoading}
//           >
//             Submit Post
//           </Button>
//         </Form>
//       </Card>
//     </div>
//   );
// };

// export default EditFeaturedPosts;

import { useParams } from "react-router-dom";
import { api } from "../api/api";
import { useMutation, useQuery } from "react-query";
import { useState } from "react";
import { IFeaturedPosts } from "../types";
import {
  message,
  Skeleton,
  Card,
  Form,
  Input,
  Select,
  Button,
  Radio,
} from "antd";
import type { RadioChangeEvent } from "antd";
import { VALUE_CHAIN_OPTIONS } from "../constants";
import { FeaturedCard } from "./FeaturedCard";
import { useNavigate } from "react-router-dom";

const EditFeaturedPosts = () => {
  const [post, setPost] = useState<IFeaturedPosts>();
  const [choice, setChoice] = useState<boolean>();
  const [mediaUrl, setMediaUrl] = useState<string>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [form] = Form.useForm();

  const getPost = async (id: string) => {
    const { data } = await api.get(`/featured/${id}`);
    return data;
  };

  const { isLoading } = useQuery(["get-post-id", id], () => getPost(id!), {
    enabled: !!id,
    onSuccess: (data) => {
      setMediaUrl(data.mediaUrl);
      setPost(data);
      form.setFieldsValue({
        title: data.title,
        tag: data.tag,
        mediaUrl: data.mediaUrl,
      });
    },
    onError: () => {
      message.error("Network Error");
    },
  });

  const editPost = async ({
    id,
    values,
  }: {
    id: string;
    values: { tag?: string[]; title?: string; mediaUrl?: string };
  }) => {
    const { data } = await api.patch(`/featured/edit/${id}`, values);
    return data;
  };

  const { mutateAsync, isLoading: isEditing } = useMutation(editPost, {
    onSuccess: () => {
      message.success("Post edited");
      form.resetFields();
    },
    onError: (err: any) => {
      if (err.error) {
        message.error(err.error.toString());
      } else {
        message.error("Failed to edit post");
      }
    },
  });

  const handleChoice = (e: RadioChangeEvent) => {
    setChoice(e.target.value);
  };

  const handleEdit = async () => {
    try {
      const values = await form.validateFields();
      if (id) {
        await mutateAsync({ id, values });
      }
    } catch (error) {
      message.error("Failed to edit post");
    }
  };

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <div>
      <Card bordered={false} className="w-full">
        <div
          className="w-full text-[16px] mb-3 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          Back
        </div>
        <div className="text-xl md:text-3xl font-bold">Edit Post</div>

        <Form className="mt-5" form={form}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter a title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="tag"
            label="Tag"
            rules={[{ required: true, message: "Please select a tag" }]}
          >
            <Select
              mode="tags"
              allowClear
              className="w-full"
              placeholder=""
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={VALUE_CHAIN_OPTIONS}
            />
          </Form.Item>

          <Form.Item label="Edit Media">
            <Radio.Group onChange={handleChoice}>
              <Radio value={true}> Yes </Radio>
              <Radio value={false}>No</Radio>
            </Radio.Group>
          </Form.Item>

          <Button
            type="primary"
            className="mt-3"
            onClick={handleEdit}
            loading={isEditing}
          >
            Edit Post
          </Button>

          <div className="mt-3">
            {choice && (
              <>
                <Form.Item
                  name="mediaUrl"
                  label="Media"
                  rules={[
                    { required: true, message: "Please enter a media link" },
                  ]}
                >
                  <Input onChange={(e) => setMediaUrl(e.target.value)} />
                </Form.Item>
                <div>
                  Preview:
                  <div className="w-[350px] h-[150px]">
                    {post && id && (
                      <FeaturedCard
                        id={id}
                        title={post?.title}
                        tags={post?.tag}
                        url={mediaUrl || ""}
                      />
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* <div>
            Preview:
            <div className="w-[350px] h-[150px]">
              {post && id && (
                <FeaturedCard
                  id={id}
                  title={post?.title}
                  tags={post?.tag}
                  url={post?.mediaUrl}
                />
              )}
            </div>
          </div> */}
        </Form>
      </Card>
    </div>
  );
};

export default EditFeaturedPosts;
