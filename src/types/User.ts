export type IUserType = {
  id: string;
  created_at: Date;
  username: string;
  email: string;
  theme: "light" | "dark";
  layout: "fullwidth" | "grid" | string;
};
