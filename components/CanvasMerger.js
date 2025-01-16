import { useRef, useEffect } from "react";

export default function CanvasMerger({ nftData }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const mergeImages = async () => {
      const [baseImage, overlayImage] = await Promise.all(
        nftData.slice(0, 2).map(({ url }) => {
          const img = new Image();
          img.src = url;
          return new Promise((resolve) => {
            img.onload = () => resolve(img);
          });
        })
      );

      ctx.drawImage(baseImage, 0, 0, 400, 400);
      ctx.globalAlpha = 0.5; // Adjust transparency
      ctx.drawImage(overlayImage, 0, 0, 400, 400);
    };

    mergeImages();
  }, [nftData]);

  return <canvas ref={canvasRef} width={400} height={400}></canvas>;
}
