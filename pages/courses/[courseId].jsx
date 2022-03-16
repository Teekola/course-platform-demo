import ReactMarkdown from 'react-markdown';
import remarkUnwrapImages from 'remark-unwrap-images';
import remarkGfm from 'remark-gfm';
import transformations from "../../markdown/markdownTransformations";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useSession, signOut } from 'next-auth/react';
import ButtonCTA from '../../components/ButtonCTA';

// Server-Side Imports
import fs from 'fs';
import path from 'path';
import parseContent from '../../markdown/parseContent';


const StyledCourse = styled.div`
	max-width: 1140px;
	margin: 5rem auto;
	padding: 0 1rem;
`
const Metadata = ({ name, date }) => (
    <div style={{ display: "flex", gap: "1.5rem", color: "#555" }}>
        <p>Name: {name}</p>
        <p>Published: {date}</p>
    </div>
)

export default function Course({ metadata, content }) {
    const { data: session } = useSession();
    const router = useRouter();

    // If getStaticPaths gives fallback, show Loading...
    if (router.isFallback) {
        return <h1>Loading...</h1>
    }

    // If the user has logged in
    if (session) {
        return (
            <StyledCourse>
                <p>Signed in as {session.user.name}</p>
                <button onClick={() => signOut()}>Sign out</button>
                <Metadata name={metadata.name} date={metadata.date} />
                <ReactMarkdown
                    children={content}
                    components={transformations(metadata)}
                    remarkPlugins={[
                        remarkUnwrapImages,
                        remarkGfm
                    ]}
                />
            </StyledCourse>
        )
    }

    // If the user has not logged in
    return (
        <StyledCourse>
            <h1>{metadata.name}</h1>
            <p>published <time>{metadata.date}</time></p>
            <p>price <strong>25 €</strong></p>
            <ButtonCTA width={300}>Buy</ButtonCTA>
        </StyledCourse>
    )
}

export async function getStaticPaths() {
    // Read the courses from the content directory and return all existing 
    // course page paths that should be rendered on build time.
    const contentDirectory = path.join(process.cwd(), 'content');
    const fileNames = fs.readdirSync(contentDirectory);
    const paths = fileNames.map((fileName) => `/courses/${fileName.substring(6, fileName.length - 3)}`);

    // fallback: true enables rendering static pages that have not been included
    // in the paths on the client side. With router.isFallback it is possible to
    // render a loading component, etc.
    return {
        paths,
        fallback: true
    }
}

export async function getStaticProps(context) {
    // Get the courseId from the url
    const { courseId } = context.params;

    // Parse the course file
    const courseData = parseContent(`course${courseId}.md`);
    return {
        props: {
            metadata: courseData.metadata,
            content: courseData.content
        }
    }
}