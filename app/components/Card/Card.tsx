import React from 'react';
import styles from './Card.module.css';

type CardProps = {
	title: string;
	style?: React.CSSProperties;
	children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const Card = ({ title, children, style }: CardProps) => {
	return (
		<div className={styles['card']} style={style}>
			<div className={styles['card-header']}>{title}</div>
			<div className={styles['card-content']}>{children}</div>
		</div>
	);
};
