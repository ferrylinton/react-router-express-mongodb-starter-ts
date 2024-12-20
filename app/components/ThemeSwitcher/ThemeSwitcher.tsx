import * as Switch from '@radix-ui/react-switch';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import styles from './ThemeSwitcher.module.css';

export const DEFAULT_THEME = 'light';

export const THEME = 'theme';

export const ThemeSwitcher = () => {
	const [theme, setTheme] = useState<Theme>((Cookies.get(THEME) as Theme) || DEFAULT_THEME);

	const [checked, setChecked] = useState(false);

	const setThemeClassname = (theme: Theme) => {
		if (theme === 'dark') {
			document.body.classList.add('dark');
			document.body.classList.remove('light');
		} else {
			document.body.classList.remove('dark');
			document.body.classList.add('light');
		}
	};

	const toggleTheme = () => {
		const newTheme = theme === 'dark' ? 'light' : 'dark';
		setTheme(newTheme);
		Cookies.set(THEME, newTheme, { path: '/' });
		setThemeClassname(newTheme);
	};

	useEffect(() => {
		setChecked(theme === 'dark');
	}, [theme]);

	return (
		<div className={styles['theme-switcher']}>
			<Switch.Root checked={checked} onCheckedChange={() => toggleTheme()}>
				<Switch.Thumb />
			</Switch.Root>
		</div>
	);
};
