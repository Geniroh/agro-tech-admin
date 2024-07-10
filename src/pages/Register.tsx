import { Form, Input, Button, message } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../api/resources";
import { useMutation } from "react-query";
import { api } from "../api/api";
import { useState } from "react";

const Register = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const params = useParams();
  const navigate = useNavigate();

  const { id } = params;

  const onFinishedFailed = async () => {
    message.error("Please fill in all fields");
  };

  const validateRegisterToken = async (email: string) => {
    const { data } = await api.get(`/invite/check/${id}?email=${email}`);
    return data;
  };

  const registerNewAdmin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const { data } = await api.post("/auth/register", { email, password });
    return data;
  };

  const { mutateAsync } = useMutation(registerNewAdmin, {
    onSuccess: () => {
      message.success("Registered successfully");
    },
    onError: () => {
      message.error("Registration failed");
    },
  });

  const handleRegister = async () => {
    setIsLoading(true);
    try {
      const values = await form.validateFields();

      const isAproved = await validateRegisterToken(values.email);

      if (isAproved.approve) {
        mutateAsync({
          email: values.email,
          password: values.password,
        });

        form.resetFields();
        navigate(ROUTES.dashboard);
      } else {
        message.error("Sorry we could not validate your invite");
      }
      //eslint-disable-next-line
    } catch (error: any) {
      if (error?.response?.data) {
        message.error(error?.response?.data?.error);
      } else {
        message.error("Network Error");
      }
    }
    setIsLoading(false);
  };

  return (
    <main className="w-full h-screen flex justify-center items-center py-5 md:py-10">
      <div className="h-full flex items-center justify-center px-10 md:px-16 w-full max-w-[500px] shadow-lg rounded-xl border">
        <Form
          layout="vertical"
          form={form}
          className="p-5 w-full"
          onFinishFailed={onFinishedFailed}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleRegister();
            }
          }}
        >
          <Link to="/" className="pt-7 flex justify-center">
            <img
              src="/images/green-logo.png"
              className="h-[70px] md:h-[100px] object-contain"
              alt=""
            />
          </Link>
          <div className="my-3 md:my-6">
            <h1 className="font-bold text-lg md:text-[30px] leading-[30px]">
              Register
            </h1>
            <h4 className="font-normal text-[#05051B] text-xs md:text-[14px] leading-[24px]">
              Please enter your details.
            </h4>
          </div>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter email address" }]}
          >
            <Input
              size="large"
              type="email"
              placeholder="Enter your email"
              className="rounded-none"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password
              size="large"
              placeholder="Enter your password"
              className="rounded-none"
            />
          </Form.Item>

          <div className="flex gap-5">
            <Button
              type="primary"
              className="bg-primary"
              block
              size="large"
              loading={isLoading}
              disabled={isLoading}
              onClick={handleRegister}
            >
              Register
            </Button>
          </div>
        </Form>
      </div>
    </main>
  );
};

export default Register;
