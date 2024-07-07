// import { Button, Card, Form, Input, Select, Upload } from "antd";
// import { PlusOutlined } from "@ant-design/icons";
// import { useState } from "react";
// import { VALUE_CHAIN_OPTIONS } from "../constants";
// import ImgCrop from "antd-img-crop";

// const FeaturedPosts = () => {
//   const [showAddForm, setShowAddForm] = useState<boolean>(false);

//   const [form] = Form.useForm();

//   //eslint-disable-next-line
//   const normFile = (e: any) => {
//     if (Array.isArray(e)) {
//       return e;
//     }
//     console.log(e?.fileList);
//     return e?.fileList;
//   };
//   return (
//     <div>
//       <Card bordered={false} className="w-full">
//         <div className="text-xl md:text-3xl font-bold">Featured Posts</div>
//         <div className="mt-5 w-full flex justify-end">
//           <Button
//             type={!showAddForm ? "primary" : "default"}
//             onClick={() => setShowAddForm(!showAddForm)}
//           >
//             {!showAddForm ? "Add New" : "Cancel"}
//           </Button>
//         </div>

//         <Form className="mt-5" form={form}>
//           <Form.Item label="Title">
//             <Input />
//           </Form.Item>
//           <Form.Item label="Tag">
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

//           <Form.Item
//             label="Media"
//             valuePropName="fileList"
//             getValueFromEvent={normFile}
//           >
//             <ImgCrop cropperProps={{ cropSize: { height: 400, width: 600 }}}>
//               <Upload
//                 action="http://localhost:3000/api/v1/upload"
//                 listType="picture-card"
//               >
//                 <button style={{ border: 0, background: "none" }} type="button">
//                   <PlusOutlined />
//                   <div style={{ marginTop: 8 }}>Upload</div>
//                 </button>
//               </Upload>
//             </ImgCrop>
//           </Form.Item>
//           <Form.Item label="Button">
//             <Button>Button</Button>
//           </Form.Item>
//         </Form>
//       </Card>
//     </div>
//   );
// };

// export default FeaturedPosts;

// import { Button, Card, Form, Input, Select, Upload, message } from "antd";
// import { PlusOutlined } from "@ant-design/icons";
// import { useState } from "react";
// import { VALUE_CHAIN_OPTIONS } from "../constants";
// import ImgCrop from "antd-img-crop";

// const FeaturedPosts = () => {
//   const [showAddForm, setShowAddForm] = useState<boolean>(false);
//   const [fileList, setFileList] = useState<any[]>([]);
//   const [isImage, setIsImage] = useState<boolean>(true);

//   const [form] = Form.useForm();

//   // Ensure only a single file is uploaded
//   const handleChange = ({ fileList: newFileList:, file }) => {
//     if (newFileList.length > 1) {
//       newFileList = [newFileList[newFileList.length - 1]];
//     }

//     const extension = file.name.split('.').pop()?.toLowerCase();
//     const imageExtensions = ["jpg", "jpeg", "png", "gif"];
//     setIsImage(imageExtensions.includes(extension));

//     setFileList(newFileList);
//   };

//   //eslint-disable-next-line
//   const normFile = (e: any) => {
//     if (Array.isArray(e)) {
//       return e;
//     }
//     console.log(e?.fileList);
//     return e?.fileList;
//   };

//   return (
//     <div>
//       <Card bordered={false} className="w-full">
//         <div className="text-xl md:text-3xl font-bold">Featured Posts</div>
//         <div className="mt-5 w-full flex justify-end">
//           <Button
//             type={!showAddForm ? "primary" : "default"}
//             onClick={() => setShowAddForm(!showAddForm)}
//           >
//             {!showAddForm ? "Add New" : "Cancel"}
//           </Button>
//         </div>

//         <Form className="mt-5" form={form}>
//           <Form.Item label="Title">
//             <Input />
//           </Form.Item>
//           <Form.Item label="Tag">
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

