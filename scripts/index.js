

/* DATA */

const tag_colors = [
    '#dd1eea', // pink
    '#24ec10', // green
    '#14c3f6', // light blue
    '#f69614', // orange
    '#9314f6', // purple
    '#f61452', // rose
    '#149fdc', //
]

const selectedTags = [];


const projects = [
    {
        title: 'ascii-monet',
        year: '2025',
        description: 'A CLI utility I wrote to convert images into colorful ascii art in the terminal. Written in python and published to PyPi!',
        tags: ['Python', 'PyPi'],
        image: 'assets/project_images/ascii-art.png',
        html: ''
    },
    {
        title: 'Swing!',
        year: '2019',
        description: "A JavaScript game I made for a Game Jam! Created with the JavaScript library p5.js, it contains over 15,000 lines of code, 4 distinct levels and a paractice arena!",
        tags: ['JavaScript', 'p5.js'],
        image: 'assets/project_images/swing.png',
        html: 'https://matttheperson.github.io/Swing'
    },
    {
        title: 'LED Dot Matrix Displays (in CSS!)',
        year: '2024.06',
        description: '',
        tags: ['CSS', 'JavaScript', 'HTML'],
        image: 'assets/project_images/dot-matrix.png',
        html: 'projects/LEDMatrixDisplay/index.html'
    },
    {
        title: 'Arduino project',
        year: '2022',
        description: "An arduino prototype of a car that can control it's own speed.",
        tags: ['Arduino', 'CAD', '3D Printing'],
        image: '',
        html: ''
    },
    {
        title: 'Perlin Noise Landscape',
        year: '2023',
        description: 'Fun little p5.js sketch to visualize perlin noise',
        tags: ['JavaScript', 'p5.js'],
        image: 'assets/project_images/perlin-noise.png',
        html: 'projects/perlin/index.html'
    },
    {
        title: 'ML Flappy Bird',
        year: '2020',
        description: 'Training an Artificial Neural Network to play FlappyBird! The "birds" are trained by letting 100 birds try the game and then randomly mutating the most elite bird. The NN was coded entirely in JavaScript using a Matrix class.',
        tags: ['ML', 'JavaScript', 'p5.js'],
        image: 'assets/project_images/flappy-bird.png',
        html: 'projects/FlappyBird/index.html'
    },
];

let sorted_projects = []; // sorted projects



/* FUNCTIONS */

// add project to page (update)
function renderProjectCards(project_items) {
    projectItemsContainer.innerHTML = '';
    
    setTimeout(() => {
        for (let idx of [1]) { /* temp to simulate more projects! */
            for (let project of project_items) {
                const item = projectItemTemplate.content.cloneNode(true);
                item.querySelector('.project-title').innerText = project.title;
                item.querySelector('.project-year').innerText = project.year.split('.')[0];
                item.querySelector('.project-description').innerText = project.description;
                item.querySelector('.project-image').src = project.image || "assets/default.png";
                const tagsHolder = item.querySelector('.project-tags');
                for (let tag of project.tags) {
                    const tagEl = create_tag_element(tag, () => {
                        console.log(tag);
                        add_selected_tag(tag);
                    }, 'filter by tag: ');
                    tagsHolder.appendChild(tagEl);
                }
                item.querySelectorAll('.page-link').forEach( a => a.href = project.html );
                projectItemsContainer.appendChild(item);
            }
        }

        // become visible staggered animation
        document.querySelectorAll('.project-item').forEach((item, idx) => {
            setTimeout(() => {
                item.classList.add('visible');
            }, 10+idx*100);
        });
    }, 50);
}


// create tag element
function create_tag_element(tag_name, onclick_func, title_prefix='tag: ') {
    const tagEl = document.createElement('button');
    tagEl.onclick = (e) => {
        e.preventDefault();
        console.log('clicked tag:', tag);
    }
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
    renderProjectCards(filterProjects(projects, selectedTags));
}

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



/* EVENT LISTENERS */

// TODO: fix array not sorted when adding or removing tags!!

document.querySelector('.sort-panel .default').addEventListener('click', event => {
    document.querySelectorAll('.sort-panel button').forEach(button => button.classList.remove('selected'));
    event.target.classList.add('selected');
    renderProjectCards(filterProjects(projects, selectedTags));
});

document.querySelector('.sort-panel .oldest').addEventListener('click', event => {
    document.querySelectorAll('.sort-panel button').forEach(button => button.classList.remove('selected'));
    event.target.classList.add('selected');
    sorted_projects = projects.slice().sort( (a,b) => a.year - b.year );
    // console.log(sorted_projects);
    renderProjectCards(filterProjects(sorted_projects, selectedTags));
});

document.querySelector('.sort-panel .latest').addEventListener('click', event => {
    document.querySelectorAll('.sort-panel button').forEach(button => button.classList.remove('selected'));
    event.target.classList.add('selected');
    sorted_projects = projects.slice().sort( (a,b) => b.year - a.year );
    // console.log(sorted_projects);
    renderProjectCards(filterProjects(sorted_projects, selectedTags));
});

document.querySelector('.sort-panel .alphabetic').addEventListener('click', event => {
    document.querySelectorAll('.sort-panel button').forEach(button => button.classList.remove('selected'));
    event.target.classList.add('selected');
    sorted_projects = projects.slice().sort( (a,b) => a.title - b.title );
    // console.log(sorted_projects);
    renderProjectCards(filterProjects(sorted_projects, selectedTags));
});


/* ADD PROJECTS TO PAGE */

// assign each tag a unique color
const tags = {};
projects.forEach(p => {
    for (let tag of p.tags) {
        if (!(tag in tags)) {
            const randomIndex = Math.floor(Math.random() * tag_colors.length);
            const randomColor = tag_colors.splice(0, 1)[0];
            tags[tag] = { color: randomColor }
        }
    }
})


// add projects to page
const projectItemsContainer = document.getElementById('project-items-container');
const projectItemTemplate = document.getElementById('project-item-template');

renderProjectCards(projects);
