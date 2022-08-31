import { Container, Grid } from '@mui/material';

import { DefaultLayout } from '../../../../layout';

import { Card } from '../../../../components';

export const AnimeTablePage: React.FC = () => (
  <DefaultLayout>
    <Container>
      <Grid container justifyContent="center" spacing={5}>
        <Grid item xs={3}>
          <Card>Test</Card>
        </Grid>
        <Grid item xs={9}>
          <Card>Test2</Card>
        </Grid>
      </Grid>
    </Container>
  </DefaultLayout>
);
