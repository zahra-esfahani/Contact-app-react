import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../confings/api";
import { useActions } from "./ActionsProvider";

export const contactList = createContext();

function ContactContext({ children }) {
  const [contacts, setContacts] = useState([]);
  const[ , dispatch]=useActions();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await api.get("/contacts");
        const data = res.data;
        setContacts(data);
        dispatch({
          type:"ALLCONTACTS",
          payload:{data}
        })
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchContacts();
  }, []);

  return (
    <>
      <contactList.Provider
        value={{ contacts, setContacts }}
      >
        {children}
      </contactList.Provider>
    </>
  );
}

const contactsRender = () => {
  const data = useContext(contactList);
  return data;
};

export { contactsRender };
export default ContactContext;
