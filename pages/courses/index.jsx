import { useSession } from "next-auth/react";
import styled from "styled-components";
import fs from 'fs';
import path from 'path';
import parseContent from "../../markdown/parseContent";
import ButtonCTA from "../../components/ButtonCTA";
import LinkCTA from "../../components/LinkCTA";
import { useRouter } from "next/router";

const StyledCourse = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
    padding: 1.5em 3em 1.5em;
    width: 300px;
    box-shadow: ${({ theme }) => theme.shadows.card};
    border-radius: 1.5em;
`
const Course = ({ name, date, id, owned=false }) => {
    const router = useRouter();
    if (owned) {
        return (
            <StyledCourse>
                <header>
                    <h3>{name}</h3>
                    <time>{date}</time>
                </header>
                <LinkCTA href={`/courses/${id}`}>Go to course</LinkCTA>
            </StyledCourse>
        )
    }
    return (
        <StyledCourse>
            <header>
                <h3>{name}</h3>
                <time>{date}</time>
            </header>
            <LinkCTA href={`/courses/${id}`}>Buy course</LinkCTA>
        </StyledCourse>
    )
}

const StyledCourses = styled.div`
    display: flex;
    flex-flow: row wrap;
    gap: 1rem;
`

const StyledPage = styled.div`
    display: grid;
    gap: 1.5rem;
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem 1rem 5rem;
`

export default function Courses({ courses }) {
    const { data: session } = useSession();

    if (session) {
        return (
            <StyledPage>
                <h1>Courses</h1>
                <StyledCourses>
                    {
                        courses.map(course => <Course key={course.id} name={course.name} date={course.date} id={course.id} />)
                    }
                </StyledCourses>
            </StyledPage>
        )
    }

    return (
        <StyledPage>
            <h1>Courses</h1>
            <StyledCourses>
                {
                    courses.map(course => <Course key={course.id} name={course.name} date={course.date} id={course.id} />)
                }
            </StyledCourses>
        </StyledPage>
    )
}


export async function getStaticProps(context) {

    // Read the courses from the content directory
    const contentDirectory = path.join(process.cwd(), 'content');
    const fileNames = fs.readdirSync(contentDirectory);

    // Get metadata from each course and pass it
    let courses = [];
    fileNames.forEach(fileName => {
        let content = parseContent(fileName);
        let id = fileName.substring(6, fileName.length - 3);
        content.metadata.id = id;
        courses.push(content);
    });
    courses = courses.map(course => course.metadata);

    return {
        props: {
            courses,
        }
    }
}