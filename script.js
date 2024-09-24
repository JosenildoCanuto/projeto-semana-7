async function getPost(){
    try {
        let url = 'https://jsonplaceholder.typicode.com/posts';
        let response = await fetch(url);
        let posts = await response.json();

        let postsSection = document.querySelector('.posts');

        for(let post of posts){
            let h2 = document.createElement('h2');
            h2.innerHTML = post.title;

            let p = document.createElement('p');
            p.innerHTML = post.body;

            let like = document.createElement('button');
            like.innerHTML = 'Like';
            like.addEventListener('click', () =>{
                addLike(post.id);
                let likeCount = getLikeFromId(post.id);
                small.innerHTML = likeCount + ' Likes'
            })

            let small = document.createElement('small');
            let likeCount = getLikeFromId(post.id)
            small.innerHTML = likeCount + ' Likes'
            
            let article = document.createElement('article');
            article.appendChild(h2)
            article.appendChild(p)
            article.appendChild(like)
            article.appendChild(small)

            postsSection.appendChild(article)
        }
    }
    catch(error) {
        alert('Deu erro!')
    }
}

function getLikeFromId(id) {
    let like = localStorage.getItem('likes'); // Busca o item 'likes' no localStorage
    if (!like) return 0; // Se não houver item 'likes', retorna 0 (nenhuma curtida)
    
    let likePost = JSON.parse(like); // Converte o valor obtido de string JSON para um array de objetos
    let postLike = likePost.find(item => item.id === id); // Busca o objeto que tem o id igual ao fornecido
    if (!postLike) return 0; // Se o id não for encontrado, retorna 0 (nenhuma curtida para o post)

    return postLike.count
}

function addLike(id){
    let likesString = localStorage.getItem('likes'); // Busca o item 'likes' no localStorage
    if (!likesString) {
        likesString = '[]';
    }
    
    let likes = JSON.parse(likesString);
    let index = likes.findIndex(item => item.id === id);

    if (index > -1) {
        likes[index].count++;
    } else {
        likes.push({id: id, count: 1});
    }

    localStorage.setItem('likes', JSON.stringify(likes))
}

getPost()