

/* DATA */

const tag_colors = [
    '#dd1eea', // pink
    '#24ec10', // green
    '#14c3f6', // light blue
    '#f69614', // orange
    '#9314f6', // purple
    '#f61452', // bright red
    '#0e38f5', // blue
    '#14f6a4', // teal
    '#abbd5c', // beige
    '#c27417', // blood orange
    '#9e17c2', // purple-red
    '#', // 
]


const projects = [
    {
        title: 'ascii-monet',
        year: '2025',
        description: 'A CLI utility I wrote to convert images into colorful ascii art in the terminal. Written in Python and published to PyPi!',
        tags: ['Python', 'PyPi'],
        image: 'assets/project_images/ascii-art.png',
        html: '',
        link_type: 'github🡭',
    },
    {
        title: 'Swing!',
        year: '2019',
        description: "A JavaScript game I made for a Game Jam! Created with the JavaScript library p5.js, it contains over 15,000 lines of code, 4 distinct levels and a paractice arena!",
        tags: ['JavaScript', 'p5.js'],
        image: 'assets/project_images/swing.png',
        html: 'https://matttheperson.github.io/Swing',
        link_type: '',
    },
    {
        title: 'LED Dot Matrix Displays (in CSS!)',
        year: '2024.06',
        description: 'A JS library to add interactive Dot Matrix displays to your webpage! Visuals achieved entirely in CSS. Fair warning, they are quite resource intensive. ',
        tags: ['CSS', 'JavaScript'],
        image: 'assets/project_images/dot-matrix.png',
        html: 'projects/LEDMatrixDisplay/index.html',
        link_type: '',
    },
    {
        title: 'ML Flappy Bird',
        year: '2018.4',
        description: "Training an Artificial Neural Network to play FlappyBird! The \"birds\" are trained by letting 100 birds try the game and then randomly mutating the most elite bird. The NN and was coded entirely in JavaScript.",
        tags: ['ML', 'JavaScript', 'p5.js'],
        image: 'assets/project_images/flappy-bird.png',
        html: 'projects/FlappyBird/index.html',
        link_type: '',
    },
    {
        title: 'Arduino project',
        year: '2022',
        description: "An 3d printed Arduino-controlled car that follows objects using Ultrasonic Sensors. Made as a group project for my 'Principles of Digital Fabrication' course.",
        tags: ['Arduino', 'CAD', '3D Printing', 'C++'],
        image: 'assets/project_images/arduino-project.png',
        html: '',
        link_type: 'markdown',
    },
    {
        title: 'Perlin Noise Landscape',
        year: '2023',
        description: 'Fun little p5.js sketch to visualize perlin noise. The noise function is two dimensional giving the effect of a landscape. Tweak the parameters and see how it changes!',
        tags: ['JavaScript', 'p5.js'],
        image: 'assets/project_images/perlin-noise.png',
        html: 'projects/perlin/index.html',
        link_type: '',
    },
    {
        title: 'CandyPop Gallery',
        year: '2024.11',
        description: '(Under Construction) A media exploration app designed to address the UI/UX shortcomings (in my opinion) when exploring media using sites like Twitter, Instagram and Reddit. Frontend written in ReactJS and backend using Python Flask.',
        tags: ['JavaScript', 'ReactJS', 'Python'],
        image: 'assets/project_images/candypop-gall-temp.png',
        html: 'https://github.com/MattThePerson/CandyPopGallery',
        link_type: 'github🡭',
    },
    {
        title: 'Double Pendulum Sketch',
        year: '2019.03',
        description: 'A p5.js sketch of an interactive double pendulum. Based off a Coding Train tutorial which used the Processing language.',
        tags: ['JavaScript', 'p5.js'],
        image: 'assets/project_images/double-pendulum.png',
        html: 'projects/DoublePendulum/index.html',
        link_type: '',
    },
    {
        title: 'Vibrating String Sketch',
        year: '2020.01',
        description: 'A p5.js sketch of an interactive vibrating string demonstrating how vibrations can emerge from tiny, elastic segments. Change the parameters and see how it behaves!',
        tags: ['JavaScript', 'p5.js'],
        image: 'assets/project_images/vibrating-string.png',
        html: 'projects/VibratingString/index.html',
        link_type: '',
    },
    {
        title: 'Solar System Simulation',
        year: '2019',
        description: '',
        tags: ['JavaScript', 'p5.js'],
        image: 'assets/project_images/solar-system-simulation.png',
        html: 'projects/SolarSystemSimulation/index.html',
        link_type: '',
    },
    {
        title: 'Bleb Survival!',
        year: '2019',
        description: '',
        tags: ['JavaScript', 'p5.js'],
        image: 'assets/project_images/bleb-survival.png',
        html: 'projects/BlebSurvival/index.html',
        link_type: '',
    },
];

// let sorted_projects = [];
const selectedTags = [];
let sortByParam = null;
let sortByDescending = true;


/* FUNCTIONS */

// 
function updateProjectCards() {
    let projects_to_display = filterProjects(projects, selectedTags)
    if (sortByParam) {
        projects_to_display = sortObjectByStringParam(projects_to_display, sortByParam, sortByDescending);
    }
    renderProjectCards(projects_to_display);
}

