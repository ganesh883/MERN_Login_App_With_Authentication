
/** auth middleware */
export default async function Auth(req, res, next){

    try {
        
        //access authorize header to validate Request
        const token = req.headers.authorization.split(" ")[1];
        res.json(token);

    } catch (error) {
        res.status(401).json({error: "Authentication Failed!"});
    }
}