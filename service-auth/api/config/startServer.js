const port= 3001;

const startServer = async(app) => {
    try {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.log(error)
    }
}

module.exports =  startServer;