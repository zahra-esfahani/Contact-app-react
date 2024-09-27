import { contactsRender } from "../context/ContactContext";
import styles from "./AllContacts.module.css";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";
import { useActions } from "../context/ActionsProvider";
import { useEffect, useState } from "react";
import { useModal } from "../context/ModalProvider";

function AllContacts({ isTrash }) {
  const { contacts, setContacts } = contactsRender();
  const { setTitle, setAction, setIsOpend, setId } = useModal();
  const [state, dispatch] = useActions();
 
  useEffect(() => {
    if (state.contacts) {
      setContacts(state.contacts);
    }
  }, [state.contacts ]);


  const clickHandler = (type, id) => {
    type === "FAVORITE" || type === "DELETE_GROUP" || type === "EDIT"
      ? dispatch({
          type,
          payload: { id, contacts },
        })
      : setIsOpend(true);
    setTitle(`Do you want to ${type}?`);
    setAction(type);
    setId(id);
  };


  if (!contacts.length) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "100px" }}>
        All contacts is empty!
      </h2>
    );
  }

  return (
    <>
      <div>
        {contacts?.map((i) => (
          <>
            <div key={i.id} className={styles.container}>
              <span>
                <VscAccount />
              </span>
              <p>{i.name}</p>
              <p>{i.lastName}</p>
              <p>{i.phone}</p>
              <p>{i.email}</p>
              <div className={styles.icon}>
                <span onClick={() => clickHandler("EDIT", i.id)}>
                  <FaRegEdit />
                </span>
                <span onClick={() => clickHandler("DELETE", i.id)}>
                  <FaRegTrashAlt />
                </span>
                <span onClick={() => clickHandler("FAVORITE", i.id)}>
                  <FaHeart style={{ color: i.isFavorite ? "red" : "black" }} />
                </span>
                {isTrash && (
                  <span
                    onClick={() => clickHandler("DELETE_GROUP", i.id, contacts)}
                  >
                    <RiCheckboxBlankCircleFill
                      style={{ color: i.isDelete ? "green" : "black" }}
                    />
                  </span>
                )}
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
}

export default AllContacts;

