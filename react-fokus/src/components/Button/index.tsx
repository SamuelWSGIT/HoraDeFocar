import { Icon } from "../Icon";
import styles from "./Button.module.css";

interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  icon?: React.ComponentProps<typeof Icon>["name"];
  name?: string;
  type?: "button" | "submit" | "reset";
  value?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function Button({
  children,
  disabled = false,
  icon,
  name,
  type = "button",
  value,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={styles.button}
      disabled={disabled}
      name={name}
      type={type}
      value={value}
      onClick={onClick}
    >
      {icon && <Icon name={icon} size="sm" />}
      {children}
    </button>
  );
}
