import { Card, Input, Form, Button } from "antd";
import { useNavigate } from "react-router-dom";

const InviteAdmin = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  return (
    <div>
      <Card bordered={false} className="w-full">
        <div
          className="w-full text-[16px] mb-3 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          Back
        </div>
        <div className="text-xl md:text-3xl font-bold">Invite An Admin</div>

        <Form className="mt-5" form={form}>
          <Form.Item
            name="email"
            label="Email to Invite"
            rules={[{ required: true, message: "Please enter an email" }]}
          >
            <Input />
          </Form.Item>

          <Button type="primary" className="mt-3">
            Send
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default InviteAdmin;
