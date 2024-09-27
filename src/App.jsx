import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import FavoritePage from "./components/FavoritePage";
import ContactContext from "./context/ContactContext";
import HomePage from "./directions/HomePage";
import ActionsProvider from "./context/ActionsProvider";
import ModalProvider from "./context/ModalProvider";

function App() {
  return (
    <>
      <BrowserRouter>
        <ActionsProvider>
          <ContactContext>
            <ModalProvider>
              <Routes>
                <Route path="/" element={<Navigate to="/Contacts" replace />} />
                <Route path="/Contacts" element={<HomePage />} />
              </Routes>
            </ModalProvider>
          </ContactContext>
        </ActionsProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
