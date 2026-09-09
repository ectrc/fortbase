import { useState } from "react";
import Modal from "../modals/modal";

type StepProps = {
  onNext: () => void;
};

const EmailStep = ({ onNext }: StepProps) => {
  return (
    <Modal>
      <Modal.Header
        title="Account Setup"
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

const ProfileStep = ({ onNext }: StepProps) => {
  const [accountType, setAccountType] = useState<"personal" | "community">();

  return (
    <Modal>
      <Modal.Header
        title="Create an Organisation"
        subtitle="How many end-users will be using your base."
      />

      <Modal.Choice
        name="scale"
        value={accountType}
        onChange={setAccountType}
        options={[
          {
            value: "personal",
            label: "Individual",
            description: "For a small group of friends to play together.",
          },
          {
            value: "community",
            label: "Commmunity",
            description: "Scale for large servers with our integrated tooling.",
          },
        ]}
      />

      <Modal.Button onClick={onNext} disabled={!accountType}>
        Next
      </Modal.Button>
    </Modal>
  );
};

const countries = [
  // { value: "au", title: "Australia", sectionStart: <span>🇦🇺</span> },
  // { value: "ca", title: "Canada", sectionStart: <span>🇨🇦</span> },
  // { value: "dk", title: "Denmark", sectionStart: <span>🇩🇰</span> },
  // { value: "fr", title: "France", sectionStart: <span>🇫🇷</span> },
  // { value: "de", title: "Germany", sectionStart: <span>🇩🇪</span> },
  // { value: "jp", title: "Japan", sectionStart: <span>🇯🇵</span> },
  // { value: "nl", title: "Netherlands", sectionStart: <span>🇳🇱</span> },
  // { value: "es", title: "Spain", sectionStart: <span>🇪🇸</span> },
  // { value: "se", title: "Sweden", sectionStart: <span>🇸🇪</span> },
  { value: "gb", title: "United Kingdom", sectionStart: <span>🇬🇧</span> },
  {
    value: "us",
    title: "United States",
    sectionStart: <span>🇺🇸</span>,
  },
];

const PersonalInformation = ({ onNext }: StepProps) => {
  const [country, setCountry] = useState<string>();

  return (
    <Modal>
      <Modal.Header
        title="Create an Organisation"
        subtitle="Name and choose a region."
      />

      <Modal.Input label="Name" name="name" type="text" />

      <Modal.Dropdown
        label="Server Region"
        name="region"
        options={countries}
        value={country}
        onChange={setCountry}
        searchable
      />

      <span className="text-fg-3 text-sm">
        By creating a Fortbase account, you confirm you're at least 18 years old
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
      <Modal.Header
        title="Welcome to Fortbase"
        subtitle="Your account is ready to use."
      />

      <Modal.Button onClick={onNext}>Continue</Modal.Button>
    </Modal>
  );
};

const steps = [
  EmailStep,
  VerifyStep,
  CreatePassword,
  ProfileStep,
  PersonalInformation,
  DoneStep,
];

const Onboarding = () => {
  const [step, setStep] = useState(0);

  const Step = steps[step];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <Step key={step} onNext={() => setStep((step + 1) % steps.length)} />
    </div>
  );
};

export default Onboarding;
