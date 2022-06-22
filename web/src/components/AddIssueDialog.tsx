import {
    Box,
    Button,
    ButtonGroup,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import React from "react";
import { api } from "../api/api";
import { useFormik } from 'formik';
import { useMutation, useQueryClient } from "react-query";
import { NewIssue } from "../../../shared/issue";
import { InputBox } from "./InputBox";
import { useAuthentication } from "../hooks/useAuthentication";
import { useNotification } from "../infrastructure/NotificationProvider";
import * as Yup from 'yup';

const courses = ["BWL", "IGIS", "IMT", "IOBP", "IPMG", "ISEF"];

const types = ["Bug", "Improvement"];

export type AddIssueProps = {
    open: boolean;
    onClose: (value: boolean) => void;
}

const AddIssueSchema = Yup.object().shape({
    description: Yup.string().min(10).max(255).required(),
    title: Yup.string().min(5).max(255).required(),
})

export function AddIssueDialog(props: AddIssueProps) {
    const {user} = useAuthentication();
    const {showNotification} = useNotification();
    const queryClient = useQueryClient()
    const addIssueMutation = useMutation((newIssue: NewIssue) => api.addIssue(newIssue), {
        onSuccess: async () => {
            await queryClient.invalidateQueries('issues')
            showNotification({severity: 'success', message: 'Issue created'});
        }
    });
    const {
        values,
        errors,
        isSubmitting,
        handleSubmit,
        handleChange,
        setFieldValue,
        setSubmitting,
        touched,
        setFieldTouched
    } = useFormik<NewIssue>({
        initialValues: {
            description: "",
            reporter: user,
            type: "Bug",
            title: "",
            comments: [],
            course: "IGIS",
            state: "Open"
        },
        validationSchema: AddIssueSchema,
        onSubmit: (values) => {
            addIssueMutation.mutate(values)
            setSubmitting(false);
            props.onClose(true);
        }
    })

    return (
      <Dialog open={props.open} onClose={props.onClose} maxWidth="md" fullWidth>
          <form onSubmit={handleSubmit}>
              <DialogTitle>Add new Ticket</DialogTitle>
              <DialogContent>
                  <DialogContentText>
                      Please leave a concrete explanation of the problem.
                  </DialogContentText>
                  <Box display="flex" flexDirection="row" marginY={3}>
                      <Box width="100%" marginTop={0}>
                          <InputBox>
                              <TextField
                                error={errors.title !== undefined}
                                helperText={errors.title ?? " "}
                                fullWidth
                                id="title"
                                disabled={isSubmitting}
                                value={values.title}
                                onChange={handleChange}
                                label="Title"
                              />
                          </InputBox>
                          <InputBox marginTop={5}>
                              <TextField
                                error={errors.description !== undefined}
                                helperText={errors.description ?? " "}
                                multiline
                                rows={6}
                                fullWidth
                                id="description"
                                disabled={isSubmitting}
                                value={values.description}
                                onChange={handleChange}
                                label="Description"
                              />
                          </InputBox>
                      </Box>
                      <Box marginLeft={4} width={230} mt={1}>
                          <InputLabel shrink>Type</InputLabel>
                          <ButtonGroup>
                              {types.map(t => (
                                <Button key={t} size="large"
                                        variant={values.type === t && touched.type ? "contained" : "outlined"}
                                        color="primary" onClick={() => {
                                    setFieldTouched("type");
                                    setFieldValue("type", t);
                                }}>{t}</Button>
                              ))}
                          </ButtonGroup>
                          <InputBox>
                              <InputLabel shrink>Course</InputLabel>
                              <Select fullWidth id="course" name="course" value={values.course} onChange={handleChange}>
                                  {courses.map((c: string) => (
                                    <MenuItem key={c} value={c}>{c}</MenuItem>
                                  ))}
                              </Select>
                          </InputBox>
                      </Box>
                  </Box>
              </DialogContent>
              <DialogActions>
                  <Button variant="contained" color="primary" type="submit">Save</Button>
                  <Button disabled={isSubmitting} variant="contained" color="secondary" type="button"
                          onClick={() => props.onClose(false)}>Cancel</Button>
              </DialogActions>
          </form>
      </Dialog>
    )
}