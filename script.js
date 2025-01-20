
/* const urlParams = new URLSearchParams(window.location.search);
const filterTag = urlParams.get('tag');
if (filterTag) {
    console.log(filterTag);
} */


/* PROJECTS */

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

function generateNiceColor() {
    const hue = Math.floor(Math.random() * 360); // Full spectrum
    const saturation = Math.floor(Math.random() * 30) + 70; // 70-100% for vibrant colors
    const lightness = Math.floor(Math.random() * 20) + 40; // 40-60% for balanced brightness

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

const colors = [
    '#dd1eea', // pink
    '#24ec10', // green
    '#14c3f6', // light blue
    '#f69614', // orange
    '#9314f6', // purple
    '#f61452', // rose
    '#149fdc', //
    
    // '#FF6F61',  /* Coral Red */
    // '#6B5B95',  /* Deep Purple */
    // '#88B04B',  /* Olive Green */
    // '#955251',  /* Taupe */
    // '#B565A7',  /* Orchid Purple */
    // '#009B77',  /* Teal Green */
    // '#DD4124',  /* Fiery Red */
    // '#45B8AC',  /* Aqua Green */
    // '#EFC050',  /* Sunflower Yellow */
    // '#5B5EA6',  /* Indigo Blue */
    // '#9B2335',  /* Crimson */
    // '#55B4B0',  /* Turquoise */
    // '#E15D44',  /* Burnt Orange */
]

const tags = {};
projects.forEach(p => {
    for (let tag of p.tags) {
        if (!(tag in tags)) {
            console.log(tag);
            const randomIndex = Math.floor(Math.random() * colors.length);
            const randomColor = colors.splice(0, 1)[0];
            tags[tag] = { color: randomColor }
        }
    }
})

// add placeholder assets
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

/* FUNCTIONS */

function addProjectsToPage(projectDatums) {
    for (let i of [1,2,3]) {

        for (let project of projectDatums) {
            const item = projectItemTemplate.content.cloneNode(true);
            item.querySelector('.project-title').innerText = project.title;
            item.querySelector('.project-year').innerText = project.year;
            item.querySelector('.project-description').innerText = project.description;
            item.querySelector('.project-image').src = project.image || "assets/default.png";
            const tagsHolder = item.querySelector('.project-tags');
            for (let tag of project.tags) {
                const tagEl = document.createElement('button');
                tagEl.onclick = (e) => {
                    e.preventDefault();
                    console.log('clicked tag:', tag);
                }
                tagEl.className = 'tag';
                tagEl.innerText = tag;
                tagEl.style.background = tags[tag].color;
                /* tagEl.href = "index.html?" + (new URLSearchParams({'tag' : tag})).toString(); */
                tagsHolder.appendChild(tagEl);
            }
            item.querySelectorAll('.page-link').forEach( a => a.href = project.html );
            projectItemsContainer.appendChild(item);
        }
    }

    document.querySelectorAll('.project-item').forEach((item,i) => {
        setTimeout(() => {
            item.classList.add('visible');
        }, i*100);
    });
}


/* ADD PROJECTS TO PAGE */

const projectItemsContainer = document.getElementById('project-items-container');
const projectItemTemplate = document.getElementById('project-item-template');

addProjectsToPage(projects);


/* EVENT LISTENERS */

document.querySelector('.sort-panel .default').addEventListener('click', event => {
    document.querySelectorAll('.sort-panel button').forEach(button => button.classList.remove('selected'));
    event.target.classList.add('selected');
    projectItemsContainer.innerHTML = '';
    addProjectsToPage(projects);
});

document.querySelector('.sort-panel .oldest').addEventListener('click', event => {
    document.querySelectorAll('.sort-panel button').forEach(button => button.classList.remove('selected'));
    event.target.classList.add('selected');
    projectItemsContainer.innerHTML = '';
    const sorted = projects.slice().sort( (a,b) => a.year - b.year );
    console.log(sorted);
    addProjectsToPage(sorted);
});

document.querySelector('.sort-panel .latest').addEventListener('click', event => {
    document.querySelectorAll('.sort-panel button').forEach(button => button.classList.remove('selected'));
    event.target.classList.add('selected');
    projectItemsContainer.innerHTML = '';
    const sorted = projects.slice().sort( (a,b) => b.year - a.year );
    console.log(sorted);
    addProjectsToPage(sorted);
});

document.querySelector('.sort-panel .alphabetic').addEventListener('click', event => {
    document.querySelectorAll('.sort-panel button').forEach(button => button.classList.remove('selected'));
    event.target.classList.add('selected');
    projectItemsContainer.innerHTML = '';
    const sorted = projects.slice().sort( (a,b) => a.title - b.title );
    console.log(sorted);
    addProjectsToPage(sorted);
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

