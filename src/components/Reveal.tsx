import * as React from "react";

export interface RevealProps {
    children: React.ReactNode;
    /** Tailwind/utility classes applied to the wrapper */
    className?: string;
    /** Reveal preset: text/section vs image scale/fade vs scrub-word group */
    as?: "block" | "image";
    /** Stagger delay 1..4 (matches CSS .reveal-delay-N) */
    delay?: 0 | 1 | 2 | 3 | 4;
    /** Once revealed, never undo */
    once?: boolean;
    /** Custom HTML tag */
    tag?: keyof React.JSX.IntrinsicElements;
    /** Forward style */
    style?: React.CSSProperties;
}

/**
 * IntersectionObserver-driven reveal. SSR-safe: server renders with
 * `.reveal` (hidden) class; client toggles `.is-visible` once visible.
 */
export const Reveal: React.FC<RevealProps> = ({
    children,
    className = "",
    as = "block",
    delay = 0,
    once = true,
    tag = "div",
    style,
}) => {
    const ref = React.useRef<HTMLElement | null>(null);
    const [visible, setVisible] = React.useState(false);

    React.useEffect(() => {
        const node = ref.current;
        if (!node) return;
        if (typeof IntersectionObserver === "undefined") {
            setVisible(true);
            return;
        }
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        setVisible(true);
                        if (once) io.unobserve(e.target);
                    } else if (!once) {
                        setVisible(false);
                    }
                });
            },
            { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
        );
        io.observe(node);
        return () => io.disconnect();
    }, [once]);

    const baseClass = as === "image" ? "img-reveal" : "reveal";
    const delayClass = delay > 0 ? `reveal-delay-${delay}` : "";
    const visClass = visible ? "is-visible" : "";

    const Tag = tag as React.ElementType;
    return (
        <Tag
            ref={ref as React.MutableRefObject<HTMLElement | null>}
            className={`${baseClass} ${delayClass} ${visClass} ${className}`.trim()}
            style={style}
        >
            {children}
        </Tag>
    );
};

export default Reveal;
