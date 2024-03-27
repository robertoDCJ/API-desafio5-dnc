const livros = [
    {
        'id': 1,
        'titulo': 'A volta dos que não foram',
        'num_paginas': 563,
        'isbn': 154884,
        'editora': 'Universal'
    },

    {
        'id': 2,
        'titulo': 'As tranças do rei careca',
        'num_paginas': 156,
        'isbn': 285436,
        'editora': 'Branco'
    },

    {
        'id': 3,
        'titulo': 'Poeira em alto mar',
        'num_paginas': 16,
        'isbn': 368151,
        'editora': 'Castelo'
    },
];

const getLivros = (req, res) => {
    res.status(200).send(livros);
};

const getLivro = (req, res) => {
    let id = req.params.id;
    const livro = livros.find((livro) => livro.id === Number(id));

    if (livro) {
        res.status(200).send(livro);
    } else {
        res.status(404).send(`Livro não com id: ${id} existe`);
    };
};

const createLivro = (req, res) => {
    const livro = req.body;
    const id = livro.id;
    const livroDuplicado = livros.find(livro => livro.id == id);

    if (livroDuplicado === undefined) {
        livros.push(livro);
        res.status(201).send(`O livro "${livro.titulo}" foi criado com sucesso`);
    } else {
        res.status(406).send(`Já existe livro com o id: ${id}`);
    };

};

const updateLivro = (req, res) => {
    let id = req.params.id;
    let indice = findLivroIndex(id);

    if (indice >= 0 && Object.keys(req.body).length > 0) {
        livros[indice] = req.body;
        res.status(201).send('Livro atualizado com sucesso');
    } else {
        res.status(406).send("Dados invalidos");
    }
};

const findLivroIndex = (id) => {
    const indice = livros.findIndex(livro => livro.id == id);
    return indice;
};

const removeLivro = (req, res) => {
    let id = req.params.id;
    let indice = findLivroIndex(id);
    const backUpLivros = [...livros];
    
    if (indice >= 0) {
        livros.splice(indice, 1);
        res.status(200).send(`O livro "${backUpLivros[indice].titulo}" foi removido com sucesso!`);
    } else {
        res.status(406).send('Não foi encontrado nenhum livro com esse id');
    };
};

module.exports = { getLivros, getLivro, createLivro, updateLivro, removeLivro };