import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { loadFull } from "tsparticles";
import { useCallback, useMemo } from "react";
import PropTypes from "prop-types";


const ParticlesComp = (props) => {

    const options = useMemo(() => {

        return {
            background: {
                color: "#21bfd0",
            },
            fullScreen: {
                enable: true,
                zIndex: -1,
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "repulse"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 400,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "particles": {
                "number": {
                    "value": 40,
                    "density": {
                        "enable": true,
                        "value_area": 900
                    }
                },
                "color": {
                    "value": "#51cbd9"
                },
                "shape": {
                    "type": "polygon",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 6
                    },
                    "image": {
                        "src": "img/github.svg",
                        "width": 200,
                        "height": 200
                    }
                },
                "opacity": {
                    "value": 0.5451601006942778,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 10,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 70,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 73.08694910712106,
                        "size_min": 8.932849335314796,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 200,
                    "color": "#87e4ef",
                    "opacity": 0.4,
                    "width": 1.6
                },
                "move": {
                    "enable": true,
                    "speed": 1.810236182596568,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 1443.0708547789707,
                        "rotateY": 1200
                    }
                }
            },
        };
    }, []);

    const particlesInit = useCallback((engine) => {
        loadSlim(engine);
        loadFull(engine);

    }, []);

    return <Particles id={props.id} init={particlesInit} options={options} />;
};

ParticlesComp.propTypes = {
    id: PropTypes.any
}

export default ParticlesComp;