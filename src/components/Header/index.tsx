
import { observer } from 'mobx-react-lite';
import styles from './Header.module.css';
import type { HeaderStore } from '../../stores/header';

interface HeaderProps {
    store: HeaderStore
}
export const Header = observer((props: HeaderProps) => {

    return (
        <header className={styles.header}>
            <div className={styles.logo}>MyApp</div>
            <div>
                {props.store.actions.map((action, index) => (
                    <button
                        key={`header_bar_${index}`}
                        onClick={action.onClick}
                        className={styles.headerBtn}
                    >
                        {action.label}
                    </button>
                ))}
            </div>

        </header>
    );
});