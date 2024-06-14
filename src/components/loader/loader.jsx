import styled from 'styled-components';

const LoaderContainer = ({ className, ...props }) => {
	return (
		<div className={className}>
			<div className="loader" {...props}></div>
		</div>
	);
};
export const Loader = styled(LoaderContainer)`
	& .loader {
		position: absolute;
		border: 2px solid #b5d8ff;
		width: ${({ size = '150px' }) => size};
		height: ${({ size = '150px' }) => size};
		border-radius: 50%;
		box-shadow: 0 -2px 2px rgba(0, 0, 0, 0.2);
		border-bottom: 2px solid #5c9ce5;
		animation: loader 3s linear infinite;
	}

	& .loader:before {
		content: '';
		position: absolute;
		top: 10px;
		left: 10px;
		bottom: 10px;
		right: 10px;
		border: 2px solid #b5d8ff;
		box-shadow: 0 -2px 2px rgba(0, 0, 0, 0.2);
		border-bottom: 2px solid #5c9ce5;
		border-radius: 50%;
		animation: loader 2s linear infinite;
	}

	& .loader:after {
		content: '';
		position: absolute;
		top: 22px;
		left: 22px;
		bottom: 22px;
		right: 22px;
		border: 2px solid #b5d8ff;
		box-shadow: 0 -2px 2px rgba(0, 0, 0, 0.2);
		border-bottom: 2px solid #5c9ce5;
		border-radius: 50%;
		animation: loader 1s linear infinite;
	}

	@keyframes loader {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;
