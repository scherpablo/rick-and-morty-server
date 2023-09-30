let myFavorites = []

const postFav = (req, res) => {
    myFavorites.push(req.body)
    res.json(myFavorites)
}

const deleteFav = (req, res) => {
    const { id } = req.params

    myFavorites = myFavorites.filter(fav => fav.id !== id)
    return res.json(myFavorites)
}

module.exports = { postFav, deleteFav }


// const deleteFav = (req, res) => {
//     const { id } = req.params

//     const favFiltered = myFavorites.filter(fav => {
//         return fav.id !== id
//     })
//     myFavorites = favFiltered
//     return res.json(myFavorites)
// }