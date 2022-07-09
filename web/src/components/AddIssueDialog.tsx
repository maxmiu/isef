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

const mediums = ["LearnApp" , "OnlineTest" , "Podcast" , "SampleExam" , "Script" , "Vodcast"];

const types = ["Bug", "Improvement"];

export type AddIssueProps = {
    open: boolean;
    onClose: () => void;
}

const AddIssueSchema = Yup.object().shape({
    description: Yup.string().min(10).max(255).required(),
    title: Yup.string().min(5).max(255).required(),
    course: Yup.mixed().required(),
    type: Yup.string().required(),
})

export function AddIssueDialog(props: AddIssueProps) {
    const {user} = useAuthentication();
    const {showNotification} = useNotification();
    const queryClient = useQueryClient()
    const addIssueMutation = useMutation((newIssue: NewIssue) => api.addIssue(newIssue), {
        onSuccess: async (response) => {
            await queryClient.invalidateQueries('issues')
            showNotification({severity: 'success', message: `Issue #${response.id} created`});
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
            assignee: null,
            medium: "Script",
            reporter: user,
            type: "Bug",
            title: "",
            comments: [],
            course: "BWL",
            state: "Open"
        },
        validateOnChange: true,
        validateOnBlur: true,
        validationSchema: AddIssueSchema,
        onSubmit: (values) => {
            addIssueMutation.mutate(values)
            setSubmitting(false);
            props.onClose();
        }
    });

    const getHelperText = (field: keyof NewIssue) => {
        const error = errors[field];
        if (error === undefined || !touched[field]) {
            return " ";
        }
        return error.toString();
    }

    const getValidationError = (field: keyof  NewIssue) => touched[field] && Boolean(errors[field]);


    return (
      <Dialog open={props.open}
              maxWidth="md"
              fullWidth
              onClose={(event, reason) => {
                  if (reason === "backdropClick") {
                      return;
                  }
                  props.onClose
              }}>
          <form onSubmit={handleSubmit}>
              <DialogTitle>Add new Issue</DialogTitle>
              <DialogContent>
                  <DialogContentText>
                      Please leave a concrete explanation of the problem.
                  </DialogContentText>
                  <Box display="flex" flexDirection="row" marginY={3}>
                      <Box width="100%" marginTop={0}>
                          <InputBox>
                              <TextField
                                error={getValidationError("title")}
                                helperText={getHelperText("title")}
                                fullWidth
                                id="title"
                                disabled={isSubmitting}
                                value={values.title}
                                onChange={handleChange}
                                label="Title"
                              />
                          </InputBox>
                          <InputBox marginTop={2}>
                              <TextField
                                error={getValidationError("description")}
                                helperText={getHelperText("description")}
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
                                        variant={values.type === t ? "contained" : "outlined"}
                                        color="primary" onClick={() => {
                                    setFieldTouched("type");
                                    setFieldValue("type", t);
                                }}>{t}</Button>
                              ))}
                          </ButtonGroup>
                          <InputBox>
                              <InputLabel shrink>Course</InputLabel>
                              <Select error={errors.course !== undefined} fullWidth id="course" name="course"
                                      value={values.course} onChange={handleChange}>
                                  {courses.map((c: string) => (
                                    <MenuItem key={c} value={c}>{c}</MenuItem>
                                  ))}
                              </Select>
                          </InputBox>
                          <InputBox>
                              <InputLabel shrink>Medium</InputLabel>
                              <Select error={errors.medium !== undefined} fullWidth id="medium" name="medium"
                                      value={values.medium } onChange={handleChange}>
                                  {mediums.map((c: string) => (
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
                          onClick={() => props.onClose()}>Cancel</Button>
              </DialogActions>
          </form>
      </Dialog>
    )
}