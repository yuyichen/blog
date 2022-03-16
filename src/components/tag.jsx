export default (props) => {
  const { type = 1 } = props;
  const map = {
    1: {
      text: "原创",
      className: "bg-purple-500",
    },
    2: {
      text: "转发",
      className: "bg-blue-500",
    },
  };
  const cfg = map[type];
  return (
    <div
      className={`${cfg.className} inline-block px-3 py-1.5 leading-none rounded-full text-xs font-medium uppercase text-white inline-block ${props.className}`}
    >
      <span>{cfg.text}</span>
    </div>
  );
};
