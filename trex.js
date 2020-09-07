document.addEventListener('keydown', function(event)
{
		//Si el usuario presiona la barra espaciadora
		if(parseInt( event.which ) == 32)
		{
			
			if (nivel.muerto == false)
			{
				saltar();
			}
			else
			{
				ct.x=ancho+100;
				nube.x=ancho+100;
				//configura que todo vuelva a moverse
				nivel.velocidad=9;
				nube.velocidad=2;
				nivel.muerto=false;
				nivel.marcador=0;
			}
		}
		
	});

//Decalaro variables
var ancho=700;
var alto=300;
var canvas, ctx;
var suelo=200;

var ct={x:ancho + 100, y:suelo};
var nube={x:400, y:100, velocidad:2};
var suelog={x:0, y:suelo-20};
var trex={y:suelo,vy:0,gravedad:2, salto:28, vmax:9, saltando:false};

var nivel={velocidad:9, marcador:0, muerto:false};

//Inicializo el juego
function inicializar()
{
	canvas=document.getElementById('canvas');
	ctx=canvas.getContext('2d');
	cargar_imagenes();
}

//Declaro las variables de imágen y luego las cargo
var imgRex, imgNube, imgCT, imgCamino;

function cargar_imagenes()
{
	imgRex= new Image();
	imgRex.src='images/rex.png';
	imgCamino= new Image();
	imgCamino.src='images/camino.png';
	imgNube= new Image();
	imgNube.src='images/nube.png';
	imgCT= new Image();
	imgCT.src='images/ct.png';

}

//Dibujo el Rex, el suelo y la nube
function dibujaRex()
{
	ctx.drawImage(imgRex, 0,0,69,89,100,trex.y,50,50);
}
function dibujarCT()
{
	ctx.drawImage(imgCT,0,0,49,75,ct.x,ct.y,38,75);
}

function dibujarNube()
{
	ctx.drawImage(imgNube,0,0,82,33,nube.x,nube.y,82,31);
}

function dibujarSuelo()
{
	ctx.drawImage(imgCamino,suelog.x,0,700,70,0,suelog.y,700,70);
}

//Configuro el movimiento y velocidad de los objetos
function movimiento_cactus()
{
if (ct.x < -100)
 {
 	nivel.marcador+=1;
 	ct.x= ancho + 100;
 }
 else
 {
 	ct.x -= nivel.velocidad;
 }
}

function movimiento_nube()
{
 if (nube.x < -100)
 {
 	nube.x= ancho + 100;
 }
 else
 {
 	nube.x -= nube.velocidad;
 }
}

function movimiento_suelo()
{
 if (suelog.x > 700)
 {
 	suelog.x=0;
 }
 else
 {
 	suelog.x += nivel.velocidad;
 }
}

function colision()
{
	if(ct.x>=100 && ct.x<=150)
	{
		if(trex.y>=suelo-25)
		{
			//Si hay una colisión el juego deberá parar
			nivel.velocidad=0;
			nube.velocidad=0;
			nivel.muerto=true;

		}
	}
}

function saltar()
{
	trex.saltando=true;
	console.log(trex.salto);
    trex.vy=trex.salto;
}

function borrar_canvas()
{
	canvas.width=ancho;
	canvas.height=alto;
}

function gravedad()
{
	if (trex.saltando == true)
	{
		if( trex.y - trex.vy - trex.gravedad> suelo)
			{	trex.saltando=false;
				trex.vy=0;
				trex.y=suelo;
			}
			else
			{
				trex.vy-=trex.gravedad;
				trex.y-=trex.vy;
			}
	}
}

function puntuacion()
{
	ctx.font="30px impact";
	ctx.fillStyle='#555555';
	ctx.fillText(nivel.marcador,600,50);
	
	if (nivel.muerto== true)
	{
		ctx.font='60px impact';
		ctx.fillText('GAME OVER',240,150);
	}

}

//Bucle principal
var fps=50;
setInterval(function()
	{
	principal();

	},1000/fps
);

function principal()
{
	//va a ir dibujando- actualizando el manejador.. todo aquí y se ejecuta 50 (fps) veces por segundo
	try
	{
	borrar_canvas();
	colision();
	gravedad();
	dibujaRex();
	dibujarCT();
	movimiento_cactus();
	dibujarSuelo();
	movimiento_suelo();
	dibujarNube();	
	movimiento_nube();
	puntuacion();
	}
	catch(error)
	{
		console.log(error);
	}
}




