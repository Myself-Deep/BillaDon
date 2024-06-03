# Billa-Don Discord Bot

A Discord bot powered by OpenAI API and built with npm

# Setup
## Prerequisites
- Node.js v20.14.0 or later
- Rename the file `example.env` to `.env`

## Installation

- Clone the repo

```sh
git clone https://github.com/Myself-Deep/BillaDon.git
```

- Change directory to the cloned path

```sh
cd BillaDon
```

- Install required packages

```sh
  npm init -y
  npm install discord.js dotenv openai
```

- Get a API key from https://platform.openai.com/api-keys

- Enter your OpenAI API key in `.env`

```env
  OPENAI_API_KEY = Your OpenAI API Key
```

## Create a Discord bot

- Go to https://discord.com/developers/applications & create an application

- Get the token from the bot settings
![image](https://github.com/Myself-Deep/BillaDon/assets/168259354/8cb9da90-12e9-41ee-98a5-03ead21a4af5)

- Store the token to `.env` under the `BOT_TOKEN`

```env
  BOT_TOKEN = Your Discord Bot Token
```

- Turn `ON` PRESENCE INTENT, SERVER MEMBERS INTENT, MESSAGE CONTENT INTENT
<img height="250" width="620" alt="image" src="https://github.com/Myself-Deep/BillaDon/assets/168259354/fbeeb337-7347-44f6-aac7-243ebdef5670">

- Invite your bot to your server via OAuth2 URL Generator
<img height="50" width="550" alt="image" src="https://github.com/Myself-Deep/BillaDon/assets/168259354/0d806a85-4c4d-45cd-9c24-ec2e0fd1b940">


## Channel Connection

- Go Discord setting turn `developer mode` on
- `Copy Channel ID` where you want to recieve the message
<img height="390" width="380" alt="image" src="https://github.com/Myself-Deep/BillaDon/assets/168259354/9d3344b6-14d2-4c88-91d8-ebb8ab69a395">

- Enter your channel ID
<img height="55" width="470" alt="image" src="https://github.com/Myself-Deep/BillaDon/assets/168259354/27c2112a-f2e9-4fe4-ba4e-52d43f5aff21">


## Usage

```env
  node billa.js
```

https://github.com/Myself-Deep/BillaDon/assets/168259354/55e00332-e405-4930-97e7-8454af9cad5c

## Contributing
Pull requests are welcome! Please open an issue first to discuss any changes you would like to make.
