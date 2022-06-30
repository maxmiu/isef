import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import { AddIssueDialog } from "./AddIssueDialog";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";

export function AddIssueButton(props: { sx?: SxProps<Theme> }) {
    const [showAddIssueDialog, setShowAddIssueDialog] = useState(false);
    return (
      <>
          <Button startIcon={<AddIcon/>} variant="contained" color="primary"
                  sx={props.sx}
                  onClick={() => setShowAddIssueDialog(true)}>
              New Issue
          </Button>
          {showAddIssueDialog &&
              <AddIssueDialog open={showAddIssueDialog} onClose={() => setShowAddIssueDialog(false)}/>}
      </>
    )
}