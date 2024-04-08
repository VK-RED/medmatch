# Medmatch
#### Medmatch is an open source platform to test your knowledge specifically on Obstetrics and Gynecology. Practice in an interview environment with simulated scenarios with our AI.

## Tech Stack

- [Next.js](https://nextjs.org/)                 - Framework
- [TypeScript](https://www.typescriptlang.org/)  - Language
- [Langchain](https://js.langchain.com/docs/get_started/introduction) - LLM Framework.
- [Prisma](https://www.prisma.io/)               - ORM
- [NextAuth.js](https://next-auth.js.org/)       - Authentication
- [PostgreSql](https://www.postgresql.org/)      - Database
- [Retell Client SDK](https://www.retellai.com/) - SDK for Real Time Agent Response
- [Tailwind](https://tailwindcss.com/)           - CSS
- [shadcn/ui](https://ui.shadcn.com/)            - Component Library
- [Acteternityui](https://ui.aceternity.com/)    - Component Library

## Development

### Setup

- Clone the repo to your local machine using the following command :

```
git clone https://github.com/VK-RED/medmatch
```
- Navigate to the project's root folder

```
cd medmatch
```
- Setup the env variables

```
cp .env.example .env
```
- Use `openssl rand -base64 32` to generate a key and add it under `NEXTAUTH_SECRET` in the .env file.
- Use your own API keys for the following environment variables `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `DATABASE_URL`, `OPENAI_API_KEY` in the .env file

- This project uses _yarn_ as the package manager. Install all the dependencies in the root folder using the command

```
yarn
```
- Run the Prisma Migrations using the following command

```
yarn migrate:db
```


- Now run the Project using the command

```
yarn dev
```

- Now you can see your app being served at http://localhost:3000/


- You can run the below command at the root folder to visualize the Database. 

```
yarn studio
```

After running the command check http://localhost:5555 to see the DB models

## What's inside

- The `src/app` folder contains the next app.
- The `src/components` folder contains all the ui components.
- The `src/db` folder  contains the code for local Cache.
- The `src/hooks` folder contains hooks for sending response to llm server.
- The `src/langchain` folder contains vectorStore and chains.
- The `src/lib` folder contains some auxilary files like types, authOptions ....
- The `prisma` folder contains the Schema and Migrations.


### Contributions

I love and welcome open source contributions, if you have any queries, concerns or enhancements which you feel elevate or bring value to the repo, kindly feel free to raise them. Your feedback is valuable and will help me to improve Medmatch.

To contribute, you can:

   - **Raise an issue** : If you encounter any problems or have suggestions for improvements, please create an issue on this GitHub repository. I will review it and  work together with you to find a solution.

   - **Submit a pull request** : If you have a specific improvement in mind, you can fork the repository, make your changes, and submit a pull request. I will review your changes and merge them if they align with the project's goals.

Thank you for your support !!!
