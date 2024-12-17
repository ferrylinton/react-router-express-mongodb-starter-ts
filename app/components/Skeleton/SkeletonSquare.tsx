import styles from './Skeleton.module.css';

type SkeletonSquareProps = {
	width?: number | string;
	height?: number | string;
};

export const SkeletonSquare = ({ height = 15, width = 60 }: SkeletonSquareProps) => {
	return <div className={styles['skeleton-square']} style={{ width, height }}></div>;
};
