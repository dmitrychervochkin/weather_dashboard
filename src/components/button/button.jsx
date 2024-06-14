import styled from 'styled-components';

const ButtonContainer = ({ className, children, isFavorite, ...props }) => {
	return (
		<button className={className} {...props}>
			{children}
		</button>
	);
};

export const Button = styled(ButtonContainer)`
	transition: 0.3s;
	text-transform: uppercase;
	border-radius: 15px;
	background-color: #f1f1f1;
	filter: brightness(90%);
	border: none;
	font-weight: 600;
	height: ${({ height = '30px' }) => height};
	width: ${({ width = '100px' }) => width};
	background-color: ${({ isFavorite }) => (isFavorite ? 'yellow' : '')};

	&:hover {
		cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
		filter: brightness(80%);
		transition: 0.3s;
	}
`;
