tsParticles.load("bgparticles-back", {
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
            color: "0000ff",
            opacity: 0.5,
        },
        color: {
            value: "0000ff",
        },
        size: {
            value: { min: 1, max: 3 },
        },
    },
});

tsParticles.load("bgparticles-front", {
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
            opacity: 1,
        },
        color: {
            value: "00ffff",
        },
        size: {
            value: { min: 1, max: 3 },
        },
    },
});