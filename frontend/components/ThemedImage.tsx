import React, { useContext } from "react";
import AppContext from "../AppContext/Context";
import Image, { ImageProps } from "next/image";

interface IImage extends ImageProps {
  /**
   * This is the image which will be shown when then data theme is being used
   */
  darksrc?: ImageProps["src"];
}

const ThemedImage: React.FC<IImage> = (props) => {
  const { theme } = useContext(AppContext);
  let src = props.src;
  if (theme === "dark") src = props.darksrc || props.src;
  return <Image {...props} src={src} alt={props.alt} />;
};

export default ThemedImage;
