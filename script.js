const searchBtn = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchValue = searchInput.value;

    // 1. Prepare query
    const query = searchValue.trim().toLowerCase();

    // 2. Validate query
    if(query === "") {
        alert("Please enter a Pokémon name or ID.");
        return;
    }
    // 3. Fetch Pokémon data
    fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${query}`)
        .then(res => {
            if(!res.ok) {
                throw new Error("Pokémon not found");
            }
            return res.json();
        })
        .then(data=> {
            console.log(data)
            // 4. Display Pokémon data
            document.getElementById("pokemon-name").textContent = data.name.toUpperCase();
            document.getElementById("pokemon-id").textContent = `#${data.id}`;
            document.getElementById("weight").textContent = `Weight: ${data.weight}`;
            document.getElementById("height").textContent = `Height: ${data.height}`;

            // 5. Display types
            const typesElement = document.getElementById("types");
            typesElement.innerHTML = ''; // Clear previous types
            data.types.forEach(typeInfo => {
                const typeElement = document.createElement("div");
                typeElement.textContent = typeInfo.type.name.toUpperCase();
                typesElement.appendChild(typeElement);
            });

            // 6. Display stats
            document.getElementById("hp").textContent = `${data.stats[0].base_stat}`;
            document.getElementById("attack").textContent = `${data.stats[1].base_stat}`;
            document.getElementById("defense").textContent = `${data.stats[2].base_stat}`;
            document.getElementById("special-attack").textContent = `${data.stats[3].base_stat}`;
            document.getElementById("special-defense").textContent = `${data.stats[4].base_stat}`;
            document.getElementById("speed").textContent = `${data.stats[5].base_stat}`;

            // 7. Display sprite
            let spriteElement = document.getElementById("sprite");
            if (!spriteElement) {
                spriteElement = document.createElement("img");
                spriteElement.id = "sprite";
                document.getElementById("sprite-container").appendChild(spriteElement);
            }
            spriteElement.src = data.sprites.front_default;
        })
        .catch(error => {
            alert(error.message);
        });
})