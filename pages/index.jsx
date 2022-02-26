import parseContent from "../functions/parseContent";
import ReactMarkdown from 'react-markdown';
import styled from "styled-components";
import Image from "next/image";

const StyledCourse = styled.div`
	max-width: 1140px;
	margin: 5rem auto;
	padding: 0 1rem;
`

const H1 = styled.h2`
	font-size: 2.5rem;
	line-height: 1;
	margin-bottom: 1rem;
`
const H2 = styled.h3`
	font-size: 1.5rem;
	margin-top: 1.5rem;
`
const P = styled.p`
	font-size: 1rem;
`
const OL = styled.ol`
	margin-left: 1rem;
`

const StyledImg = styled.span`
	display: block;
	position: relative;
	width: 100%;
	height: max(30vh, 300px);
	margin: 2rem 0;
`
const IMG = ({ ...props }) => (
	<StyledImg>
		<Image {...props} layout="fill" objectFit="cover" objectPosition="left" />
	</StyledImg>
)

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
const VID = ({ iframe }) => (
	<StyledVid dangerouslySetInnerHTML={{ __html: iframe }} />
)

const STRONG = styled.strong`
	color: red;
`

const Metadata = ({ name, date }) => (
	<div style={{ display: "flex", gap: "1.5rem", color: "#555"}}>
		<p>Name: {name}</p>
		<p>Published: {date}</p>
	</div>
)

export default function Course({ metadata, content }) {
	return (
		<StyledCourse>
			<Metadata name={metadata.name} date={metadata.date} />
			<ReactMarkdown
				children={content}
				components={{
					h1: ({ node, ...props }) => <H1 {...props} />,
					h2: ({ node, ...props }) => <H2 {...props} />,
					h4: ({ node, ...props }) => <VID {...props} iframe={metadata.video} />,
					p: ({ node, ...props }) => <P {...props} />,
					ol: ({ node, ...props }) => <OL {...props} />,
					img: ({ node, ...props }) => <IMG {...props} />,
					strong: ({ node, ...props }) => <STRONG {...props} />
				}}
			/>
		</StyledCourse>
	)
}

export async function getStaticProps() {
	const courseData = parseContent("course1.md");
	return {
		props: {
			metadata: courseData.metadata,
			content: courseData.content
		}
	}
}