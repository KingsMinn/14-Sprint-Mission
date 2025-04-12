import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Signup from "./pages/sign/Signup";
import Items from "./pages/items";
import GNB from "@/components/GNB";
import { WinSizeProvider } from "./contexts/winSizeContext";
import Login from "./pages/sign/LogIn";
import AddItem from "./pages/additem";
import ItemDetail from "./pages/items/itemDetail";

function App() {
  return (
    <>
      <WinSizeProvider>
        <BrowserRouter>
          <GNB />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/items" element={<Items />}></Route>
            <Route path="/items/:id" element={<ItemDetail />} />
            <Route path="/additem" element={<AddItem />} />
          </Routes>
        </BrowserRouter>
      </WinSizeProvider>
    </>
  );
}

export default App;
