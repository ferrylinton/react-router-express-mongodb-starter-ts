import * as Switch from '@radix-ui/react-switch';
import { useEffect, useState } from 'react';
import styles from './ThemeSwitcher.module.css';
import { useLocalStorage } from '~/hooks/useLocalStorage';

const THEME = 'theme';



export const ThemeSwitcher = () => {
	const [theme, setTheme] = useState<String>("light");

	useEffect(() => {
		let currentTheme = localStorage.getItem(THEME) || "light";
		localStorage.setItem(THEME, currentTheme);
		setTheme(currentTheme);
		document.body.classList.add(currentTheme);
	}, [THEME]);

	const onCheckedChangeHandler = (value: boolean) => {
		let currentTheme = value ? 'dark' : 'light';
		setTheme(currentTheme);
		localStorage.setItem(THEME, currentTheme);

		if (currentTheme === 'dark') {
			document.body.classList.add('dark');
			document.body.classList.remove('light');
		} else {
			document.body.classList.remove('dark');
			document.body.classList.add('light');
		}
	};


	return (
		<div className={styles['theme-switcher']}>
			<Switch.Root checked={theme === "dark"} onCheckedChange={onCheckedChangeHandler}>
				<Switch.Thumb />
			</Switch.Root>
		</div>
	);
};
