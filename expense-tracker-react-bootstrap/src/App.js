import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Layout from "./pages/Layout";
import Support from "./pages/Support";
import Summary from "./pages/Summary";
import NotFound from "./pages/NotFound";
import {GlobalProvider} from "./context/GlobalState";

function App() {
    const dummyTransactions = [
        {
            "id": 51722789,
            "description": "Versace",
            "amount": -120,
            "category": "Clothing"
        },
        {
            "id": 53450693,
            "description": "ResMed Salary",
            "amount": 3500,
            "category": "Income"
        },
        {
            "id": 45417528,
            "description": "BMW Gas ",
            "amount": -80,
            "category": "Transportation"
        }
    ];

  return (
    <div className="App">
        <GlobalProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home transactions={dummyTransactions}/>}></Route>
                        <Route path="about" element={<About />}></Route>
                        <Route path="support" element={<Support />}></Route>
                        <Route path="summary" element={<Summary />}></Route>
                        <Route path="*" element={<NotFound />}></Route>
                    </Route>

                </Routes>
            </BrowserRouter>
        </GlobalProvider>
    </div>
  );
}

export default App;
