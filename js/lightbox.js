// affichage de la lightbox lors du clic sur une image du portfolio
function lightbox(numero)
{
    // suppression de la lightbox si déjà présente
    if(document.getElementById('display'))
        {
            document.getElementById('display').remove();
        }
    // création de la lightbox
    var portfolio = document.createElement('div');
    portfolio.id = "display";
    portfolio.role = "button";
    portfolio.tabIndex="1";

    // création des boutons de la lightbox
    var left = document.createElement('span');
    left.className="fa fa-chevron-left";
    left.ariaLabel="précédent";
    
    var right = document.createElement('span');
    right.className="fa fa-chevron-right";
    right.ariaLabel="suivant";

    var close = document.createElement('span');
    close.className="fa fa-window-close";
    close.ariaLabel="fermer";

    // ajout des boutons de contrôle à la lightbox
    portfolio.appendChild(left);
    portfolio.appendChild(right);
    portfolio.appendChild(close);

    // ajout de la lightbox au portfolio
    document.getElementsByClassName('portfolio__bloc')[0].appendChild(portfolio);

    // récupération de l'image et du titre associé selon le numéro passé en variable, et ajout à la lightbox
    var image = document.createElement('img');
    image.alt=document.getElementsByClassName('portfolio__bloc')[0].getElementsByTagName('img')[numero-1].alt;
    image.src="img/"+numero+".webp";
    document.getElementById('display').appendChild(image);
    document.getElementById('display').appendChild(document.getElementsByClassName('portfolio__bloc')[0].getElementsByTagName('h3')[numero-1].cloneNode(true));

    // écoute des boutons de contrôle de la lightbox
    if(numero <= 1)
        {
            var numero_left = 4;
            var numero_right = numero+1;
        }
    else if(numero >= 4)
        {
            var numero_left = numero-1;
            var numero_right = 1;
        }
    else
        {
            var numero_left = numero-1;
            var numero_right = numero+1;
        }

    document.getElementById('display').focus();
    document.getElementById('display').addEventListener('keydown', (touche) => {keyboard_press(touche,numero,numero_left,numero_right),false});

    document.getElementById('display').getElementsByClassName('fa-chevron-left')[0].addEventListener('click', function(){lightbox(numero_left),false});
    document.getElementById('display').getElementsByClassName('fa-chevron-right')[0].addEventListener('click', function(){lightbox(numero_right),false});
    document.getElementById('display').getElementsByClassName('fa-window-close')[0].addEventListener('click', function(){lightbox_close(),false});
}

// fermeture lightbox lors du clic sur bouton "x"
function lightbox_close()
{
    document.getElementById('display').remove();
}

// vérification de la touche pressée sur l'image, et dans la lightbox
function keyboard_press(touche,numero,numero_left,numero_right)
{
    if(touche.key=="Enter")
        {
            lightbox(numero);
        }
    else if(touche.key=="Escape")
        {
            lightbox_close();
        }
    else if(touche.key=="ArrowLeft")
        {
            lightbox(numero_left);
        }
    else if(touche.key=="ArrowRight")
        {
            lightbox(numero_right);
        }
    else
        {
            return;
        }
}
// détection sélection au clavier ou clic sur une image du portfolio
for (let i=0 ; i<=3 ; i++)
{
    document.getElementsByClassName('portfolio__bloc')[0].getElementsByTagName('img')[i].addEventListener('keydown', (touche) => {keyboard_press(touche,i+1)},false);
    document.getElementsByClassName('portfolio__bloc')[0].getElementsByTagName('img')[i].addEventListener('click', function(){lightbox(i+1)},false);
}
