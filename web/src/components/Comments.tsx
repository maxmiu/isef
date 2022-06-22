import { Issue } from "../../../shared/issue";
import { Box, Button, Paper, TextField, Typography, useTheme } from "@mui/material";
import React, { KeyboardEventHandler, useState } from "react";
import { UserName } from "./UserName";
import { toLocalDateTime } from "../formatter/date-time-formatter";
import { useMutation, useQueryClient } from "react-query";
import { NewComment } from "../../../shared/comment";
import { api } from "../api/api";
import { useAuthentication } from "../hooks/useAuthentication";
import { useFormik } from "formik";
import * as Yup from 'yup';

export type CommentsProps = {
    issue: Issue;
}

const AddCommentSchema = Yup.object().shape({
    content: Yup.string().min(2, "Content must be at least 2 characters").max(255).required("Required!"),
})

export function Comments(props: CommentsProps) {
    const theme = useTheme();
    const {user} = useAuthentication();
    const queryClient = useQueryClient();
    const addCommentMutation = useMutation((comment: NewComment) => api.addComment(props.issue.id, comment),
      {
          onSuccess: async () => {
              await queryClient.invalidateQueries('issueDetails');
              resetForm();
              setSubmitting(false)
          }
      }
    );
    const {values, setSubmitting, isSubmitting, handleChange, handleSubmit, resetForm, errors} = useFormik<NewComment>({
        initialValues: {
            content: "",
            author: user
        },
        validationSchema: AddCommentSchema,
        onSubmit: (newComment) => addCommentMutation.mutate(newComment)
    });

    const submitOnEnter = (e: any) => {
        if (e.key === "Enter" && e.metaKey) {
            handleSubmit();
        }
    };

    return (
      <Box>
          <Typography variant="h5">Comments:</Typography>
          {props.issue.comments.sort((a, b) => a.id - b.id).map(c => (
            <Paper key={c.id} style={{marginTop: theme.spacing(2), padding: theme.spacing(2)}} elevation={2}>
                <Box>
                    <Typography variant="body2">
                        <>
                            <UserName user={c.author}/> added a comment - {toLocalDateTime(c.createdAt)}
                        </>
                    </Typography>
                    <Typography variant="body1">
                        {c.content}
                    </Typography>
                </Box>
            </Paper>
          ))}
          <Paper style={{marginTop: theme.spacing(2), padding: theme.spacing(2)}} elevation={2}>
              <form onKeyDown={submitOnEnter} onSubmit={handleSubmit}>
                  <Typography variant="body1">Add a comment:</Typography>
                  <TextField
                    id="content"
                    name="content"
                    error={errors.content !== undefined}
                    helperText={errors.content ?? " "}
                    disabled={isSubmitting}
                    value={values.content}
                    onChange={handleChange}
                    style={{marginTop: theme.spacing(2)}}
                    rows={3}
                    fullWidth
                    multiline/>
                  <Button type="submit" style={{marginTop: theme.spacing(2)}} variant="contained">Save</Button>
              </form>
          </Paper>
      </Box>
    )

}