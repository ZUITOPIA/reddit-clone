import "styled-components";

declare module "styled-components" {
  export type DefaultThemeColorKey =
    | "black"
    | "white"
    | "lightgray"
    | "darkgray"
    | "lightpink"
    | "darkpink"
    | "red";
  export interface DefaultTheme {
    color: {
      [key in DefaultThemeColorKey]: string;
    };
  }
}
