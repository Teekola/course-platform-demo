import { default as styles } from "./markdownStyles";
import { VID, IMG } from "./markdownComponents";

const transformations = (metadata) => {
    return {
        // Text
        h1: ({ node, ...props }) => <styles.H1 children={props.children} />,
        h2: ({ node, ...props }) => <styles.H2 children={props.children}/>,
        p: ({ node, ...props }) => <styles.P children={props.children}/>,

        // Emphasis
        strong: ({ node, ...props }) => <styles.STRONG {...props} />,

        // Basic elements
        ol: ({ node, ...props }) => <styles.OL {...props} />,

        // Special elements
        h4: ({ node, ...props }) => <VID src={metadata.video} {...props} />,
        img: ({ node, ...props }) => <IMG {...props} />
    }
}

export default transformations;