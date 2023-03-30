# 🎵 Toca ai uma música

## 📝 Sobre
uando estamos começando a aprender a tocar um instrumento, pode ser difícil tocar uma música de cabeça quando estamos em um ambiente com várias pessoas reunidas e alguém pede uma música. Para ajudar com isso, o "Toca aí uma música" pode recomendar músicas com base em parâmetros definidos pelo usuário.
Facilitando a buscar por musicas em sites de cifras.

## 💡 Funcionamento
A aplicação receberá um input com informações fornecidas pelo usuário, tais como seu nível de habilidade no violão, estilo de música desejado, acordes preferidos e número de musicas desejadas. Após receber esses dados, a aplicação irá se comunicar com a API do ChatGPT, enviando as informações como entrada para a API. A resposta da API será uma lista de músicas sugeridas, juntamente com os acordes que devem ser utilizados em cada música.

## ⚙️ Requerimentos

Obter a API key

Configure a api key do GPT no arquivo .env.local (veja o exemplo .example.env.local):

GPT_API_KEY=open-ai-api-GPT_API_KEY

## 🚀 Como rodar a aplicação

1. Faça o clone do repositorio

```sh
git clone git@github.com:igorjcl/toca-ai-uma-musica
```

2. Instalação das dependências

```sh
npm install

# ou yarn, pnpm, etc...
```

3. Iniciar aplicação
   
```sh
npm run dev
```

