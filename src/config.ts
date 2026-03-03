export const globalConfig = {
  API_URL: process.env.NEXT_PUBLIC_APP_API,
  APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
  MOCK_EMAIL: process.env.NEXT_PUBLIC_MOCK_EMAIL ?? "user@gmail.com",
  MOCK_PASSWORD: process.env.NEXT_PUBLIC_MOCK_PASSWORD ?? "123456",
};

export const brandConfig = {
  NAME: "NextJS Base",
  DESCRIPTION:
    "NextJS Base is a template for building a web application using NextJS.",
  VERSION: "1.0.0",
  AUTHOR: "NextJS Base",
  AUTHOR_EMAIL: "nextjs-base@gmail.com",
  AUTHOR_URL: "https://nextjs-base.com",
};
