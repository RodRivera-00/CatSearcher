export function FetchBreeds(dispatchUserEvent){
    fetch('https://api.thecatapi.com/v1/breeds', {
            method: 'GET',
            headers: {'x-api-key': '02ceefbf-c916-4863-80cb-447aa001cd82'}
        })
        .then(res => res.json())
        .then(res => res.map(item =>  {return {name: item.name, id: item.id}}))
        .then(res => dispatchUserEvent("SET_BREED", res)).catch(e =>{
            console.log(e)
            alert('Apologies but we could not load new cats for you at this time! Miau!')
        })
}
export function FetchImages(dispatchUserEvent, breedid, page, catLength){
    fetch(`https://api.thecatapi.com/v1/images/search?limit=8&breed_id=${breedid}&page=${page}&order=DESC`, {
        method: 'GET',
        headers: {'x-api-key': '02ceefbf-c916-4863-80cb-447aa001cd82'},
    })
    .then(res => {
        res.json().then(result => {
            dispatchUserEvent('ADD_CATS', result)
            if(parseInt(res.headers.get('pagination-count')) <= catLength + result.length){
                dispatchUserEvent('SET_LOADMORE', false)
            }else{
                dispatchUserEvent('SET_LOADMORE', true)
            }
        })
    })
    .catch(e =>{
        console.log(e)
        alert('Apologies but we could not load new cats for you at this time! Miau!')
    })
}