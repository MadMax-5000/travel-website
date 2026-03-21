import __authors from "./jsons/__users.json";
import { AuthorType } from "./types";
import avatar1 from "@/images/avatars/Image-1.png";
import { Route } from "@/routers/types";

const DEMO_AUTHORS: AuthorType[] = __authors.map((item) => ({
  ...item,
  avatar: avatar1,
  href: item.href as Route,
}));

export { DEMO_AUTHORS };
