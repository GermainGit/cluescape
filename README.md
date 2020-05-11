# CLUESCAPE

## Installation 

Actuellement, l’application n’est pas référencée sur l’app store. Pour
l’installer il est nécessaire d’avoir un environnement de
développement.
En premier lieu, il est nécessaire d’initialiser l’environnement à reactnative, pour cela il faut se référer à la documentation officielle de React
Native (https://reactnative.dev/docs/environment-setup)

Dans notre cas nous n’utilisons pas le CLI expo. Ignite CLI se base sur
le CLI React Native. Il faut donc sélectionner l’onglet adéquat, à savoir
React Native CLI.
Une fois l’environnement en place, rendez-vous sur le Github du
projet (https://github.com/GermainGit/cluescape), puis récupérez le
projet sur votre ordinateur.

Ensuite, ouvrez le projet avec un shell et installer les dépendances du
projet avec la commande `yarn install`.

Finalement, branchez votre appareil à votre ordinateur et lancer dans
le même shell la commande `npx react-native run-android` ou `npx reactnative run-ios`.

Vous pouvez également lancer l’application sur un émulateur. Pour
cela il vous faudra au préalable installer un émulateur supérieur à
Android 9 (API >= 28). Ensuite avant de lancer l’application, il faut
mettre en route l’émulateur afin que celui-ci soit détectable. 
