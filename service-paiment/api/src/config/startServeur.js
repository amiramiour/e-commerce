const port= 3010;

const startServeur = async(app) => {
    try {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.log(error)
    }
}

module.exports =  startServeur;