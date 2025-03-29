import './App.css'
import {MasterView} from "./components/MasterView.tsx";
import {createTheme, ThemeProvider} from "@mui/material";
import CapitalTaxCalculator from "./Calculator.tsx";

function App() {
  const theme = createTheme({
    palette: {
      mode: "dark",
    }
  });
  return (
      <ThemeProvider theme={theme}>
          <CapitalTaxCalculator/>
        <MasterView/>
      </ThemeProvider>
  )
}

export default App
