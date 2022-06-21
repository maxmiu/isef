import { Issue } from "../../../shared/issue";
import { Box, Button, Paper, TextField, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import { UserName } from "./UserName";
import { toLocalDateTime } from "../formatter/date-time-formatter";
import { useMutation, useQueryClient } from "react-query";
import { NewComment } from "../../../shared/comment";
import { api } from "../api/api";
import { useAuthentication } from "../hooks/useAuthentication";

export type CommentsProps = {
    issue: Issue;
}

export function Comments(props: CommentsProps) {
    const theme = useTheme();
    const {user} = useAuthentication();
    const queryClient = useQueryClient();
    const [comment, setComment] = useState<string>("");
    const addCommentMutation = useMutation((comment: NewComment) => api.addComment(props.issue.id, comment),
      {onSuccess: () => queryClient.invalidateQueries('issueDetails')}
    );

    return (
      <Box>
          <Typography variant="h5">Comments:</Typography>
          {props.issue.comments.sort((a,b) => a.id - b.id).map(c => (
            <Paper style={{marginTop: theme.spacing(2), padding: theme.spacing(2)}} elevation={2}>
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
              <Typography variant="body1">Add a comment:</Typography>
              <TextField onChange={e => setComment(e.target.value)} style={{marginTop: theme.spacing(2)}} rows={3} fullWidth multiline></TextField>
              <Button onClick={() => addCommentMutation.mutate({content: comment, author: user})}
                      style={{marginTop: theme.spacing(2)}} variant="contained">Save</Button>
          </Paper>
      </Box>
    )

}