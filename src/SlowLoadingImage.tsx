import { FC, ImgHTMLAttributes, useEffect, useState } from "react";

const SlowLoadingImage: FC<
  {
    width: number;
    height: number;
    src: string;
  } & ImgHTMLAttributes<HTMLImageElement>
> = (props) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) {
      return;
    }

    const img = new Image();
    img.src = props.src;
    img.addEventListener("load", () => {
      setLoaded(true);
    });
  }, [setLoaded]);

  if (!loaded) {
    return (
      <div style={{ width: props.width, height: props.height }}>&nbsp;</div>
    );
  }

  return <img {...props} />;
};

export default SlowLoadingImage;
