import clsx from 'clsx'

export default function Container(props: { children: React.ReactNode; className?: string }) {
  return (
    <div className={clsx("container", props.className)}>
      {props.children}
    </div>
  );
}
