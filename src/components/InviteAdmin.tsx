import { Card, Input, Form, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";
import { useMutation } from "react-query";

const InviteAdmin = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const inviteAnAdmin = async (email: string) => {
    const { data } = await api.post("/invite", { email });
    return data;
  };

  const { mutateAsync, isLoading } = useMutation(inviteAnAdmin, {
    onSuccess: () => {
      message.success("Invitation sent successfully");
    },
    onError: () => {
      message.error("Error sending Invitation!");
    },
  });

  const handleInvite = async () => {
    try {
      const values = await form.validateFields();

      await mutateAsync(values.email);

      form.resetFields();
    } catch (error) {
      message.error("Fill in all fields");
    }
  };
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

          <Button
            type="primary"
            className="mt-3"
            onClick={handleInvite}
            loading={isLoading}
          >
            Send
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default InviteAdmin;
