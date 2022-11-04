import { useEffect, useState } from "react";
import qrcode from "qrcode";

export default ({ node, ...props }) => {
  const { src, children, ...rest } = props;
  const [imgSrc, setImgSrc] = useState();

  const getImgSrc = async (url) => {
    setImgSrc(await qrcode.toDataURL(url));
  };

  useEffect(() => {
    if (src) {
      getImgSrc(src);
    }
  }, [src]);

  return !!imgSrc && <img src={imgSrc} {...rest} />;
};
