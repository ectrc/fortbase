import { useState } from "react";
import * as rr from "@tanstack/react-router";

import Modal from "../../modals/modal";
import type { AuthMode } from "./routes";

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

const Divider = () => (
  <div className="flex flex-row items-center gap-2 w-full">
    <div className="w-full h-[1px] bg-divider"></div>
    <p className="text-xs text-fg-3">or</p>
    <div className="w-full h-[1px] bg-divider"></div>
  </div>
);

type SwitchModeProps = {
  mode: AuthMode;
  children: React.ReactNode;
};

const SwitchModeButton = (props: SwitchModeProps) => {
  const navigate = rr.useNavigate({ from: "/auth" });

  return (
    <Modal.Button
      variant="secondary"
      onClick={() => navigate({ search: { mode: props.mode } })}
    >
      {props.children}
    </Modal.Button>
  );
};

export const LoginModal = () => {
  const [clicked, set] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <Modal>
      <Modal.Header
        title="Welcome to Fortbase"
        subtitle="A simple platform with no technical skills needed."
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
      <Divider />
      <SwitchModeButton mode="register">Sign Up</SwitchModeButton>
    </Modal>
  );
};

export const RegisterModal = () => {
  const [clicked, set] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <Modal>
      <Modal.Header
        title="Create your account"
        subtitle="A simple platform with no technical skills needed."
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
        autoComplete="new-password"
      />
      <Modal.Input
        label="Confirm Password"
        name="confirm_password"
        type="password"
        autoComplete="new-password"
        error={
          clicked
            ? {
                message: "Passwords do not match.",
              }
            : undefined
        }
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
      >
        Sign Up
      </Modal.Button>
      <Divider />
      <SwitchModeButton mode="login">Log In</SwitchModeButton>
    </Modal>
  );
};

const AuthPage = () => {
  const { mode } = rr.useSearch({ from: "/auth" });

  return (
    <div className="bg-main-1 w-full h-full flex items-center justify-center">
      {mode === "register" ? <RegisterModal /> : <LoginModal />}
    </div>
  );
};

export default AuthPage;
