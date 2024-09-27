import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { useActions } from "../context/ActionsProvider";
import { contactsRender } from "../context/ContactContext";
import styles from "./Search.module.css";
import { useModal } from "../context/ModalProvider";


function Search({isTrash , setIsTrash}) {
  const [state ,dispatch] = useActions();
  const [search, setSearch] = useState("");
  const { contacts } = contactsRender();
  const { setTitle, setAction, setIsOpend } = useModal();

  const clickHandler = (type) => {
    setIsOpend(true);
    setTitle(`Do you want to ${type}`);
    setAction(type);
    setIsTrash(false)
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: "SEARCH",
      payload: { search, contacts },
    });
  };

  return (
    <>
      <form onSubmit={submitHandler} className={styles.form}>
        {!isTrash ? (
          <button onClick={() => setIsTrash(true)} className={styles.matn}>Delete some contacts</button>
        ) : (
          <span
            className={styles.Trash}
            onClick={() => clickHandler("DELETE_GROUP_FINALL", contacts)}
          >
            <FaRegTrashAlt />
          </span>
        )}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className={styles.search}>
          <FaSearch />
        </button>
      </form>
    </>
  );
}

export default Search;
