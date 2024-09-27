import { useState } from "react";
import AllContacts from "../components/AllContacts";
import FavoritePage from "../components/FavoritePage";
import Search from "../components/Search";
import Modal from "../components/Modal";
import { useModal } from "../context/ModalProvider";
import { contactsRender } from "../context/ContactContext";
import { useActions } from "../context/ActionsProvider";

function DirectionCenter({ FavoriteOrAll }) {
  const [isTrash, setIsTrash] = useState(false);

  return (
    <>
      <Search isTrash={isTrash} setIsTrash={setIsTrash} />
      {FavoriteOrAll === 1 ? (
        <>
          <AllContacts
            isTrash={isTrash}
            setIsTrash={setIsTrash}
          />
        </>
      ) : (
        <FavoritePage />
      )}
    </>
  );
}

export default DirectionCenter;
