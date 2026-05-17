import React from "react";

interface LogoProps {
    className?: string;
    alt?: string;
}

/**
 * Brand logomark — the actual favicon asset, used as the header logo
 * so the brand identity stays identical to the browser tab.
 */
export const Logo = ({ className = "size-7", alt = "" }: LogoProps) => (
    <img
        src="/images/favicon-32x32.png"
        alt={alt}
        width={32}
        height={32}
        className={`rounded-md ${className}`}
        decoding="async"
        loading="eager"
    />
);
