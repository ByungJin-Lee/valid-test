import { PropsWithChildren } from "react";

export const Container = ({ children }: PropsWithChildren) => (
  <div style={containerStyle} children={children} />
);

const containerStyle: React.CSSProperties = {
  width: "250px",
};

export const Title = ({ text }: { text: string }) => (
  <p style={titleStyle} children={text} />
);

const titleStyle: React.CSSProperties = {};

export const Error = ({ text }: { text: string }) => (
  <p style={errorStyle} children={text} />
);

const errorStyle: React.CSSProperties = {
  color: "red",
};
