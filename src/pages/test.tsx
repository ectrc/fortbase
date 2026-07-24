import { useState } from "react";
import Modal from "../modals/modal";
import Onboarding from "./onboarding";

export const TwoFactorModal = () => {
  const [clicked, set] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <Modal>
      <Modal.Header
        title="Enter your code"
        subtitle="We have sent an important security code to your associated email address."
      />

      <Modal.CodeInput
        value={code}
        onChange={(next) => {
          setCode(next);
          set(false);
        }}
        error={clicked ? { message: "Incorrect code. Try again." } : undefined}
        autoFocus
      />

      <Modal.Button
        onClick={() => {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            set(true);
          }, 1500);
        }}
        loading={loading}
        disabled={code.length !== 6}
      >
        Submit
      </Modal.Button>
      <p className="text-accent-3 hover:text-accent-3-hover font-medium cursor-pointer hover:underline">
        Need More Options?
      </p>
    </Modal>
  );
};

export const LoginModal = () => {
  const [clicked, set] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <Modal>
      <Modal.Header
        title="Welcome to Money"
        subtitle="A simple wallet platform with no invasion of privacy."
      />

      <Modal.Input
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
      />
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

      <Modal.Button
        onClick={() => {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            set(true);
          }, 1500);
        }}
        loading={loading}
      >
        Log In
      </Modal.Button>
      <div className="flex flex-row items-center gap-2 w-full">
        <div className="w-full h-[1px] bg-divider"></div>
        <p className="text-xs text-fg-3">or</p>
        <div className="w-full h-[1px] bg-divider"></div>
      </div>
      <Modal.Button variant="secondary">Sign Up</Modal.Button>
    </Modal>
  );
};

const TestPage = () => {
  return (
    <div className="bg-main-1 w-full h-full flex items-center justify-center">
      <Onboarding />
    </div>
  );
};

export default TestPage;
