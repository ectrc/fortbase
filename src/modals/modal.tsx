import Input from "./components/input";
import Button from "./components/button";
import Header from "./components/header";
import CodeInput from "./components/code_input";
import Choice from "./components/choice";
import Dropdown from "./components/dropdown";

type ModalSize = "sm" | "md" | "lg";

type ModalProps = {
  size?: ModalSize;
} & Omit<React.ComponentProps<"div">, "className">;

const ModalRoot = ({ size = "md", ...rest }: ModalProps) => {
  return (
    <div
      {...rest}
      className={`flex flex-col gap-4 max-w-[90vw] p-6 text-fg-1 bg-surface border-main-2 border rounded-lg shadow-2xs ${
        {
          sm: "w-80",
          md: "w-110",
          lg: "w-140",
        }[size]
      }`}
    />
  );
};

const Modal = Object.assign(ModalRoot, {
  Input,
  Button,
  Header,
  CodeInput,
  Choice,
  Dropdown,
});

export default Modal;
