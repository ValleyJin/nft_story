import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export default async function handler(req, res) {
  const { nftData, account } = req.body;

  const nftDescriptions = nftData.map(
    (nft, index) => `NFT ${index + 1}: ${nft.name}`
  ).join("\n");

  // 2 version : Korean, English 
  const prompt = `
    NFT 기반 국가를 설정하십시오. NFT의 정보:
    ${nftDescriptions}
    이를 기반으로 의인화된 키워드와 5000자 분량의 스토리를 생성하십시오.
    // 스토리라인 예시를 추가하여, 내용은 달라도 형식은 동일하도록 유도
  `;

  try {
    const response = await openai.createCompletion({
      model: "GPT-4o",
      prompt,
      max_tokens: 5000, 
    });

    res.status(200).json(response.data.choices[0].text);
  } catch (error) {
    console.error("Error with OpenAI API", error);
    res.status(500).json({ error: "Failed to generate persona" });
  }
}
