import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Layout from "./pages/Layout";
import Support from "./pages/Support";
import Summary from "./pages/Summary";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
              <Route index element={<Home />}></Route>
              <Route path="about" element={<About />}></Route>
              <Route path="support" element={<Support />}></Route>
              <Route path="summary" element={<Summary />}></Route>
              <Route path="*" element={<NotFound />}></Route>
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
