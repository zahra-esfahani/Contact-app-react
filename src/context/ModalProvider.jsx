import { createContext, useContext, useState } from "react";
import Modal from "../components/Modal";
import { contactsRender } from "./ContactContext";

export const modalContext = createContext();
function ModalProvider({ children }) {
  const [titel, setTitle] = useState("");
  const [action, setAction] = useState("");
  const [isOpend, setIsOpend] = useState(false);
  const [type , setType]=useState("");
  const [id, setId] = useState(null);
  const [contactEdit, setContactEdit] = useState();
  const { contacts } = contactsRender();

  return (
    <>
      <modalContext.Provider
        value={{ setTitle, setAction, setIsOpend, setId, setContactEdit , setType }}
      >
        <Modal
          id={id}
          type={type}
          titel={titel}
          action={action}
          isOpend={isOpend}
          setIsOpend={setIsOpend}
          contactEdit={contactEdit}
          contacts={contacts}
        />
        {children}
      </modalContext.Provider>
    </>
  );
}
const useModal = () => {
  const data = useContext(modalContext);
  return data;
};

export { useModal };

export default ModalProvider;
