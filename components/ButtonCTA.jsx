import styled from "styled-components";
import { motion } from "framer-motion";
import { useRef } from "react";

const StyledButton = styled(motion.button)`
    --background: ${({ theme }) => theme.colors.cta};
    --backgroundHover: ${({ theme }) => theme.colors.ctaHover};
    --text: ${({ theme }) => theme.colors.ctaText};
    --textHover: ${({ theme }) => theme.colors.ctaTextHover};
    --shadow: ${({ theme }) => theme.shadows.default};

    width: ${({ width }) => width ? `${width}px` : "100%"};
    padding: .75em 3em;
    border-radius: 1em;
    background: var(--background);
    color: var(--text);
    font-weight: bold;
    box-shadow: var(--shadow);

    :focus:not(:focus-visible) {
        outline: none;
    }

    :hover {
        cursor: pointer;
        background: var(--backgroundHover);
        color: var(--textHover);
    }

    :active {
        transform: scale(.95);
    }
`

export default function ButtonCTA({ children, onClick, width }) {

    const button = useRef();
    // Allow clicking with enter
    const handleEnterDown = (e) => {
        if (e.keyCode === 13) {
            button.current.click();
        }
    }
    return (
        <StyledButton ref={button} onClick={onClick} onKeyDown={(e) => handleEnterDown(e)} width={width}>
            {children}
        </StyledButton>
    )
}