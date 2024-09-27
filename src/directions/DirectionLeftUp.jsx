import React, { useContext } from "react";
import { contactList } from "../context/ContactContext";
import { Link } from "react-router-dom";
import { useActions } from "../context/ActionsProvider";
import styles from "./DirectionLeftUp.module.css"

function DirectionLeftUp({ FavoriteOrAll, setFavoriteOrall }) {
  const { contacts } = useContext(contactList);
  const [state] = useActions();

  if (!contacts) {
    return;
  }
  return (
    <>
      <div className={styles.parent}>
        <div onClick={() => setFavoriteOrall(1)} >
          All Contacts {contacts.length}
        </div>
        <div onClick={() => setFavoriteOrall(2)}>
          FavoriteContacts{" "}
          {state.contactFavorite ? state.contactFavorite.length : 0}
        </div>
      </div>
    </>
  );
}

export default DirectionLeftUp;
