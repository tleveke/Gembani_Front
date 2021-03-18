## Authentification Project:
#### Mohammed laanadi -- Tom Leveque
Définission des Routes du front-end:
- session/new : Envoi d'un formulaire avec des inputs Username & Password au Back-end au moment où l'on appuie sur Submit. Si la réponse du Back-end est False (cas ou le token n'est pas vérrifié), on affiche une alerte sinon on redirige l'utilisateur vers la page client ou employee selon son userType.
- session/register : On crée une page register pour ajouter un utilisateur et pouvoir s'authentifier avec.

Définission des requêtes:
#### Phase Register:
- Une requête Post(session/register) qui poste les inputs de l'utilisateur souhaitant créer un compte, ceux-ci sont enregistrés dans la Bdd par le Back et en même temps un Token est créé et envoyé au Front-End par le biais de l'HTTP Header.

#### Phase Login:
- Le front enregistre ce Token et l'utilise pour s'authentifier et accèder aux pages souhaitées (et avoir des réponses aux différentes requêtes) en l'envoyant au Back-End qui le vérifie et donne ou pas l'accès à la page. 
- Il faut bien entendu mettre en place un timer qui après un certain temps le token n'est plus accepté et la page envoie une erreur "session expirée" ce qui oblige l'utilisateur à se reconnecter.