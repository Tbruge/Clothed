code latex du programmer's guide
\documentclass[12pt]{article}
\usepackage[a4paper, margin=1in, top=1.25in, headheight=50pt, headsep=0.25in]{geometry}
\usepackage{graphicx}
\usepackage{fancyhdr}
\usepackage{hyperref}
\usepackage{listings}
\usepackage{xcolor}
\usepackage{float}
\usepackage{amsmath}
\usepackage[T1]{fontenc}
\usepackage[utf8]{inputenc}
\usepackage{pdfpages}


\pagestyle{fancy}
\fancyhf{}
\setlength{\headheight}{50pt}
\setlength{\headsep}{25pt}
\renewcommand{\headrulewidth}{2pt}

\fancyhead[L]{\includegraphics[width=1cm]{logo.png}}
\fancyhead[R]{LE « PROGRAMMER’S GUIDE » \\INFOB318\\UNamur}
\fancyfoot[C]{\thepage}

\renewcommand{\headrule}{\hbox to\headwidth{\color{black}\leaders\hrule height \headrulewidth\hfill}}

% Cover page setup
\title{
    \vspace{-1in}
    \begin{center}
        \includegraphics[width=4cm]{logo.png}
    \end{center}
    {\large INFOB318: Projet Individuelle }\\
    \bigskip
    \line(1,0){338} \\
    \bigskip
    {\huge \textbf{Documentation du programmeur du projet Clothed }} \\
    \bigskip
    \line(1,0){338} \\
    \bigskip
    VERSION 0.0.1 \\
     \line(1,0){338} \\
    Author: \text{Tchatchoua Bruge}
    
}

\begin{document}
\maketitle
\date{}
\thispagestyle{empty}

\newpage
\setcounter{page}{1}
\tableofcontents
\newpage


\section { Guide de Reprise du projet clothed } \par

\subsection{Introduction}
\subsubsection*{Objectif du projet}
\textbf{ Clothed } est une application web conçue pour permettre le partage de vêtements et autres articles entre particuliers. L'objectif est de fournir une plateforme facile à utiliser pour aider les personnes à obtenir les biens dont elles ont besoin facilement pour éviter le gaspillage de ressources. l'application a particulièrement été pensée pour mieux s'adapter aux personnes âgées.\\ 

Pour être en mesure de poursuivre le projet, voici une description des ressources utilisés.  

\subsection{ Sources du Logiciel } \par

\subsubsection*{Développeurs} \par
Le projet a été développé par [Tchatchoua Bruge]. Pour plus de détails sur les contributions, veuillez consulter le système de gestion de versions du répertoire sur GitHub

\subsubsection*{ Cahier des Charges } \par
Le cahier des charges est accessible dans la section documentation du projet sur github, fournissant un aperçu des exigences et des objectifs initiaux du projet.

\subsection{  Environnement de Développement } \par

\subsubsection*{Technologies Utilisées}

\begin{itemize}
    \item \textbf{ Langages utilisés: } [node.js, express.js,Vue.js, Mysql]
    \item \textbf{Éditeurs et outils : } Développé en utilisant [Éditeur/IDE : Visual Studio Code] 
\end{itemize}

\subsubsection*{Configuration Requise}

\begin{itemize}
    \item Système d'exploitation : Linux Ubuntu / Windows / mac 
    \item Node.js installé avec npm (Node Package Manager)
    \item MySQL installé et configuré 
    \item Xampp doit être installé et configurer pour établir la connexion avec phpMyAdmin(base de données en ligne) 
    \item IDE recommandé : Visual Studio Code (car elle est celle qui a permis la connexion) 

\end{itemize}

\subsection{   Installation et Configuration } \par

\subsubsection*{ Téléchargement du Code Source }

