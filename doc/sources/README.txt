Le code latex de votre documebtation dans les différents répertoires
\documentclass[12pt]{report}
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

\pagestyle{fancy}
\fancyhf{}
\setlength{\headheight}{50pt}
\setlength{\headsep}{25pt}
\renewcommand{\headrulewidth}{2pt}

\fancyhead[L]{\includegraphics[width=1cm]{logo.png}}
\fancyhead[R]{LE « USER GUIDE » \\INFOB318\\UNamur}
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
    {\huge \textbf{User Guide du projet Clothed }} \\
    \bigskip
    \line(1,0){338} \\
    \bigskip
    Author: \text{Bruge Christian Tchatchoua } \par 
    client:  \text{Babette Diguardia} 
   
}
\date{}

\begin{document}
\maketitle

\newpage

\chapter*{Préface} % Préface

Bienvenue dans la documentation de Clothed 

\subsection*{ Voici comment le code sera structuré}
Voici un aperçu de l'organisation de la documentation. Cela vous aidera à savoir où chercher ce qui vous intéresse. 

\begin{itemize}
    \item Le chapitre sur \textbf{l'introduction } vous donne une idée générale de l'application web.
    \item Le chapitre sur \textbf{ Mes premiers pas} vous prend par la main à travers des tutoriels et une documentation pour ceux qui débutent. 
     \item  Le chapitre sur \textbf{ guide d'intallation} explique comment vous pourrez faire pour lancer l'application en local 
     \item\ le chapitre sur \textbf{Le Guide d'utilisation} Vous mène vers les différentes pages et explique à quoi servent les différents boutons et composants. 
\end{itemize}

\addcontentsline{toc}{chapter}{Préface} % Ajouter la préface à la table des matières
\thispagestyle{empty}

\setcounter{page}{1}
\tableofcontents
\newpage


\chapter{Introduction}

\section{Objectif}
\textbf{ Clothed } est une application web conçue pour permettre le partage de vêtements et autres articles entre particuliers. L'objectif est de fournir une plateforme facile à utiliser pour aider les personnes à obtenir les biens dont elles ont besoin facilement pour éviter le gaspillage de ressources. l'application a particulièrement été pensée pour mieux s'adapter aux personnes âgées.\\ 
 

\section{ Pubique cible } 
L'application a été conçue pour toute personne intéressée ou qui désire faire ou recevoir des dons gratuitement et en toute liberté. L'application est également en open source, donc elle est accessible et peut être utilisée comme modèle de base pour développer une application plus performante.
  
\section{ Les fonctionnalités principales }

Voici les fonctionnalités principal de l'application

\begin{itemize}
    \item Création de compte
    \item Messagerie
    \item fonction de filtre d'articles
    \item import, export d'image 
\end{itemize}

\section {License}
L'interface et la bibliothèque sont sous la licence \textbf{MIT Licence}. Si vous souhaitez avoir plus d'informations, vous pouvez vous rediriger vers la section \textbf{Licence} de la rubrique À propos.


\chapter{Mes premiers pas }

Si vous êtes nouveau ou n'avez aucune expérience dans le domaine de la programmation, ce guide vous permettra tout de même d'être en mesure de d'avoir access au code de l'application. L'application n'est pas déployée en ligne, donc il faudra impérativement passer par le code pour être en mesure de la lancer.

\section{Outils nécessaire et conseiller }
\begin{itemize}
    \item \href{https://code.visualstudio.com/download}{Visual studio code}: C'est l'environnement qui va contenir le code. Choisissez la version adaptée à votre système d'exploitation.
    \item \href{https://www.apachefriends.org/download.html}{Xampp}: L'outil qui fera le lien entre vous et l'espace qui va stocker toutes vos informations.

    cette documentation va utiliser le système d'exploitation Linux comme illustration
    \subsection*{ Les dépendances à installer }
    \item node js à installer en utilisant la commande \textbf{sudo apt install node} via le terminal (pour accéder au terminal, il suffit d'aller dans la barre de recherche des applications et de faire la recherche du terminal.)
    
    \begin{figure}[H]
    \centering
    \includegraphics[scale=0.25]{image/node.png}
    \caption{ installation node }
\end{figure}

    \item Installez Vue.js via la même méthode en entrant dans le terminal : \textbf{sudo apt install vue3}

    accéder au répertoire du code source en faisant un clique sur le lien qui suit : \url{https://github.com/UNamurCSFaculty/2324_INFOB318_Clothed1.git}. Cette URL va vous diriger vers une page similaire à :
    
    \begin{figure}[H]
    \centering
    \includegraphics[scale=0.25]{image/git.png}
    \caption{ page git }
\end{figure}

    Cliquez sur le bouton vert nommé\textbf{code} et faite une copie de l'url qui s'affiche 

     \begin{figure}[H]
    \centering
    \includegraphics[scale=0.25]{image/clone.png}
    \caption{ clone git }
\end{figure}

    Aprés avoir copier le lien, ouvrez \textbf{visual studio code} que vous avez téléchargé. lors de l'ouverture, une page similaire à celle ci doit être obtenu 

     \begin{figure}[H]
    \centering
    \includegraphics[scale=0.25]{image/visual.png}
    \caption{ visual studio }
\end{figure}

    vous pourrez donc aller sur le bouton \textbf{Source control} . 
    \begin{figure}[H]
    \centering
    \includegraphics[scale=0.25]{image/version_control.png}
    \caption{ version controle }
\end{figure}
 
    cliquez sur le bouton et une barre de tâche va apparaître 

    \begin{figure}[H]
    \centering
    \includegraphics[scale=0.25]{image/url.png}
    \caption{ barre visual studio }
\end{figure}

    Coller le text copier et appuyer sur \textbf{ ENTER } sur votre clavier.  Le code sera cloné et vous pourrez le voir. 
     \begin{figure}[H]
    \centering
    \includegraphics[scale=0.25]{image/code_clone.png}
    \caption{ code projet }
\end{figure}

    
    Suivez les étapes suivantes :
    \begin{itemize}
        \item ouvrez le terminal 
        
        \begin{figure}[H]
        \centering
        \includegraphics[scale=0.25]{image/v_terminal.png}
     \caption{ terminal }
\end{figure}

        \item entrez les commandes comme suit : il est divisé en deux parties \\
        \textbf{pour node\_app entrez exactement se que vous voyez à l'image }
        \begin{figure}[H]
        \centering
        \includegraphics[scale=0.25]{image/node_app.png}
     \caption{ chemin vers node  }
    \end{figure}

      \item ouvrez un autre terminal. l'image ci dessous montre comment faire: 
        \begin{figure}[H]
        \centering
        \includegraphics[scale=0.25]{image/newTeminal.png}
     \caption{ deuxième terminal  }
    \end{figure}

     \textbf{pour vue entrez exactement se que vous voyez à l'image }
     
     \item entrez les commandes comme suit : il est divisé en deux parties
        \textbf{pour vue entrez exactement se que vous voyez à l'image }
        \begin{figure}[H]
        \centering
        \includegraphics[scale=0.25]{image/vue_app.png}
     \caption{ chemin vers vue  }
     \end{figure}

    \item installer npm via la commande \textbf{sudo apt install npm} apartir de n'importe quelle terminal. 
    \item lancer xampp que vous avez déjà installer. 
    \item Intaller les dépendances du projet : c'est à dire entrez la commande (sudo apt install axios boostrap core-js veaury vuex vue-router vue react-chat-engine-pretty) dans le navigateur ayant vue.
    \item Créer un compte sur \href{https://chatengine.io/}{chatengine.io}, créer un nouveau projet et obtenez les clés de configuration du projet.
    \begin{figure}[H]
        \centering
        \includegraphics[scale=0.25]{image/clé.png}
     \caption{ clé de configuration }
     \end{figure}

     \item Allez dans le fichier env et modifier les clés en fonction de se que vous aurez. 
     \begin{figure}[H]
        \centering
        \includegraphics[scale=0.25]{image/configuration.png}
     \caption{ modification des clés  }
     \end{figure}
          
    \end{itemize}
    
    
\end{itemize}


\chapter{ guide pour lancer l'application }

\section*{Configuration Requise}

Pour lancer l'application, il suffira d' :

\begin{itemize}
    \item Aller dans le terminal de vue et entrez la commande: \textbf{ npm run serve  } 
    \item  Aller dans le terminal de node\_app et entrez la commande: \textbf{ npm start }
\end{itemize}

la configuration se fera automatiquement avec la page web du site qui sera obtenu au travers du lien local dans  :
        \begin{figure}[H]
        \centering
        \includegraphics[scale=0.25]{image/donne.png}
     \caption{ chemin vers node  }
     \end{figure}

     
\chapter{Le Guide d'utilisation}

\section{ page d'accueil  }
la page d'accueil est standard et plutôt simple à comprendre 

\begin{figure}[H]
    \centering
    \includegraphics[scale=0.22]{image/accueils.png}
    \caption{ page d'accueil }
\end{figure}

\begin{itemize}
    \item \textbf{Le formulaire de connexion} contient les champs nécessaires pour se connecter à l'application. Il nécessite un email et un mot de passe pour effectuer l'authentification.  Le bouton, \textbf{connectez-vous à votre compte} permet d'effectuer la requête qui va vous permettre de vous connecter si l'email et le mot de passe correspondent.
    
    \paragraph{}Veiller au préalable, vous rassurez que vous avez un compte déjà créer et fonctionnelle pour effectuer l'authentification. Si vous n'avez pas de compte alors, vous pouvez : \par
    Utilisez le bouton \textbf{Créer un nouveau compte }, Cela va vous diriger vers la page de création de compte.

    L'image suivante montre cette section après que le bouton a été cliqué. 

    \begin{figure}[H]
    \centering
    \includegraphics[scale=0.25]{image/creation_compte.png}
    \caption{ page de création de compte }
\end{figure}

La création du compte nécessite que tous les champs soient remplis. Après quoi, il vous suffira simplement de cliquer sur le bouton \textbf{Créer votre compte} pour enregistrer votre profil. \par

Un message similaire à celui-ci est censé apparaitre. 

 \begin{figure}[H]
    \centering
    \includegraphics[scale=0.23]{image/confirmation_creation.png}
    \caption{ page de création de compte }
\end{figure}

\paragraph{} Après la création du compte, vous serez redirigé vers la page de connexion où vous pourrez vous connecter en utilisant vos identifiants.

 \item Après l'authentification, vous serez redirigé vers la page de garde où vous aurez deux options pour continuer votre expérience dans l'application web clothed.
 
\begin{figure}[H]
    \centering
    \includegraphics[scale=0.23]{image/accueil_connecter.png}
    \caption{ page de garde}
\end{figure}

\paragraph{} Aller sur la partie donateur implique que vous souhaitez importer l'article que vous aimeriez donner. Cette section vous donne la possibilité de caractériser le type d'article que vous souhaitez offrir en l'affichant aux yeux de tous dans la section dont nous reviendrons plus tard (Bénéficiaire).

\begin{figure}[H]
    \centering
    \includegraphics[scale=0.23]{image/donateur.png}
    \caption{ page donateur}
\end{figure}

\paragraph{} De là, pour importer et envoyer une image, c'est très simple : il suffit de cliquer sur le bouton 'Importer votre article'. Cela ouvrira la fenêtre suivante.

\begin{figure}[H]
    \centering
    \includegraphics[scale=0.23]{image/importer_image.png}
    \caption{ import d'image }
\end{figure}

\paragraph{} Après avoir choisi l'image représentant l'article que vous souhaitez donner, vous pourrez sélectionner la catégorie correspondante. Une fois cela fait, vous pourrez cliquer sur le bouton 'Envoyer'. Un message similaire à celui-ci apparaîtra.

\begin{figure}[H]
    \centering
    \includegraphics[scale=0.23]{image/success_import.png}
    \caption{ réussit import }
\end{figure}

\paragraph{} Ce message indique que votre image a bien été enregistrée et est désormais disponible et visible pour tous les autres utilisateurs. Pour pouvoir visualiser votre article ou ceux des autres utilisateurs, vous devez revenir en arrière via le bouton \textbf{Retour} et vous diriger vers la section \textbf{Bénéficiaire.} 

    \item La section bénéficiaire vous donne la possibilité de voir tous les articles disponibles, avec le nom des utilisateurs auquel ils sont reliés. l'image suivante donne un aperçu de cette section.

    \begin{figure}[H]
    \centering
    \includegraphics[scale=0.23]{image/beneficaire.png}
    \caption{ réussit import }
\end{figure}

Comme on peut le voir, cette section comporte plusieurs composants que nous allons examiner un à un.

    \begin{itemize}
        \item \textbf{ Les boutons de filtres :} ces boutons qui se trouve tout en haut de la page sont principalement utiliser pour filtrer les images en fonctions de leur catégorie. cliqué sur l'un de ces boutons va nous permettre d'obtenir toutes les images associer a cette catégorie.  un exemple illustratif est comme suit :

    \begin{figure}[H]
    \centering
    \includegraphics[scale=0.23]{image/Vetement.png}
    \caption{ images par catégorie}
    \end{figure}

   En plus de caractériser par catégorie, le bouton Recherche par le nom nous permet d'exécuter une requête qui filtrera les résultats en fonction du nom entré. 

   \begin{figure}[H]
    \centering
    \includegraphics[scale=0.23]{image/recherche_nom.png}
    \caption{ recherche par le nom}
    \end{figure}

    \item Le bouton \textbf{ révéler nom } nous permet de montrer le nom de l'utilisateur qui possède l'image 

    \begin{figure}[H]
    \centering
    \includegraphics[scale=0.23]{image/montre_nom.png}
    \caption{ montre le nom }
    \end{figure}

    \item En plus des boutons visibles, nous avons la possibilité de cliquer sur l'image qui nous intéresse. Celle-ci va nous rediriger vers une page qui nous donnera la possibilité soit de contacter le propriétaire de l'article, soit d'archiver l'article. 

    \begin{figure}[H]
    \centering
    \includegraphics[scale=0.23]{image/article.png}
    \caption{ article }
    \end{figure}

       
\end{itemize}


    \item \textbf{ Message :} Cette section nous permet de communiquer entre utilisateurs. Elle offre la possibilité d'engager des conversations entre utilisateurs et de créer des groupes pour effectuer des échanges, au cas où plusieurs personnes seraient intéressées par un article. Cela permet des arrangements à l'amiable, étant donné la nature de partage qui caractérise le thème de l'application. 

    voyons à quoi représente cette section avec les composants qui la caractérise. 

    \begin{figure}[H]
    \centering
    \includegraphics[scale=0.23]{image/chat_utilisateur.png}
    \caption{ messagerie }
    \end{figure}

    cette image nous montre un exemple illustratif de la page de messagerie d'un utilisateur. 
    l'image ci-dessous nous montre les boutons essentiels si on souhaite entamer une conversation. 

     \begin{figure}[H]
    \centering
    \includegraphics[scale=0.25]{image/chat_info.png}
    \caption{ messagerie }
    \end{figure}

    \begin{itemize}
        \item Le bouton indiqué par une flèche nous permet d'ouvrir la barre qui relie aux utilisateurs, et celui entouré nous permet d'afficher tous les utilisateurs ayant des articles.  Il nous suffit donc de choisir la personne qui nous intéresse et de commencer la conversation.

        les images suivantes montres des exemples de conversation entrent entre deux utilisateurs et un autre constituer d'un groupe. 

         \begin{figure}[H]
    \centering
    \includegraphics[scale=0.22]{image/chat_groupe.png}
    \caption{ messagerie de groupe  }
    \end{figure}

     \begin{figure}[H]
    \centering
    \includegraphics[scale=0.22]{image/chat_solo.png}
    \caption{ messagerie simple }
    \end{figure}

\end{itemize}


    \item \textbf{Le profil :} Cette section fait ressortir toutes les informations qui caractérisent l'utilisateur. 

    \begin{figure}[H]
    \centering
    \includegraphics[scale=0.22]{image/profile.png}
    \caption{ profile }
    \end{figure}


    \item  \textbf{ L'archive :} Dans cette section, l'utilisateur a la possibilité de retrouver toutes ses images, y compris celles qu'il a décidé de mettre en archive. C'est sur cette page que l'utilisateur peut modifier le nom d'un article et le supprimer. Un utilisateur ne peut supprimer que ses propres articles.
    
    \begin{figure}[H]
    \centering
    \includegraphics[scale=0.22]{image/archive_modification.png}
    \caption{ archive }
    \end{figure}

    \begin{itemize}
        \item le bouton \textbf{modifier} permet de changer le nom de l'article 
        \item  le bouton \textbf{supprimer} Permet de supprimer définitivement un article de l'application web.
    \end{itemize}

\end{itemize}

\chapter{À propos}
\section{Licence}
La licence est sous \href{https://github.com/DISIC/design.numerique.gouv.fr/blob/master/LICENSE.md}{MIT licence}

\subsection*{Puis-je redistribuer l'application ? }
Oui, vous pouvez redistribuer et modifier le projet. La licence MIT est une licence de logiciel libre qui permet une grande flexibilité d'utilisation. Voici quelques points clés à propos de cette licence :

\begin{itemize}
    \item \textbf {Liberté de redistribution :} Vous pouvez redistribuer le logiciel, que ce soit gratuitement ou en le vendant.
    \item \textbf {Permission de modifier :} Vous avez le droit de modifier le code source du logiciel sous licence MIT selon vos besoins.
    \item \textbf {Utilisation commerciale :} Vous pouvez utiliser le logiciel dans des projets commerciaux.
    \item \textbf {Peu de restrictions :} La licence impose très peu de restrictions, principalement l'obligation de conserver le texte de la licence dans les copies ou versions substantielles du logiciel.

Cependant, même si la licence MIT est permissive, il est important de toujours conserver la mention de droit d'auteur et le texte de la licence avec le logiciel, même si vous le modifiez ou le redistribuez.

\section{ contacte}

Pour plus d'informations, vous pouvez envoyer un mail à 
\href{mailto:bruge.tchatchoua@student.unamur.be}{bruge.tchatchoua@student.unamur.be}

\end{itemize}

 
 
 






\end{document}
