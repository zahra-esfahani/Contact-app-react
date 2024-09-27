import { useEffect, useState } from "react";
import styles from "./AddContacts.module.css";
import { contactsRender } from "../context/ContactContext";
import { v4 } from "uuid";
import { useActions } from "../context/ActionsProvider";
import toast, { Toaster } from "react-hot-toast";
import { useModal } from "../context/ModalProvider";

function AddContacts() {
  const array = [];

  const [contact, setContact] = useState({
    id: v4(),
    name: "",
    lastName: "",
    phone: "",
    email: "",
    isFavorite: false,
    isDelete: false,
  });

  const { contacts, setContacts } = contactsRender();
  const [state, dispatch] = useActions();
  const { setTitle, setAction, setIsOpend, setId, setContactEdit } = useModal();

  const edit = state.contactEdit.EditContact;
 const nameRegex=/[a-zA-Z]{2,30}/;

  useEffect(() => {
    if (edit) {
      setContact(edit);
    }
  }, [edit]);

  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setContact({ ...contact, [name]: value });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    //  const response = await api.post("/contacts", { contact });
    // setContacts([...contacts, response.data]);
    // با کدهای بالا میشخ کاربر جدید را در سرور ذخیره کرد که استاد گفتن نیازی به این کار نیست

    if (edit) {
      setIsOpend(true);
      setTitle(`Do you want to EDIT_CONTACT?`);
      setAction("EDIT_CONTACT");
      setId(contact.id);
      setContactEdit(contact);
    } else {
      if (
        !contact.name ||
        !contact.lastName ||
        !contact.phone ||
        !contact.email
      ) {
        toast.error("Please Enter all feilds!");
        return;
      }
      if (!contact.email.includes("@")) {
        toast.error("Please Enter correct email!");
        return;
      }
      if (!nameRegex.test(contact.name)) {
        toast.error("Please Enter correct name!");
        return;
      } if (!nameRegex.test(contact.lastName)) {
        toast.error("Please Enter correct lastName!");
        return;
      }


      array.push(contact);
      dispatch({
        type: "ALLCONTACTS",
        payload: { data: array },
      });
      setContacts([...contacts, contact]);
    }

    setContact({ name: "", lastName: "", phone: "", email: "" });
  };

  return (
    <>
      <div>
        <form onSubmit={submitHandler} className={styles.form}>
          <input
            type="text"
            name="name"
            value={contact.name}
            onChange={changeHandler}
            placeholder="Name..."
          />
          <input
            type="text"
            name="lastName"
            value={contact.lastName}
            onChange={changeHandler}
            placeholder="LastName..."
          />
          <input
            type="text"
            name="phone"
            value={contact.phone}
            onChange={changeHandler}
            placeholder="PhoneNumber..."
          />
          <input
            type="text"
            name="email"
            value={contact.email}
            onChange={changeHandler}
            placeholder="Email..."
          />
          <button type="submit">{edit ? "EDIT" : "ADD"}</button>
        </form>
      </div>
      <Toaster/>
    </>
  );
}

export default AddContacts;