Le code source est accessible sur GitHub via le lien : \url{https://github.com/UNamurCSFaculty/2324_INFOB318_Clothed1.git}.

\subsubsection{Instruction d'installation}
\begin{itemize}
    \item Cloner le dépôt Git : git clone 
    \item Accéder au dossier du projet : \textbf{ cd clothed-projet1} 
    \item Installer les dépendances du projet : npm install.
\end{itemize}

\subsection{ Architecture du Logiciel }

Clothed1 est structuré en deux principales parties
\begin{itemize}
    \item \textbf{Front-end: } interface utilisateur développée avec Vue.js
    \item \textbf{Back-end: } Serveur Node.js qui gère la logique métier et l'interaction avec la base de données MySQL.
\end{itemize}

\subsubsection*{Diagramme d'Architecture}
\includepdf[pages=-]{architecture.pdf}


\subsection{ Développement }

\subsubsection*{Déploiement Local}
pour déployer l'application localement :

\begin{itemize}
    \item Exécuter npm start dans le dossier du serveur back-end.
    \item Exécuter npm run serve dans le dossier front-end.
\end{itemize}

\subsection{ Contribution au Projet }

\subsubsection*{ Procédure de Contribution }
Pour contribuer au projet Clothed1 :

\begin{itemize}
    \item Forker le dépôt sur GitHub.
    \item Créer une nouvelle branche pour vos modifications
    \item Soumettre un pull request avec une description détaillée des changements.
\end{itemize}

\section{Explication et documentation des composants  }

\subsection{ Back-end(Node js) }

\subsubsection{ Architecture Détaillée et Motivations }

les composants contenus dans cette section suivent une architecture de base utilisée pour le développement web d'application utilisant node js comme back-end.  une explication détaillée de chaque composant est comme suit :  

\subsubsection*{Config}
 Le dossier contient le fichier \textbf{dbconfig.js} utiliser pour la configuration de la base de données.
\begin{itemize}
    \item \textbf{ Explication : } Ce fichier contient toutes les informations nécessaires pour établir une connexion avec la base de données, comme les chaînes de connexion, les identifiants, et d'autres paramètres spécifiques à l'environnement. Cela centralise la gestion des configurations de base de données, facilitant la maintenance et la modification sans perturber le code du reste de l'application.
\end{itemize}

\subsubsection*{Controllers}
 La gestion des requêtes entre les données du front-end passe par les méthodes comprises dans ce dossier. Les détails concernant chaque fichier sont comme suit : 
\begin{itemize}
    \item \textbf{ imageController.js : } Ce contrôleur traite toutes les actions HTTP (comme POST pour télécharger une image, GET pour afficher une image, DELETE pour supprimer une image) en appelant les méthodes appropriées des modèles d'image. Ce contrôleur peut également valider ou préparer les données pour s'assurer qu'elles respectent les critères requis.

    \item \textbf{ personController.js : } ce fichier gère les actions HTTP pour les données de personnes, comme créer, mettre à jour, ou supprimer des informations sur les personnes. 
    Il contient des logiques telles que la vérification  de si les champs sont bien remplis avant de soumettre à la base donnée. 
\end{itemize}

\subsubsection*{ Models }
Ici, nous avons la configuration des différents modèles dont nous nous sommes servis pour la base de données.
\begin{itemize}
    \item \textbf{ imageModel.js : }Définit la structure des données pour les images, incluant les champs nécessaires et le type de données. On peut également inclure la configuration des relations avec d'autres modèles si nécessaire.

    \item \textbf{ index.js : } Sert à importer et à exporter tous les modèles définis dans le dossier pour faciliter l'accès depuis d'autres parties de l'application. 

     \item \textbf{ personModel.js : } Définit la structure des données pour les personnes, comme pour imageModel.js. Fournit des méthodes pour gérer les données de personnes, comme l'ajout, la mise à jour, et la suppression dans la base de données.
   \end{itemize} 
   
\subsubsection*{ Route }
le dossier contient toute la logique liée à la gestion des requêtes.

\begin{itemize}
    \item \textbf{ personRouter.js :} Mappe les routes HTTP aux méthodes spécifiques dans personController.js, facilitant ainsi la gestion des requêtes et la distribution des responsabilités. \\
    \\
    * l'intégration des middlewares et de l'authentification peut être ajoutées avant que les requêtes ne soient passées au contrôleur.   

    \item \textbf{server.js : } Configure et lance le serveur web, en utilisant le framework Express. Définit également les middlewares globaux, comme le traitement des JSON, la gestion des erreurs,et les logs. Importe et utilise les fichiers route pour connecter les requêtes entrantes aux contrôleurs appropriés.
 \end{itemize}

 
\subsubsection{ Upload }
le dossier est destiné à stocker les fichiers téléchargés via l'application, séparant le stockage des données utilisateur du code de l'application pour des raisons de sécurité et d'organisation.


Ces éléments reflètent une structure typique d'une application web moderne où la séparation des préoccupations est clairement définie pour faciliter la maintenance et la mise à jour de l'application.

\subsection{ Front-end(Vue js) }

\subsubsection{ Arborescence des méthodes et des packages les plus importantes} 
\subsubsection*{ main.js }

Ce fichier initialise l'application Vue en utilisant des importations de base comme Vue Router pour la gestion des routes, Vuex pour la gestion de l'état, et Axios pour les requêtes HTTP. Le fichier configure aussi Axios avec une URL de base pour toutes les requêtes sortantes.

\subsubsection*{Packages utilisés }

\begin{itemize}
    \item \textbf{ vue :} Framework de base pour construire des interfaces utilisateur. \\
    mon choix s'est porté sur vue en raison de sa simplicité et de sa performance. le framework est facile à apprendre, car il a une documentation claire qui facilite l'apprentissage. Léger et rapide, Vue.js optimise les mises à jour de l'interface utilisateur, garantissant des performances élevées pour les applications web modernes. Avec une communauté active et un large choix de plugins, Vue.js est idéal, car il est évolutif.

    \item \textbf{bootstrap : } Framework CSS pour le style. \\
     Il a été utilisé dû à sa capacité à accélérer considérablement le processus de développement. Grâce à son vaste ensemble de composants prédéfinis et son système de grille responsive, Bootstrap permet de créer des sites web esthétiques et fonctionnels sans avoir à écrire beaucoup de code CSS ou JavaScript from scratch. Cela rend la mise en place de designs complexes beaucoup plus simple et plus rapide.
    
    \item \textbf{ axios : } Utilisé pour les requêtes HTTP. \\
     Axios fonctionne à la fois dans le navigateur et avec Node.js, offrant une solution cohérente pour mes requêtes HTTP. Il permet d'écrire un code plus propre et plus lisible, notamment grâce à la possibilité d'utiliser async et await.
    \item \textbf{ Vuex : }  pour la gestion de l'état.\\
    Sachant que l'application Vue a plusieurs composants qui partagent un état, notament le nom ou l'email de l'utilisateur, Vuex offrir une solution robuste et bien intégrée pour maintenir la clarté et l'efficacité du code. les données stockées dans le vuex peuvent être accessible dans n'importe quel composant.
    
\end{itemize}
 
\textbf{Motivation : } La configuration de base dans ce fichier établit les dépendances essentielles pour l'application, gère l'état global et définit les styles et la structure de routage.

\subsubsection*{App.vue :} C'est le composant principal de l'application Vue qui utilise RouterView pour le rendu des composants basés sur l'URL courante. Ce fichier agit comme un point d'ancrage pour tous les autres composants et vues.

\textbf{Motivation : } Centraliser la gestion de l'interface utilisateur principale et faciliter la navigation.

\subsubsection{Détails de l'architecture des fichiers}

les dossiers et leurs composants sont expliqués de manière générale dans la section qui suit : 

\begin{itemize}
    \item \textbf{views :} Le dossier views contient des composants Vue qui représentent des pages entières et des layouts majeurs dans l'application. En d'autres termes, elle représente l'interface de l'application

    \item \textbf{Messaging : } Les fichiers à l'intérieur de ce dossier  inclus des composants pour l'affichage et la gestion des messages. Ici, des interactions avec une API externe (chatengine.io) est utilisée pour les fonctionnalités liées à la messagerie. Il utilise Axios pour les opérations REST liées à l'authentification des utilisateurs. 
    
    \item \textbf{ Router : } le fichier définit les routes de l'application Vue.js. Certaines routes sont définies soient avec un chemin, un composant ou d'autre route (sorte de relation parent-enfant ). Les routes configurées sont exportées pour être utilisés dans le fichier main de l'application.  \\
    Cette configuration permet à l'application de gérer différentes URL et de les lier à des composants spécifiques.
    
    \item \textbf{ store : } Utilisé pour la gestion de l'état. Vuex est utilisé ici pour gérer l'état global de l'application. Cela inclut les informations utilisateur, les préférences, et les données de session, qui doivent être accessibles de manière cohérente et réactive à travers l'application. La structure du store, avec ses actions, mutations, et états, assure que l'état peut être modifié de manière prévisible et traçable, celle-ci est cruciale pour le débogage et la maintenance de l'application.

    \item \textbf{ service : } ce dossier était destiné à gérer le service d'authentification. il n'a pas été mis en œuvre et a été laissé à disposition en cas de continuité du projet.    \\

Chacun de ces éléments contribue à une architecture solide, facilitant le développement, l'extension, et la maintenance de l'application.


\subsection{ comportement de l’application au run-time }

le diagramme d'activité suivant décrit les appels lorsque l'application est lancée : 

\begin{figure}[H]
    \centering
    \includegraphics[scale=0.35]{image/run diagrame.png}
    \caption{ run-time routing }
\end{figure}
 
\end{itemize}

\section{ Guide de teste}
 Les testes effectuer sont fait en utilisant jest pour les tests unitaires et supertest pour simuler les requêtes HTTP. 

 \subsection{ Test unitaire}
 Pour faire des tests unitaire, il suffit tout simple d'entré la commande \textbf{ npm test }. Cette commande exécutera tous les tests trouvés dans les fichiers .test.js ou .spec.js dans le projet. Vous verrez dans la console un rapport indiquant quels tests ont réussi et lesquels ont échoué, avec des détails sur les erreurs en cas d'échec.

\section{Licence}
La licence est sous \href{https://github.com/DISIC/design.numerique.gouv.fr/blob/master/LICENSE.md}{MIT licence}

\subsection*{Puis-je redistribuer l'application ? }
Oui, vous pouvez redistribuer et modifier le projet. La licence MIT est une licence de logiciel libre qui permet une grande flexibilité d'utilisation. Voici quelques points clés à propos de cette licence :

\begin{itemize}
    \item \textbf {Liberté de redistribution :} Vous pouvez redistribuer le logiciel, que ce soit gratuitement ou en le vendant.
    \item \textbf {Permission de modifier :} Vous avez le droit de modifier le code source du logiciel sous licence MIT selon vos besoins.
    \item \textbf {Utilisation commerciale :} Vous pouvez utiliser le logiciel dans des projets commerciaux.
    \item \textbf {Peu de restrictions :} La licence impose très peu de restrictions, principalement l'obligation de conserver le texte de la licence dans les copies ou versions substantielles du logiciel.
\end{itemize}

Cependant, même si la licence MIT est permissive, il est important de toujours conserver la mention de droit d'auteur et le texte de la licence avec le logiciel, même si vous le modifiez ou le redistribuez.

\subsection{ Annexes}
\subsubsection{Références}

\begin{itemize}
    \item Documentation Vue.js : \url{ https://vuejs.org/v2/guide/ } 
    \item Documentation Node.js : \url{https://nodejs.org/en/docs/ }
\end{itemize}

\end{document}
