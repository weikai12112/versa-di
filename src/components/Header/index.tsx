
import { observer } from 'mobx-react-lite';
import type { IHeaderBar } from '../../parts/headerbar/headerbar.interface';
import styles from './Header.module.css';

interface HeaderProps {
    service: IHeaderBar
}
export const Header = observer((props: HeaderProps) => {

    return (
        <header className={styles.header}>
            <div className={styles.logo}>MyApp</div>
            <div>
                {props.service.actions.map((action, index) => (
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