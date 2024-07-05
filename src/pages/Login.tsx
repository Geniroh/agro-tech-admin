import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../api/resources";
import { AuthService } from "../service/auth.service";
import { useState } from "react";

const Login = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const onFinishedFailed = async () => {
    message.error("Please fill in all fields");
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const values = await form.validateFields();
      const { email, password } = values;

      await AuthService.authenticate(email, password);
      navigate(ROUTES.dashboard);
      form.resetFields();
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
    <main className="w-full h-screen  grid grid-cols-1 md:grid-cols-2">
      <div
        className="w-full h-full items-center justify-center bg-center bg-cover bg-no-repeat relative hidden md:flex"
        style={{
          backgroundImage: "url('/images/combine-harvester-machine.jpg')",
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[#1a1a1ada]"></div>
        <img src="/images/white-logo.png" className="max-w-[200px] relative" />
      </div>
      <div className="w-full h-full flex items-center justify-center px-10 md:px-16">
        <Form
          layout="vertical"
          form={form}
          className="p-5 w-full"
          onFinishFailed={onFinishedFailed}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleLogin();
            }
          }}
        >
          <Link to="/" className="pt-7 flex justify-center">
            <img
              src="/images/green-logo.png"
              className="h-[70px] md:h-[100px] object-contain md:hidden"
              alt=""
            />
          </Link>
          <div className="my-3 md:my-6">
            <h1 className="font-bold text-lg md:text-[30px] leading-[30px]">
              Login
            </h1>
            <h4 className="font-normal text-[#05051B] text-xs md:text-[14px] leading-[24px]">
              Welcome back! please enter your details.
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
              onClick={handleLogin}
            >
              Login
            </Button>
          </div>
        </Form>
      </div>
    </main>
  );
};

export default Login;
