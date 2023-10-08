import React from "react";
import './style.scss';

interface ITitleProps {
	className?: string;
	children: React.ReactNode;
}

const Title: React.FC<ITitleProps> = ({ className, children }) => {
	return (
		<div className={className}>{children}</div>
	)
}

export default Title;