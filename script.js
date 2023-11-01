const btSearch = document.querySelector("#bt-Search")
const btList = document.querySelector("#bt-List")
const btAdd = document.querySelector("#bt-Add")
const btUpdate = document.querySelector("#bt-Update")
const btDel = document.querySelector("#bt-Del")
const botoes = document.querySelectorAll(".elemento")
const buscaId = document.querySelector("#buscaId");
const atualizaAnimal = document.querySelector("#btnAtualizar");
const forms = document.querySelectorAll("form");
const buscaAPI = document.querySelector("#searchID");
const btnAdd = document.querySelector("#btnAdd")
const deleteAnimal = document.querySelector("#btnDelete");

const buscar = document.querySelector('.busca')
const listar = document.querySelector('.lista')
const adicionar = document.querySelector('.adiciona')
const atualizar = document.querySelector('.atualiza')
const deletar = document.querySelector('.deleta')

btList.addEventListener('click', ()=>{
    fetch("http://cafepradev.com.br:21020/animals/list")
    .then(ret => ret.json())
    .then((data) => {
        console.log(data);
        let estrutura = '';
        for(pos in data){
            estrutura += `
                        <tr>
                            <th>${data[pos].id}</th>
                            <th>${data[pos].name}</th>
                            <th>${data[pos].species}</th>
                            <th>${data[pos].color}</th>
                            <th>${data[pos].size}</th>
                        </tr>
                        `
                    }
                document.querySelector("#tableList").innerHTML = estrutura;
    })
})

forms.forEach(function(form) {
    form.addEventListener("submit", function(event) {
        event.preventDefault();
    });
});

// pesquisa
buscaAPI.addEventListener('click', function(){
    let inputValue = document.querySelector("#idSearch").value
    fetch(`http://cafepradev.com.br:21020/animals/search/${inputValue}`)
    .then(ret => ret.json())
    .then((data) => {
        let structure = `<tr>
                            <th>${data.name}</th>
                            <th>${data.species}</th>
                            <th>${data.color}</th>
                            <th>${data.size}</th>
                        </tr>`
        document.querySelector("#tablebody").innerHTML = structure;
    })
})

// adiciona
btnAdd.addEventListener('click', () => {
    let animalAdd = {
        name: document.querySelector("#nomeAdd").value,
        species: document.querySelector("#especieAdd").value,
        color: document.querySelector("#corAdd").value,
        size: document.querySelector("#tamanhoAdd").value
    }
    fetch("http://cafepradev.com.br:21020/animals/insert", {
        method: "POST",
        headers : {
            "Content-type" : "application/json; charset=UTF-8"
        },
        body : JSON.stringify({
            "name": animalAdd.name,
            "species": animalAdd.species,
            "color": animalAdd.color,
            "size": animalAdd.size
        }) 
    })
    .then(ret => {
        alert("Animal Adicionado!")
        if(!ret){
            throw new Error("Erro ao enviar requisição.")
        }
        return ret.json()
    })
    .catch(error => {
        alert(error)
    })
})

// deleta
deleteAnimal.addEventListener("click", function(){
    let valueInput = document.querySelector("#idSearchDelete").value
    fetch(" http://cafepradev.com.br:21020/animals/delete", {
        method: "DELETE",
        headers : {
            "Content-type" : "application/json; charset=UTF-8"
        },
        body : JSON.stringify({
            "id": valueInput,
        }) 
    })
    .then(ret => {
        if(!ret){
            throw new Error("Erro ao enviar requisição")
        }
        alert("Animal Deletado!")
        return ret.json()
    })
    .catch(error => {
        alert(error)
    })
    })

// busca id para atualização
let animal = {
    name: document.querySelector("#atualizaNome"),
    species: document.querySelector("#atualizaEspecie"),
    color:  document.querySelector("#atualizaCor"),
    size:  document.querySelector("#atualizaTamanho")
}

//atualiza lista de atualização por id
buscaId.addEventListener("blur", function(){
    let id = buscaId.value;
    fetch(`http://cafepradev.com.br:21020/animals/search/${id}`)
    .then(ret => ret.json())
    .then(data => {
        animal.name.value = data.name;
        animal.species.value = data.species;
        animal.color.value = data.color;
        animal.size.value = data.size;
    })
})



//atualiza id
atualizaAnimal.addEventListener('click', function(){
    fetch("http://cafepradev.com.br:21020/animals/update", {
        method: "PUT",
        headers : {
            "Content-type" : "application/json; charset=UTF-8"
        },
        body : JSON.stringify({
            "id": buscaId.value,
            "name": animal.name.value,
            "species": animal.species.value,
            "color": animal.color.value,
            "size": animal.size.value
        }) 
    })
    .then(ret => {
        alert("Animal Atualizado!")
        if(!ret){
            throw new Error("Erro na requisição! Verifique os dados informados")
        }
        return ret.json()
    })
    .catch(error => {
        alert(error)
    })
})