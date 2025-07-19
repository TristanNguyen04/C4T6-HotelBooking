export const parseChildrenAges = (guestsParam: string): number[] => {
    const ages: number[] = [];
    const parts = guestsParam.split('|');
    for (const part of parts) {
        if (part.includes(':')) {
            const agesPart = part.split(':')[1];
            if (agesPart) {
                const roomAges = agesPart.split(',').map(age => parseInt(age)).filter(age => !isNaN(age));
                ages.push(...roomAges);
            }
        }
    }
    return ages;
};