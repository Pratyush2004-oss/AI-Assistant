export type UserType = {
  name: string;
  email: string;
  password: string;
  assistant: {
    name: string;
    image: string;
  } | null;
  history: string[];
};

export type UserLoginType = {
  email: string;
  password: string;
};

export type UserSignupType = {
  name: string;
  email: string;
  password: string;
};

export type GeminiRespType = {
  type: string;
  userInput: string;
  response: string;
};
