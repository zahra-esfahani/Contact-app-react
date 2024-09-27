import { useEffect } from "react";
import { useActions } from "../context/ActionsProvider";
import { contactsRender } from "../context/ContactContext";
import styles from "./Modal.module.css"
function Modal({ titel, action, isOpend, id, setIsOpend,contactEdit  }) {
  const { contacts } = contactsRender();
  const [state, dispatch] = useActions();


  const clickHandler = () => {
    if(action==="DELETE_GROUP_FINALL"){
      dispatch({
        type: action,
        payload: {  contacts  },
      });
    }

 else{
  dispatch({
    type: action,
    payload: { id, contacts , contact:contactEdit },
  });
 }
    setIsOpend(false)
  };

  return (
    <>
      {isOpend && (
        <div className={styles.parent}>
        <div>
          <h3>{titel}</h3>
          <button onClick={clickHandler}>{action}</button>
          <button onClick={() => setIsOpend(false)}>Cancel</button>
        </div>
        </div>
      )}
    </>
  );
}

export default Modal;
