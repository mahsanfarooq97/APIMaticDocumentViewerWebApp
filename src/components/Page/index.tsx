import { Button, Stack, TextField, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { PageData, updatePages } from "../../redux/slice";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Page: React.FC<PageData> = ({ title, bodyText, index }) => {
  const { Pages } = useSelector((state: RootState) => state?.pageSlice);
  const [editState, setEditState] = useState<boolean>(false);

  const [titleVal, setTitleVal] = useState<string>(title);
  const [editorText, setEditorText] = React.useState(bodyText);

  useEffect(() => {
    setTitleVal(title);
    setEditorText(bodyText);
  }, [title, bodyText]);
  const dispatch = useDispatch();

  const onClickEdit = () => {
    if (editState) {
      let originalPages = [...Pages];
      let updatedPage = {
        ...originalPages[index],
        bodyText: editorText,
        title: titleVal
      };
      originalPages[index] = updatedPage;
      dispatch(updatePages(originalPages));
    }
    setEditState(value => !value);
  };
  

  return (
    <>
      <Toolbar />
      <Stack
        justifyContent="space-between"
        direction="row"
        sx={{ p: "24px", height: "60px" }}
      >
        {editState ? (
          <TextField
            value={titleVal}
            sx={{
              width: "240px",

              "& .MuiInputBase-root": {
                height: "80px",
              },
            }}
            onChange={(ev) => setTitleVal(ev.target.value)}
          />
        ) : (
          <Typography
            variant="h6"
            gutterBottom
            sx={{ width: "240px", height: "40px" }}
          >
            {title}
          </Typography>
        )}

        <Button variant="contained" onClick={onClickEdit}>
          {editState ? "Done Editing" : "Edit"}
        </Button>
      </Stack>

      {editState ? (
        <MarkdownEditor
          value={editorText}
          onChange={(value) => {
            setEditorText(value);
          }}
        />
      ) : (
        <Typography paragraph>{bodyText}</Typography>
      )}
    </>
  );
};

export default Page;
