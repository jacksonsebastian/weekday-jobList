import { Box, Container } from '@mui/material';
import './App.css';
import { JobList } from './views/JobList';

function App() {
  return (
    <>
      <Container maxWidth="lg" >
        <Box sx={{ p: 2 }} >
          <JobList />
        </Box>
      </Container>

    </>
  );
}

export default App;
