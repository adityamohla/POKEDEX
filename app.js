const container = document.querySelector('#container');
const baseUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
const searchBar = document.querySelector('#search-bar');
const notFoundMessage = document.createElement('div');

notFoundMessage.id = 'not-found';
notFoundMessage.innerText = 'Pokémon not found!';
document.body.insertBefore(notFoundMessage, container);

const typeColors = {
    fire: '#ff7f50',
    water: '#6dd5ed',
    grass: '#8fbc8f',
    normal: '#d3d3d3',
    electric: '#ffd700',
    poison: '#9370db',
    psychic: '#ff69b4',
    ground: '#d2b48c',
    fairy: '#ffb6c1',
    bug: '#90ee90',
    fighting: '#ff8c00',
    rock: '#a0522d',
    ghost: '#ba55d3',
    ice: '#87ceeb',
    dragon: '#da70d6',
    steel: '#808080',
    dark: '#a9a9a9'
};

async function fetchPokemon() {
    for (let i = 1; i <= 1025; i++) {
        try {
            const response = await fetch(`${apiUrl}${i}`);
            const data = await response.json();

            const pokemon = document.createElement('div');
            pokemon.classList.add('pokemon-card');
            pokemon.dataset.name = data.name;

            const inner = document.createElement('div');
            inner.classList.add('pokemon-inner');

            const front = document.createElement('div');
            front.classList.add('pokemon-front');


            let types = data.types.map(type => type.type.name);
            const primaryType = types[0];
            const backgroundColor = typeColors[primaryType] || '#bbdefb';
            front.style.backgroundColor = backgroundColor;


            const img = document.createElement('img');
            img.src = `${baseUrl}${i}.png`;
            const name = document.createElement('span');
            name.innerText = data.name.charAt(0).toUpperCase() + data.name.slice(1);
            front.appendChild(img);
            front.appendChild(name);


            const back = document.createElement('div');
            back.classList.add('pokemon-back');
            back.style.backgroundColor = backgroundColor; //Setting the background color before innerHTML

            back.innerHTML = `
                <p><strong>Type:</strong> ${types.join(', ')}</p>
                <p><strong>Weight:</strong> ${data.weight}</p>
                <p><strong>Height:</strong> ${data.height}</p>
                <p><strong>Abilities:</strong> ${data.abilities.map(ability => ability.ability.name).join(', ')}</p>
            `;

            inner.appendChild(front);
            inner.appendChild(back);
            pokemon.appendChild(inner);
            container.appendChild(pokemon);


        } catch (error) {
            console.error(`Failed to fetch data for Pokémon ${i}:`, error);
        }
    }
}

function filterPokemon(e) {
    const searchText = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.pokemon-card');
    let anyVisible = false;

    cards.forEach(card => {
        const name = card.dataset.name.toLowerCase();
        const isVisible = name.includes(searchText);
        card.style.display = isVisible ? 'block' : 'none';
        if (isVisible) {
            anyVisible = true;
        }
    });

    notFoundMessage.style.display = anyVisible ? 'none' : 'block';
}

searchBar.addEventListener('input', filterPokemon);

fetchPokemon();