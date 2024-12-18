import axios from "axios";
import React, { useEffect } from "react";
import "boxicons";
interface ImagePreviewProps {
  alt: string;
  image: string;
}

const ImagePreviewFromAPI: React.FC<ImagePreviewProps> = ({ image, alt }) => {
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/${image}`, {
          responseType: "blob",
        });

        const url = URL.createObjectURL(response.data);
        setImageUrl(url);
      } catch (err) {
        console.error("Error fetching the image:", err);
      }
    };
    fetchImage();
  }, [image]);

  // Tambahkan pengecekan sebelum memanggil .split()
  const imageFor = image?.split("/")[1];

  if (!image || !imageUrl) {
    return (
      <div className="flex justify-center items-center w-[16rem] h-[16rem] rounded-full bg-gray-200">
        <i className="bx bx-user text-gray-500 text-9xl"></i>
      </div>
    );
  }

  return imageFor === "avatar" ? (
    <div>
      <img
        src={imageUrl ?? ""}
        alt={alt}
        className="w-[16rem] h-[16rem] rounded-full object-cover aspect-auto box-border "
      />
    </div>
  ) : (
    <div>
      <img
        src={imageUrl ?? ""}
        alt={alt}
        className="w-[16rem] h-[16rem] rounded-full object-cover aspect-auto box-border "
      />
    </div>
  );
};

export default ImagePreviewFromAPI;
