exports.getProfile = async (req, res) => {
    
    try {
        res.status(200).json(req.body)
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    };
}