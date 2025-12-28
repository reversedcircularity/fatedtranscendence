tsParticles.load("bgparticles", {
    particles: {
        number: {
            value: 200,
        },
        move: {
            enable: true,
        },
        links: {
            enable: true,
            distance: 250,
            color: "0088ff",
        },
        color: {
            value: "00ffff",
        },
        size: {
            value: { min: 1, max: 3 },
        },
    },
});