import React from "react";
import { Box, Link, Typography } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import MenuBookIcon from '@mui/icons-material/MenuBook';

export function HelpPage(){
    return (
      <Box>
          <Typography variant="h4">Help</Typography>
          <Typography sx={{mt: 2, display: 'flex', alignItems: 'center'}} variant="h5">
              <EmailIcon sx={{mr: 1}}/>Contact
          </Typography>
          <Typography sx={{mt: 1}} variant="body1">
              Please contact as at
              <Link sx={{mx: 1}} href="mailto:help@issue-tracker.app">help@issue-tracker.app</Link>
              if you need any help!
          </Typography>
          <Typography sx={{mt: 5, display: 'flex', alignItems: 'center'}} variant="h5">
              <MenuBookIcon sx={{mr: 1}}/>User Manual
          </Typography>
          <Typography sx={{mt: 1}} variant="body1">
              Please see the complete
              <Link sx={{mx: 1}} href="/downloads/UserManual.pdf" target="_blank">UserManual.pdf</Link>
              if you have any questions how to use this application.
          </Typography>
      </Box>
    );
}
