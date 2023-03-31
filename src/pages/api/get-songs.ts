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

  let basePrompt = `Você poderia listar quatro músicas com apenas quatro acordes na tonalida de ${note} para violão? Gostaria de pelo menos quatro músicas diferentes e de nível básico, para que eu possa praticar. Me lista o nome da música, o cantor e o link do site com a cifra.  `;

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
