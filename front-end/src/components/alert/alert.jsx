import { useEffect, useState } from "react";
import styles from "./alert.module.css";

export default function Alert({ message, success = false, resetShowAlert }) {
  const [showAlert, setShowAlert] = useState(true);

  const color = () => {
    if(success){
      return " bg-green-300";  
    }
    return " bg-red-300";
  }

  const progressBar = () => {
    if(success){
      return " bg-green-700";  
    }
    return " bg-red-700";
  }
 
  useEffect(() => {
    setTimeout(() => {
      setShowAlert(false);
      resetShowAlert(false);
    }, 7000);
  }, [resetShowAlert]); 

  return (
    <>
      {showAlert && (
        <div className={styles.alert}>
          <div className={styles.alert_show + color()}>
            <p>{message}</p>
            <div className={styles.progress_bar + progressBar()}></div>
            <button
              className={styles.alert_button}
              aria-label="Close alert"
              onClick={() => setShowAlert(!showAlert)}
            >
              X
            </button>
          </div>
        </div>
      )}
    </>
  );
}
