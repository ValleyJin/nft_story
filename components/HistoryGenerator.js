import { useState } from "react";
import axios from "axios";

export default function HistoryGenerator({ nftData, account, onGenerate }) {
  const [loading, setLoading] = useState(false);

  const generateHistory = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/generatePersona", {
        nftData,
        account,
      });
      onGenerate(response.data);
    } catch (error) {
      console.error("Error generating history", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={generateHistory} disabled={loading}>
        {loading ? "생성 중..." : "가상 국가 시나리오 생성"}
      </button>
    </div>
  );
}
