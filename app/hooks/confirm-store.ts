import { create } from 'zustand';

type ConfirmState = {
	message: string;
	show: boolean;
	okHandler: () => Promise<void>;
	showConfirm: (message: string, okHandler: () => Promise<void>) => void;
	hideConfirm: () => void;
};

const DEFAULT_VALUE: Partial<ConfirmState> = {
	message: 'Are you sure?',
	show: false,
	okHandler: () => {
		return new Promise(resolve => resolve);
	},
};

export const useConfirmStore = create<ConfirmState>(set => ({
	message: 'Are you sure?',
	show: false,
	okHandler: () => {
		return new Promise(resolve => resolve);
	},
	showConfirm: (message: string, okHandler: () => Promise<void>) => {
		set(() => ({ show: true, message, okHandler }));
	},
	hideConfirm: () => {
		set(() => DEFAULT_VALUE);
	},
}));
