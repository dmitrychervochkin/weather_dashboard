import styled from 'styled-components';

const IconImgContainer = ({ className, iconId }) => {
	return (
		<div className={className}>
			<img src={`https://openweathermap.org/img/wn/${iconId}.png`} />
		</div>
	);
};

export const IconImg = styled(IconImgContainer)`

`;
