import { useState } from "react";
import DirectionCenter from "./DirectionCenter";
import DirectionLeft from "./DirectionLeft";
import DirectionLeftUp from "./DirectionLeftUp";
import styles from "./HomePage.module.css";
import { VscAccount } from "react-icons/vsc";

function HomePage() {
  const [FavoriteOrAll, setFavoriteOrall] = useState(1);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <DirectionLeftUp
            FavoriteOrAll={FavoriteOrAll}
            setFavoriteOrall={setFavoriteOrall}
          />
          <VscAccount className={styles.icon}/>
          <DirectionLeft />
        </div>
        <div className={styles.center}>
          {" "}
          <DirectionCenter
            FavoriteOrAll={FavoriteOrAll}
          />
        </div>
      </div>
    </>
  );
}

export default HomePage;
