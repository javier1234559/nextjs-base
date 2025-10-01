import { useLayoutEffect } from "react";

export function useScrollToHash(deps: any[] = []) {
    useLayoutEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const el = document.querySelector(hash);
            if (el) {
                const headerHeight = 100;
                const y = el.getBoundingClientRect().top + window.scrollY - Number(headerHeight);
                console.log('y', y);
                console.log('el.getBoundingClientRect().top', el.getBoundingClientRect().top);
                window.scrollTo({ top: y, behavior: "smooth" });
            }
        }
    }, deps);
}
