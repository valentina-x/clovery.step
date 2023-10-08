import React from "react";
import './style.scss';

interface IButtonProps {
	className?: string;
	children: React.ReactNode;
	type: string
}

const Button: React.FC<IButtonProps> = ({ className, children }) => {
	return (
		<button className={className}>
			{children}
		</button>
	)
}

export default Button;