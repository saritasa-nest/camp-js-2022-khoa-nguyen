import { Link as MUILink, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';

export const NotFound: FC = () => (
  <Stack padding={10}>
    <Typography variant="h1">Page not found</Typography>
    <Typography variant="subtitle1">
      Look like you entered the url which is not invalid. Please check your url
      again or <MUILink component={Link} to="/" >Go back to home page</MUILink>
    </Typography>
  </Stack>
);
