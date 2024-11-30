import React from 'react';
import styles from './Icon.module.css';

type Props = {
	style?: React.CSSProperties;
};

export const TriangleDown = ({ style }: Props) => {
	return <span className={styles['triangle-down']} style={style}></span>;
};
