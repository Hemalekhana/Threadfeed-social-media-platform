import { useState } from "react";
import axios from "axios";

const Ai = ({ setAiImage }) => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (!prompt.trim()) {
      alert("Please enter a description before generating an image.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/images/generations",
        {
          model: "dall-e-3",
          prompt: prompt,
          n: 1,
          size: "512x512",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer YOUR_OPENAI_API_KEY`,
          },
        }
      );

      if (response.data?.data?.length > 0) {
        setAiImage(response.data.data[0].url);
      } else {
        alert("Failed to generate AI image. Please try again.");
      }
    } catch (error) {
      console.error("Error generating image:", error);
      alert("Something went wrong while generating the image.");
    }

    setLoading(false);
  };

  return (
    <div className="p-4 border rounded-lg">
      <input
        type="text"
        placeholder="Describe the image..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="border p-2 w-full rounded-md"
      />
      <button
        onClick={generateImage}
        className={`mt-2 px-4 py-2 rounded-md text-white ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
        }`}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate AI Image"}
      </button>
    </div>
  );
};

export default Ai;
