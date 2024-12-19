import { useTranslation } from "react-i18next";
import styles from "./DataNotFound.module.css"

export const DataNotFound = () => {

    const { t } = useTranslation();

    return (
        <div className={styles["data-not-found"]}>
            <p>{t("dataIsNotFound")}</p>
        </div>

    )
}
