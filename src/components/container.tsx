import { mergeClasses } from "../util";

export default function Container(props: { children: React.ReactNode; className?: string }) {
  return (
    <div className={mergeClasses("container", props.className)}>
      {props.children}
    </div>
  );
}