// add project to page (update)
function renderProjectCards(project_items) {
    projectItemsContainer.innerHTML = '';
    
    setTimeout(() => {
        for (let project of project_items) {
            const card = create_project_card(project);
            projectItemsContainer.appendChild(card);
        }
        if (project_items.length%2 !== 0) {
            const invisibleCard = create_project_card(project_items[0]);
            invisibleCard.querySelector('.project-item').style.visibility='hidden';
            projectItemsContainer.appendChild(invisibleCard);
        }

        // become visible staggered animation
        document.querySelectorAll('.project-item').forEach((item, idx) => {
            setTimeout(() => {
                item.classList.add('visible');
            }, 10+idx*100);
        });
    }, 50);
}

//
function create_project_card(project) {
    const item = projectItemTemplate.content.cloneNode(true);
    item.querySelector('.project-title').innerText = project.title;
    item.querySelector('.project-year').innerText = project.year.split('.')[0];
    item.querySelector('.project-description').innerText = project.description;
    item.querySelector('.project-image').src = project.image || "assets/default.png";
    const tagsHolder = item.querySelector('.project-tags');
    for (let tag of project.tags) {
        const tagEl = create_tag_element(tag, () => {
            // console.log(tag);
            add_selected_tag(tag);
        }, 'filter by tag: ');
        tagsHolder.appendChild(tagEl);
    }
    item.querySelectorAll('.page-link').forEach( a => a.href = project.html );
    item.querySelector('.link-type').innerText = project.link_type;
    return item;
}


// create tag element
function create_tag_element(tag_name, onclick_func, title_prefix='tag: ') {
    const tagEl = document.createElement('button');
    tagEl.className = 'tag';
    tagEl.innerText = tag_name;
    tagEl.style.background = tags[tag_name].color;
    tagEl.onclick = (e) => {
        e.preventDefault();
        onclick_func();
    }
    tagEl.title = title_prefix + tag_name;
    return tagEl;
}

// adds tag element to selected tags element if doesnt exist
function add_selected_tag(tag_name) {
    if (!selectedTags.includes(tag_name)) {
        selectedTags.push(tag_name);
        render_selected_tags(selectedTags);
    }
}

function remove_selected_tag(tag_name) {
    selectedTags.splice(selectedTags.indexOf(tag_name), 1);
    render_selected_tags(selectedTags);
}

function render_selected_tags(tags) {
    const selectedTagsElement = document.querySelector('.selected-tags');
    selectedTagsElement.innerHTML = '';
    tags.forEach(tag_name => {
        const tagEl = create_tag_element(tag_name, () => {
            remove_selected_tag(tag_name);
        },
        'remove tag: ')
        selectedTagsElement.appendChild(tagEl);
    });
    updateProjectCards();
}

// project sorting and filtering
function filterProjects(project_items, filter_tags) {
    if (filter_tags.length > 0) {
        for (let tag_name of filter_tags) {
            project_items = project_items.filter((project) => 
                project.tags.includes(tag_name)
            );
        }
    }
    return project_items;
}

function sortObjectByStringParam(project_items, param, descending) {
    if (param === null) {
        return project_items;
    }
    if (descending) {
        return project_items.slice().sort( (b,a) => {
            let a_str = a[param].toLowerCase();
            let b_str = b[param].toLowerCase();
            if (a_str < b_str) return -1;
            if (a_str > b_str) return 1;
            return 0;
        });
    } else {
        return project_items.slice().sort( (a,b) => {
            let a_str = a[param].toLowerCase();
            let b_str = b[param].toLowerCase();
            if (a_str < b_str) return -1;
            if (a_str > b_str) return 1;
            return 0;
        });
    }
}



/* EVENT LISTENERS */

// TODO: fix array not sorted when adding or removing tags!!

document.querySelector('.sort-panel .default').addEventListener('click', event => {
    document.querySelectorAll('.sort-panel button').forEach(button => button.classList.remove('selected'));
    event.target.classList.add('selected');
    sortByParam = null;
    updateProjectCards();
});

document.querySelector('.sort-panel .oldest').addEventListener('click', event => {
    document.querySelectorAll('.sort-panel button').forEach(button => button.classList.remove('selected'));
    event.target.classList.add('selected');
    sortByParam = 'year';
    sortByDescending = false;
    updateProjectCards();
});

document.querySelector('.sort-panel .latest').addEventListener('click', event => {
    document.querySelectorAll('.sort-panel button').forEach(button => button.classList.remove('selected'));
    event.target.classList.add('selected');
    sortByParam = 'year';
    sortByDescending = true;
    updateProjectCards();
});

document.querySelector('.sort-panel .alphabetic').addEventListener('click', event => {
    document.querySelectorAll('.sort-panel button').forEach(button => button.classList.remove('selected'));
    event.target.classList.add('selected');
    sortByParam = 'title';
    sortByDescending = false;
    updateProjectCards();
});


/* ADD PROJECTS TO PAGE */

// assign each tag a unique color
const tags = {};
projects.forEach(p => {
    for (let tag of p.tags) {
        if (!(tag in tags)) {
            // const randomIndex = Math.floor(Math.random() * tag_colors.length);
            const randomColor = tag_colors.splice(0, 1)[0];
            tags[tag] = { color: randomColor }
            console.log(tag, tags[tag].color);
        }
    }
})


// add projects to page
const projectItemsContainer = document.getElementById('project-items-container');
const projectItemTemplate = document.getElementById('project-item-template');

setTimeout(() => {
    updateProjectCards(projects);
}, 250);
