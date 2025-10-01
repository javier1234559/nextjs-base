// Extract ID and address from slug
// Format: "5dba1e3a701b2f57a5afee82- , MORISSETTELAND NEW JERSEY, 68730-5469"
export const extractIdAndAddress = (slug: string) => {
    if (!slug) return { id: "", address: "" };

    // Split by the first dash followed by a space and comma
    const match = slug.match(/^([^-]+)- , (.+)$/);
    if (match) {
        const id = match[1];
        let address = match[2]
            .replace(/%20/g, ' ') // Replace %20 with spaces
            .replace(/^[,%20]+/, '') // Remove leading commas and spaces
            .replace(/[,%20]+$/, '') // Remove trailing commas and spaces
            .replace(/,%20/g, ', ') // Replace ",%20" with ", "
            .trim();

        // Clean up any remaining URL encoding
        try {
            address = decodeURIComponent(address);
        } catch (e) {
            // If decodeURIComponent fails, keep the original
            console.warn('Failed to decode address:', address);
        }

        return { id, address };
    }

    // Fallback: try to split by just the dash
    const fallbackMatch = slug.match(/^([^-]+)-(.+)$/);
    if (fallbackMatch) {
        const id = fallbackMatch[1];
        let address = fallbackMatch[2]
            .replace(/%20/g, ' ') // Replace %20 with spaces
            .replace(/^[,%20\s]+/, '') // Remove leading commas, spaces, and %20
            .replace(/[,%20\s]+$/, '') // Remove trailing commas, spaces, and %20
            .replace(/,%20/g, ', ') // Replace ",%20" with ", "
            .trim();

        // Clean up any remaining URL encoding
        try {
            address = decodeURIComponent(address);
        } catch (e) {
            // If decodeURIComponent fails, keep the original
            console.warn('Failed to decode address:', address);
        }

        return { id, address };
    }

    return { id: slug, address: "" };
};
