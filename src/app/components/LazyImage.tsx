import React from 'react';

interface Props {
	src: string;
	alt?: string;
	fallback?: any;
	fallbackSrc?: string;
	className?: string;
	style?: React.CSSProperties;
	width?: string | number;
	height?: string | number;
	onClick?(e: React.MouseEvent<HTMLImageElement, MouseEvent>): void;
}

const LazyImage: React.FC<Props> = ({
	src,
	alt,
	fallback,
	fallbackSrc,
	className,
	style,
	width,
	height,
	onClick,
}) => {
	const [loaded, setLoaded] = React.useState(false);

	return (
		<>
			{!loaded &&
				(fallbackSrc ? (
					<img
						src={fallbackSrc}
						alt={alt}
						style={style}
						className={className}
						onClick={onClick}
						width={width}
						height={height}
					/>
				) : (
					fallback
				))}
			<img
				src={src}
				className={className}
				onClick={onClick}
				style={!loaded ? { display: 'none' } : style}
				alt={alt}
				onLoad={() => setLoaded(true)}
				width={width}
				height={height}
			/>
		</>
	);
};

export default LazyImage;
