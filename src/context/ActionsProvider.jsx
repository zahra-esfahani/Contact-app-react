import { createContext, useContext, useReducer } from "react";
import AllContacts from "../components/AllContacts";
const initialState = {
  AllContacts:[],
  contactDelete: {},
  gropuDeleteContacts: [],
  contactEdit: {},
  contactFavorite: [],
  contacts: [],
};
const reducer = (state, action) => {
  switch (action.type) {

    case "ALLCONTACTS":
      action.payload.data.forEach((newItem) => {
        if (!state.AllContacts.find((item) => item.id === newItem.id)) {
          state.AllContacts.push(newItem);
        }
      });
   return{
    ...state,
    AllContacts:[...state.AllContacts],
    contacts:[...state.AllContacts]
   }
  
    case "EDIT":
      const EditContact = action.payload.contacts.find(
        (i) => i.id === action.payload.id
      );
      return {
        ...state,
        contactEdit: { EditContact },
      };

    case "EDIT_CONTACT":
      const updatedContacts = action.payload.contacts.map((contact) =>
        contact.id === action.payload.id ? action.payload.contact : contact
      );
      return {
        ...state,
        contactEdit: {},
        AllContacts:updatedContacts,
        contacts: updatedContacts,
      };

    case "DELETE":
      console.log(action.type);
      console.log(action.payload.id);
      const DeleteContact = action.payload.contacts.filter(
        (i) => i.id !== action.payload.id
      );
      const updatedFavorites = state.contactFavorite.filter(
        (i) => i.id !== action.payload.id
      );
      return {
        ...state,
        contactFavorite: updatedFavorites,
        contacts:  DeleteContact ,
      };

    case "FAVORITE":
      const favoriteContact = action.payload.contacts.find(
        (i) => i.id === action.payload.id
      );

      const isAlreadyFavorite = state.contactFavorite.find(
        (i) => i.id === action.payload.id
      );

      if (!isAlreadyFavorite) {
        const updatedFavoriteContact = { ...favoriteContact, isFavorite: true };
        return {
          ...state,
          contacts:action.payload.contacts.map((contact) =>
            contact.id === action.payload.id
              ? { ...contact, isFavorite: true }
              : contact
          ),
          contactFavorite: [...state.contactFavorite, updatedFavoriteContact],
        };

      } else {
        return {
          ...state,
          contacts: state.contacts.map((contact) =>
            contact.id === action.payload.id
              ? { ...contact, isFavorite: false }
              : contact
          ),
          contactFavorite: state.contactFavorite.filter(
            (i) => i.id !== action.payload.id
          ),
        };
      }

    case "SEARCH":
      const updateContactsWithSearch = !action.payload.search.trim()
        ? (state.AllContacts)
        : action.payload.contacts.filter((item) =>
            (item.name + item.lastName + item.email)
              .toLowerCase()
              .includes(action.payload.search.toLowerCase())
          );
      return {
        ...state,
        contacts: updateContactsWithSearch,
      };

    case "DELETE_GROUP":
      const DeleteGroupContact = action.payload.contacts.find(
        (i) => i.id === action.payload.id
      );
      const isAlreadyExit = state.gropuDeleteContacts.find(
        (i) => i.id === action.payload.id
      );
      if (!isAlreadyExit) {
        const updatedDeleteContact = { ...DeleteGroupContact, isDelete: true };
        return {
          ...state,
          contacts:action.payload.contacts.map((contact) =>
            contact.id === action.payload.id
              ? { ...contact, isDelete: true }
              : contact
          ),
          gropuDeleteContacts: [...state.gropuDeleteContacts, updatedDeleteContact],
        };

      } else {
        return {
          ...state,
          contacts: state.contacts.map((contact) =>
            contact.id === action.payload.id
              ? { ...contact, isDelete: false }
              : contact
          ),
          gropuDeleteContacts: state.gropuDeleteContacts.filter(
            (i) => i.id !== action.payload.id
          ),
        };}

    

    case "DELETE_GROUP_FINALL":
      const remainingContacts = action.payload.contacts.filter((contact) => {
        return !state.gropuDeleteContacts.find(
          (deletedContact) => deletedContact.id === contact.id
        );
      });
      const updatedFavoritesGroup = state.contactFavorite.filter((favorite) => {
        return !state.gropuDeleteContacts.find(
          (deletedContact) => deletedContact.id === favorite.id
        );
      });

      return {
        ...state,
        gropuDeleteContacts:[],
        contacts: remainingContacts,
        contactFavorite: updatedFavoritesGroup,
      };
  }
};

export const handleActions = createContext();
function ActionsProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <handleActions.Provider value={{ state, dispatch }}>
        {children}
      </handleActions.Provider>
    </>
  );
}

const useActions = () => {
  const { state, dispatch } = useContext(handleActions);
  return [state, dispatch];
};

export { useActions };
export default ActionsProvider;
