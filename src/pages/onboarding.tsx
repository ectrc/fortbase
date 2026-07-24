import { useState } from "react";
import Modal from "../modals/modal";

type StepProps = {
  onNext: () => void;
};

const EmailStep = ({ onNext }: StepProps) => {
  return (
    <Modal>
      <Modal.Header
        title="Money Onboarding"
        subtitle="Please answer every step carefully."
      />

      <Modal.Input
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
      />

      <Modal.Button onClick={onNext}>Next</Modal.Button>
    </Modal>
  );
};

const ProfileStep = ({ onNext }: StepProps) => {
  const [accountType, setAccountType] = useState<"personal" | "business">();

  return (
    <Modal>
      <Modal.Header
        title="Account Type"
        subtitle="How are you going to be using Money?"
      />

      <Modal.Choice
        name="account-type"
        value={accountType}
        onChange={setAccountType}
        options={[
          {
            value: "personal",
            label: "Personal",
            description: "Send, spend and manage your money.",
          },
          {
            value: "business",
            label: "Business",
            description:
              "Accept international payments with our integrated tooling.",
          },
        ]}
      />

      <Modal.Button onClick={onNext} disabled={!accountType}>
        Next
      </Modal.Button>
    </Modal>
  );
};

const VerifyStep = ({ onNext }: StepProps) => {
  const [code, setCode] = useState("");

  return (
    <Modal>
      <Modal.Header
        title="Enter your code"
        subtitle="We have sent a security code to your email address."
      />

      <Modal.CodeInput value={code} onChange={setCode} autoFocus />

      <Modal.Button onClick={onNext} disabled={code.length !== 6}>
        Next
      </Modal.Button>
    </Modal>
  );
};

const DoneStep = ({ onNext }: StepProps) => {
  return (
    <Modal>
      <Modal.Header title="All done" subtitle="Your account is ready to use." />

      <Modal.Button onClick={onNext}>Start Over</Modal.Button>
    </Modal>
  );
};

const steps = [EmailStep, ProfileStep, VerifyStep, DoneStep];

const Onboarding = () => {
  const [step, setStep] = useState(0);

  const Step = steps[step];

  return <Step key={step} onNext={() => setStep((step + 1) % steps.length)} />;
};

export default Onboarding;
