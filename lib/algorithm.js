function nearestColorHsl(r, g, b, h, s, palette) {
    let minDist = Infinity;
    let closest;

    for (const i in palette) {
        const [th, ts] = palette[i];
        const dist = (h - th) ** 2 + (s - ts) ** 2;
        if (dist < minDist) {
            minDist = dist;
            closest = i;
        }
    }

    return closest;
}

function nearestColorRgb([r, g, b], palette) {
    let minDist = Infinity;
    let closest = [0, 0, 0];

    for (const [tr, tg, tb] of palette) {
        const dist = (r - tr) ** 2 + (g - tg) ** 2 + (b - tb) ** 2;
        if (dist < minDist) {
            minDist = dist;
            closest = [tr, tg, tb];
        }
    }

    return closest;
}

module.exports = { nearestColorHsl, nearestColorRgb };