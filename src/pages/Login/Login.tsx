import { Button, Form, Input, Modal } from "antd";
import { useLogIn } from "../../hooks/useLogIn";
import React, { useState } from "react";

const Login = ({
  isOpen,
  closeWindow,
}: {
  isOpen: boolean;
  closeWindow: () => void;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logIn } = useLogIn();

  const onLogInClick = () => logIn(email, password, closeWindow);

  return (
    <Modal
      open={isOpen}
      title={"Login"}
      footer={null}
      closable={false}
      destroyOnClose={true}
    >
      <Form layout="vertical" autoComplete="off" onFinish={onLogInClick}>
        <Form.Item label="Email" rules={[{ required: true }]}>
          <Input onChange={(e) => setEmail(e.target.value)} value={email} />
        </Form.Item>
        <Form.Item label="Password" rules={[{ required: true }]}>
          <Input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </Form.Item>
        <Form.Item>
          <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              gap: "8px",
            }}
          >
            <Button type="primary" htmlType="submit">
              Login
            </Button>
            <Button onClick={closeWindow}>Cancel</Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Login;
