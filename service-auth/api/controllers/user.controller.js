import AuthService from '../services/auth.service';

/****************** REGISTER A USER ******************/
/* 
    This function allow a user to create an account

    Checking :
        - Check if the email isn't already in db
        - The user can choice if he create a company account or student account

*/

exports.userRegister = async (req, res) => {
    try {
        await AuthService.Register(req);
        res.status(201).json({message: 'Votre compte a bien été créé.'});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Une erreur est survenue lors de la création de votre compte.', err });
    }
}


/****************** CONNECT A USER ******************/
/* 
    This function allow a user to connect him to his account

    Checking :
        - Check if the email and password is in db

*/
exports.userLogin = async (req, res) => {
    try {
        const token = AuthService.Login(req);
        res.status(201).json({ message: 'Connecté.', token });
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors du traitement des données.', err });
    }
}