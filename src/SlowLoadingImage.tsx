import { FC, ImgHTMLAttributes, useEffect, useState } from "react";

const SlowLoadingImage: FC<
  {
    width: number;
    height: number;
    src: string;
    alt: string;
  } & ImgHTMLAttributes<HTMLImageElement>
> = ({ width, height, src, alt, ...props }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) {
      return;
    }

    const img = new Image();
    img.src = src;
    img.addEventListener("load", () => {
      setLoaded(true);
    });
  }, [setLoaded, loaded, src]);

  if (!loaded) {
    return <div style={{ width, height }}>&nbsp;</div>;
  }

  return <img {...props} alt={alt} src={src} />;
};

export default SlowLoadingImage;
