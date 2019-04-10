const get = (req, res, next) => {
    try{
        throw error
        
        return res.json({message: 'users get'});
    } catch(e) {
        next(e)
    }
}

export {
    get
}