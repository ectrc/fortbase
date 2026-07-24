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

const CreatePassword = ({ onNext }: StepProps) => {
  return (
    <Modal>
      <Modal.Header
        title="Create Password"
        subtitle="This is to keep your account secure."
      />

      <Modal.Input
        label="Password"
        name="password"
        type="password"
        autoComplete="new-password"
      />

      <Modal.Button onClick={onNext}>Next</Modal.Button>
    </Modal>
  );
};

const countries = [
  { value: "au", title: "Australia", sectionStart: <span>🇦🇺</span> },
  { value: "ca", title: "Canada", sectionStart: <span>🇨🇦</span> },
  { value: "dk", title: "Denmark", sectionStart: <span>🇩🇰</span> },
  { value: "fr", title: "France", sectionStart: <span>🇫🇷</span> },
  { value: "de", title: "Germany", sectionStart: <span>🇩🇪</span> },
  { value: "jp", title: "Japan", sectionStart: <span>🇯🇵</span> },
  { value: "nl", title: "Netherlands", sectionStart: <span>🇳🇱</span> },
  { value: "es", title: "Spain", sectionStart: <span>🇪🇸</span> },
  { value: "se", title: "Sweden", sectionStart: <span>🇸🇪</span> },
  { value: "gb", title: "United Kingdom", sectionStart: <span>🇬🇧</span> },
  {
    value: "us",
    title: "United States",
    description: "USD accounts only",
    sectionStart: <span>🇺🇸</span>,
  },
];

const PersonalInformation = ({ onNext }: StepProps) => {
  const [country, setCountry] = useState<string>();

  return (
    <Modal>
      <Modal.Header
        title="Create Password"
        subtitle="This is to keep your account secure."
      />

      <Modal.Input label="Legal First Name" />
      <Modal.Input label="Legal Last Name" />
      <Modal.Dropdown
        label="Country"
        name="country"
        options={countries}
        value={country}
        onChange={setCountry}
        searchable
      />

      <span className="text-fg-3 text-sm">
        By creating a Money account, you confirm you're at least 18 years old
        and agree to our{" "}
        <a className="text-accent-3 hover:text-accent-3-hover cursor-pointer hover:underline">
          User Agreement
        </a>
      </span>

      <Modal.Button onClick={onNext}>Next</Modal.Button>
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

const steps = [
  EmailStep,
  ProfileStep,
  VerifyStep,
  CreatePassword,
  PersonalInformation,
  DoneStep,
];

const Onboarding = () => {
  const [step, setStep] = useState(0);

  const Step = steps[step];

  return <Step key={step} onNext={() => setStep((step + 1) % steps.length)} />;
};

export default Onboarding;
