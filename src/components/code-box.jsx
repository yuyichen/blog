import { useRef, useState } from "react";
import copy from "copy-to-clipboard";

export default (props) => {
  const { children, ...rest } = props;
  const [copyed, setCopyed] = useState(false);

  const codeBoxRef = useRef();
  return (
    <code {...rest}>
      <div className="mb-4 flex">
        <div className="flex-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="54"
            height="14"
            viewBox="0 0 54 14"
          >
            <g fill="none" fillRule="evenodd" transform="translate(1 1)">
              <circle
                cx="6"
                cy="6"
                r="6"
                fill="#FF5F56"
                stroke="#E0443E"
                strokeWidth=".5"
              ></circle>
              <circle
                cx="26"
                cy="6"
                r="6"
                fill="#FFBD2E"
                stroke="#DEA123"
                strokeWidth=".5"
              ></circle>
              <circle
                cx="46"
                cy="6"
                r="6"
                fill="#27C93F"
                stroke="#1AAB29"
                strokeWidth=".5"
              ></circle>
            </g>
          </svg>
        </div>
        <span
          className="cursor-pointer text-xs inline-block w-6 text-center"
          onClick={() => {
            copy(codeBoxRef.current?.outerText);
            setCopyed(true);
            setTimeout(() => {
              setCopyed(false);
            }, 1500);
          }}
        >
          {copyed ? "✅" : "复制"}
        </span>
      </div>
      <span ref={codeBoxRef} className="block overflow-auto">
        {children}
      </span>
    </code>
  );
};
