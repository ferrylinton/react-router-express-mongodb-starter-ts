import React from 'react';
import styles from './Icon.module.css';

type Props = {
	style?: React.CSSProperties;
};

export const TriangleUp = ({ style }: Props) => {
	return <span className={styles['triangle-up']} style={style}></span>;
};
