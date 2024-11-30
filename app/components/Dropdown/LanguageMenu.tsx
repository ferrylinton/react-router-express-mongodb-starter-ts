import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CircleFilledIcon from '~/icons/CircleFilledIcon';
import { EnglishIcon } from '~/icons/EnglishIcon';
import { IndonesiaIcon } from '~/icons/IndonesiaIcon';
import { TriangleDown } from '~/icons/TriangleDown';
import { TriangleUp } from '~/icons/TriangleUp';
import styles from './Dropdown.module.css';
import Cookies from 'js-cookie';

export const LanguageMenu = () => {

	let { i18n } = useTranslation();

	const [open, setOpen] = useState<boolean>(false);

	const onLanguageChange = (value: string) => {
		i18n.changeLanguage(value);
		console.log("xxxxxxxxxxxxxxxxxxxxx");
		console.log(Cookies.get("locale"));
		Cookies.set("locale", value);
	}

	return (
		<DropdownMenu.Root open={open} onOpenChange={() => setOpen(!open)}>
			<DropdownMenu.Trigger asChild>
				<button className={styles['dropdown-menu-trigger']} aria-label="Customise options">
					{i18n.language === 'id' ? <IndonesiaIcon /> : <EnglishIcon />}
					{open ? <TriangleUp /> : <TriangleDown />}
				</button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Portal>
				<DropdownMenu.Content
					className={styles['dropdown-menu-content']}
					sideOffset={3}
					align="end"
				>
					<DropdownMenu.RadioGroup
						value={i18n.language}
						onValueChange={onLanguageChange}
					>
						<DropdownMenu.RadioItem value="en">
							<DropdownMenu.ItemIndicator>
								<CircleFilledIcon />
							</DropdownMenu.ItemIndicator>
							<EnglishIcon />
							<span>English</span>
						</DropdownMenu.RadioItem>
						<DropdownMenu.RadioItem value="id">
							<DropdownMenu.ItemIndicator>
								<CircleFilledIcon />
							</DropdownMenu.ItemIndicator>
							<IndonesiaIcon />
							<span>Indonesia</span>
						</DropdownMenu.RadioItem>
					</DropdownMenu.RadioGroup>
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	);
};
