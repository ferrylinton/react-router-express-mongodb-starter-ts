import React from 'react';
import styles from './Button.module.css';
import clsx from 'clsx';

type ButtonProps = {
	children?: React.ReactNode;
	variant?: 'primary' | 'secondary' | 'danger';
	size?: 'normal' | 'big' | 'small';
	minWidth?: number;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ children, variant, size, minWidth = 50, className, ...props }, ref) => {
		const getVariant = () => {
			if (variant === 'primary') {
				return styles['btn-primary'];
			} else if (variant === 'danger') {
				return styles['btn-danger'];
			} else {
				return styles['btn-secondary'];
			}
		};

		const getSize = () => {
			if (size === 'big') {
				return styles['btn-big'];
			} else if (size === 'small') {
				return styles['btn-small'];
			} else {
				return null;
			}
		};

		return (
			<button
				ref={ref}
				{...props}
				className={clsx(styles['btn'], getVariant(), getSize(), className)}
				style={{ minWidth }}
			>
				{children}
			</button>
		);
	}
);
