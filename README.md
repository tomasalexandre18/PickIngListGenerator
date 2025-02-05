
# Picking List Generator

Picking List Generator est un outil en ligne disponible à l’adresse suivante : [Picking List Generator]()

Il permet de transformer une [Picking List](https://addons.prestashop.com/en/preparation-shipping/45655-picking-list-list-of-product-to-be-shipped.html) en un fichier PDF, avec les catégories de produits séparées selon vos préférences.

Ce projet personnel vise à faciliter la tâche des préparateurs de commandes en leur permettant de gagner du temps lors de la préparation des commandes. Il a été développé principalement pour le site [Frais Livré](https://www.frais-livre.fr/).

## 📌 Utilisation

La gestion de la configuration n’est pas encore disponible via l’interface, mais vous pouvez modifier les paramètres en procédant comme suit :

Créer un fichier JSON contenant les catégories souhaitées.
* Chaque catégorie doit être un tableau de chaînes de caractères.
* Vous pouvez ajouter autant de catégories que nécessaire.
* Ensuite, importez ce fichier JSON dans les paramètres de l’application.
* Exemple de fichier JSON :
```json
{
    "Categories": [
        "Catégorie Picking List 1",
        "Catégorie Picking List 2",
        "Catégorie Picking List 3"
    ],
    "Autres catégories": [
        "Catégorie Picking List 4",
        "Catégorie Picking List 5",
        "Catégorie Picking List 6"
    ]
}
```
Charger votre fichier Picking List, puis cliquez sur le bouton de génération pour obtenir un fichier PDF avec les catégories bien séparées.

## 🛠 Développement

Le site est développé en JavaScript avec le framework [React](https://reactjs.org/).