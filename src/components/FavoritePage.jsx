import { useEffect, useState } from "react";
import { useActions } from "../context/ActionsProvider";
import { contactsRender } from "../context/ContactContext";
import styles from "./AllContacts.module.css";
import { FaHeart } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";

function FavoritePage() {
  const [favorite, setFavorite] = useState([]);
  const [state, dispatch] = useActions();
  const { contacts } = contactsRender();


  useEffect(() => {
    if (state.contactFavorite) {
      setFavorite(state.contactFavorite);
    }
  }, [state.contactFavorite]);


  const clickHandler = (type, id, contacts) => {
    dispatch({
      type,
      payload: { id, contacts },
    });
  };


  return (
    <>
      <div>
        {!favorite.length && (
          <h2 style={{ textAlign: "center", marginTop: "100px" }}>
            Favorit contacts is empty!
          </h2>
        )}
        {favorite?.map((i) => (
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
                <span onClick={() => clickHandler("FAVORITE", i.id, contacts)}>
                <FaHeart style={{ color: i.isFavorite ? "red" : "black" }} />
                </span>

              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
}

export default FavoritePage;
