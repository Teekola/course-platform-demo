import styled from "styled-components";
import Image from "next/image";

const StyledImg = styled.div`
	display: block;
	position: relative;
	width: 100%;
	height: max(30vh, 300px);
	margin: 2rem 0;
`
const IMG = ({ ...props }) => (
	<StyledImg>
		<Image {...props} layout="fill" objectFit="cover" objectPosition="center" />
	</StyledImg>
)

// max-width 16:9 container filled by iframe
const StyledVid = styled.div`
	position: relative;
	width: 100%;
	padding-top: 56.25%;
	margin: 2rem 0;

	> iframe {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		width: 100%;
		height: 100%;
	}
`
const VID = ({ src }) => (
	<StyledVid>
		<iframe
			src={src}
			title="YouTube video player"
			frameBorder="0"
			allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowFullScreen>
		</iframe>
	</StyledVid>
)

export { IMG, VID };