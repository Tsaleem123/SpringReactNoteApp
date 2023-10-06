import './App.css';
import Appbar from './components/Appbar'
import Note from './components/Note'
import { Box } from '@mui/material';
function App() {
  return (
    
    <Box className="App" style={{ minHeight: "100vh" }}>
    <Appbar />
    <Note />
  </Box>
  );
}

export default App;
