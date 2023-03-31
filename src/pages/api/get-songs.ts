import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  songs: string;
};

type Error = {
  message: string;
};

const GPT_KEY = process.env.GPT_API_KEY;

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${GPT_KEY}`,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { note } = JSON.parse(req.body);

  let basePrompt = `
    Por favor, sugira quatro músicas de nível básico para violão na tonalidade de ${note} maior,
    sem o requisito do capotraste na cifra e com versões simplificadas em sites de cifras.
    Por gentileza, inclua o nome da música, o cantor e o link para a cifra.
    O objetivo é praticar e aprimorar minhas habilidades no violão.
  `;

  console.log(basePrompt)

  try {
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers,
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: basePrompt,
        temperature: 0,
        max_tokens: 550,
      }),
    });

    const songs = await response.json();
    const musicArray = songs.choices[0].text.split("\n").splice(2) as string[];

    res.status(200).json({
      songs: JSON.stringify(musicArray),
    });
  } catch (err) {
    console.log("error: ", err);
  }
}
