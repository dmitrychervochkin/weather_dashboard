import { forwardRef } from 'react';
import styled from 'styled-components';

const InputContainer = forwardRef(({ className, children, ...props }, ref) => {
	return (
		<input className={className} ref={ref} {...props}>
			{children}
		</input>
	);
});

export const Input = styled(InputContainer)`
	// &:hover {
	// 	cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
	// 	filter: brightness(90%);
	// 	transition: 0.3s;
	// }

	outline: none;
	border: none;
	font-size: 15px;
	padding: 10px;
	border-radius: 15px;
	width: ${({ width = '150px' }) => width};
	height: ${({ height = '10px' }) => height};
`;
