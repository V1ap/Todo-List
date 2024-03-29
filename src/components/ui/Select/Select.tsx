import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { generateRandomString } from "../../../utils/generateRandomString";
import styles from "./styles.module.scss";
import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";

interface ISelect {
  items: string[];
  currentItem: string;
  setCurrentItem: (item: string) => void;
}

const Select: React.FC<ISelect> = ({ items, setCurrentItem, currentItem }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const divRef = useRef<HTMLDivElement | null>(null);
  const { t } = useTranslation();

  const closeSelectHandler = () => {
    setIsOpen(false);
  };

  const toggleSelectHandler = () => {
    setIsOpen((prev) => !prev);
  };

  const selectItemHandler = (item: string) => {
    setIsOpen(false);
    setCurrentItem(item);
  };

  useOnClickOutside(divRef, closeSelectHandler); // хук клика за окном селекта

  return (
    <div ref={divRef} className={styles.select__container}>
      <button onClick={toggleSelectHandler} className={styles.select__btn}>
        {t(currentItem)}
      </button>
      {isOpen && (
        <ul className={styles.select__list}>
          {items.map((item) => {
            if (item !== currentItem) {
              return (
                <li
                  className={styles.select__item}
                  key={generateRandomString()}
                >
                  <button
                    onClick={() => selectItemHandler(item)}
                    className={styles.select__itemBtn}
                  >
                    {t(item)}
                  </button>
                </li>
              );
            } else return null;
          })}
        </ul>
      )}
    </div>
  );
};

export default Select;
