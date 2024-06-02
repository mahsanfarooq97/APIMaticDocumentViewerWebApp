import { Toolbar, Typography } from "@mui/material";
import React from "react";

// Define the shape of the props for the Page component
interface PageProps {
  title: string;
  text: string;
}

const Page: React.FC<PageProps> = ({ title, text }) => {
  return (
    <>
      <Toolbar />
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography paragraph>{text}</Typography>
    </>
  );
};

export default Page;
