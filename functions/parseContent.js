import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';


const contentDirectory = path.join(process.cwd(), 'content');

export default function parseContent(fileName) {
    // Read the md file as a string
    const filePath = path.join(contentDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, 'utf8');

    // Parse the metadata section with gray-matter
    const matterContents = matter(fileContents);

    const metadata = matterContents.data;
    const content = matterContents.content;

    const courseData = { metadata, content }

    return courseData;
}