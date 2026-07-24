import { useState } from "react";
import Modal from "../modals/modal";

const TestPage = () => {
  const [clicked, set] = useState(false);

  return (
    <div className="bg-main-1 w-full h-full flex items-center justify-center">
      <Modal>
        <Modal.Header
          title="Welcome to Money"
          subtitle="Enter the main dashboard"
        />

        <Modal.Input label="Email" name="email" type="email" autoComplete="email" />
        <Modal.Input
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          error={
            clicked
              ? {
                  message: "This password is invalid.",
                }
              : undefined
          }
        />

        <p className="text-accent-3 hover:text-accent-3-hover font-medium cursor-pointer hover:underline">
          Forgotten Password?
        </p>
        <Modal.Button onClick={() => set(true)}>Log In</Modal.Button>

        <div className="flex flex-row items-center gap-2 w-full">
          <div className="w-full h-[1px] bg-divider"></div>
          <p className="text-xs text-fg-3">or</p>
          <div className="w-full h-[1px] bg-divider"></div>
        </div>

        <Modal.Button variant="secondary">Sign Up</Modal.Button>
      </Modal>
    </div>
  );
};

export default TestPage;
