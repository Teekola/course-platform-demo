import Link from "next/link";
import styled from "styled-components";

const StyledA = styled.a`
    --background: ${({ theme }) => theme.colors.cta};
    --backgroundHover: ${({ theme }) => theme.colors.ctaHover};
    --text: ${({ theme }) => theme.colors.ctaText};
    --textHover: ${({ theme }) => theme.colors.ctaTextHover};
    --shadow: ${({ theme }) => theme.shadows.default};

    text-decoration: none;
    background: var(--background);
    border-radius: 1rem;
    padding: .5rem 1rem;
    display: flex;
    justify-content: center;
    color: var(--text);
    font-weight: bold;

    :hover {
        cursor: pointer;
        color: var(--textHover);
        background: var(--backgroundHover);
    }

    :active {
        transform: scale(.95);
    }

    :focus:not(:focus-visible) {
        outline: none;
    }
`

export default function LinkCTA({ href, visibleUrl, children }) {
    return (
        <Link href={href} as={visibleUrl} passHref>
            <StyledA draggable="false">{children}</StyledA>
        </Link>
    )
}