//           <Form.Item
//             label="Media"
//             valuePropName="fileList"
//             getValueFromEvent={normFile}
//           >
//             {isImage ? (
//               <ImgCrop aspect={16 / 9}>
//                 <Upload
//                   action="http://localhost:3000/api/v1/upload"
//                   listType="picture-card"
//                   fileList={fileList}
//                   onChange={handleChange}
//                   onRemove={() => setFileList([])}
//                 >
//                   {fileList.length < 1 && (
//                     <button style={{ border: 0, background: "none" }} type="button">
//                       <PlusOutlined />
//                       <div style={{ marginTop: 8 }}>Upload</div>
//                     </button>
//                   )}
//                 </Upload>
//               </ImgCrop>
//             ) : (
//               <Upload
//                 action="http://localhost:3000/api/v1/upload"
//                 listType="picture-card"
//                 fileList={fileList}
//                 onChange={handleChange}
//                 onRemove={() => setFileList([])}
//               >
//                 {fileList.length < 1 && (
//                   <button style={{ border: 0, background: "none" }} type="button">
//                     <PlusOutlined />
//                     <div style={{ marginTop: 8 }}>Upload</div>
//                   </button>
//                 )}
//               </Upload>
//             )}
//           </Form.Item>

//           <Form.Item label="Button">
//             <Button>Button</Button>
//           </Form.Item>
//         </Form>
//       </Card>
//     </div>
//   );
// };

// export default FeaturedPosts;

import {
  Button,
  Card,
  Form,
  Input,
  Select,
  Upload,
  Radio,
  RadioChangeEvent,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { VALUE_CHAIN_OPTIONS } from "../constants";
import ImgCrop from "antd-img-crop";
import type { UploadProps } from "antd";

const FeaturedPosts = () => {
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [fileList, setFileList] = useState<any[]>([]);
  const [choice, setChoice] = useState<string>("image");
  const [mediaUrl, setMediaUrl] = useState<string>();

  const [form] = Form.useForm();

  const props: UploadProps = {
    name: "file",
    action: "http://localhost:8080/upload",
    showUploadList: { showRemoveIcon: false },
    listType: "picture-card",
    maxCount: 1,
    onChange(info) {
      if (info.file.status === "done") {
        if (info.file.response && info.file.response) {
          const mediaUrl = info.file.response.file.url;
          setMediaUrl(mediaUrl);
          setFileList(info.file.response.file);
        } else {
          message.error("Failed to upload file");
        }
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const handleChoice = (e: RadioChangeEvent) => {
    setChoice(e.target.value);
  };

  const onFinishFailed = () => {
    message.error("Please fill in all required fields");
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      console.log(values);
    } catch (error) {
      message.error("Something went wrong!");
    }
  };

  return (
    <div>
      <Card bordered={false} className="w-full">
        <div className="text-xl md:text-3xl font-bold">Featured Posts</div>
        <div className="mt-5 w-full flex justify-end">
          <Button
            type={!showAddForm ? "primary" : "default"}
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {!showAddForm ? "Add New" : "Cancel"}
          </Button>
        </div>

        <Form className="mt-5" form={form} onFinishFailed={onFinishFailed}>
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

          <Form.Item label="Media Type">
            <Radio.Group onChange={handleChoice} defaultValue={"image"}>
              <Radio value="image"> Image upload </Radio>
              <Radio value="video"> Video Upload </Radio>
              <Radio value="link"> Video Link </Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="media"
            label="Media"
            valuePropName="fileList"
            rules={[{ required: true, message: "Please upload a media file" }]}
          >
            {choice === "image" && (
              <ImgCrop aspect={16 / 9}>
                <Upload {...props} maxCount={1}>
                  <button
                    style={{ border: 0, background: "none" }}
                    type="button"
                  >
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload Image</div>
                  </button>
                </Upload>
              </ImgCrop>
            )}

            {choice === "video" && (
              <Upload {...props}>
                <button style={{ border: 0, background: "none" }} type="button">
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload Video</div>
                </button>
              </Upload>
            )}

            {choice === "link" && <Input />}
          </Form.Item>

          <Button type="primary" onClick={handleSubmit}>
            Submit Post
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default FeaturedPosts;
