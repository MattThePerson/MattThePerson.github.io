

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
        title: 'Swing!',
        year: '2019',
        description: 'A little JavaScript game I wrote.',
        tags: ['JavaScript', 'p5.js'],
        image: '',
        html: 'https://matttheperson.github.io/Swing'
    },
    {
        title: 'LED Dot Matrix Displays (in CSS!)',
        year: '2024',
        description: 'Stuff here ...',
        tags: ['CSS', 'JavaScript', 'HTML'],
        image: '',
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
        image: '',
        html: 'projects/perlin/index.html'
    },
    {
        title: 'ML Flappy Bird',
        year: '2020',
        description: 'Training a neural network to play flappybird.',
        tags: ['ML', 'JavaScript', 'p5.js'],
        image: '',
        html: ''
    }
];

let sorted_projects = []; // sorted projects

// assign each tag a unique color
const tags = {};
projects.forEach(p => {
    for (let tag of p.tags) {
        if (!(tag in tags)) {
            console.log(tag);
            const randomIndex = Math.floor(Math.random() * tag_colors.length);
            const randomColor = tag_colors.splice(0, 1)[0];
            tags[tag] = { color: randomColor }
        }
    }
})

/* TEMP: ADD PLACEHOLDER ASSETS */
placeholder_assets = [
    'assets/placeholder_assets/a.png',
    'assets/placeholder_assets/b.jpg',
    'assets/placeholder_assets/c.webp',
    'assets/placeholder_assets/d.jpg',
    'assets/placeholder_assets/e.png',
]
let used_idx = 0;
projects.forEach(proj => {
    if (proj.image == '') {
        proj.image = placeholder_assets[used_idx%placeholder_assets.length];
        used_idx += 1;
    }
})
/* TEMP END */

/* FUNCTIONS */

// add project to page (update)
function renderProjectCards(project_items) {
    projectItemsContainer.innerHTML = '';
    
    for (let idx of [1,2,3]) { /* temp to simulate more projects! */
        for (let project of project_items) {
            const item = projectItemTemplate.content.cloneNode(true);
            item.querySelector('.project-title').innerText = project.title;
            item.querySelector('.project-year').innerText = project.year;
            item.querySelector('.project-description').innerText = project.description;
            item.querySelector('.project-image').src = project.image || "assets/default.png";
            const tagsHolder = item.querySelector('.project-tags');
            for (let tag of project.tags) {
                const tagEl = create_tag_element(tag, () => {
                    console.log(tag);
                    add_selected_tag(tag);
                });
                tagsHolder.appendChild(tagEl);
            }
            item.querySelectorAll('.page-link').forEach( a => a.href = project.html );
            projectItemsContainer.appendChild(item);
        }
    }

    document.querySelectorAll('.project-item').forEach((item, idx) => {
        setTimeout(() => {
            item.classList.add('visible');
        }, idx*100);
    });
}


// create tag element
function create_tag_element(tag_name, onclick_func) {
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
        })
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


/* ADD PROJECTS TO PAGE */

const projectItemsContainer = document.getElementById('project-items-container');
const projectItemTemplate = document.getElementById('project-item-template');

renderProjectCards(projects);


/* EVENT LISTENERS */

document.querySelector('.sort-panel .default').addEventListener('click', event => {
    document.querySelectorAll('.sort-panel button').forEach(button => button.classList.remove('selected'));
    event.target.classList.add('selected');
    renderProjectCards(sorted_projects);
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

// change root highlight color
const rootHighlightColorInput = document.getElementById('root-highlight-color-input');
const rootStyles = getComputedStyle(document.documentElement);
rootHighlightColorInput.value = rootStyles.getPropertyValue('--highlight').trim().substring(1,);

rootHighlightColorInput.addEventListener('keydown', event => {
    if (event.key == 'Enter') {
        const input = event.target.value;
        console.log(input);
        document.documentElement.style.setProperty('--highlight', '#' + input);
    }
});


// logo fly off

document.getElementById('nav-logo').addEventListener('click', e => {
    console.log("timid");
    e.target.classList.add('timid');
});

