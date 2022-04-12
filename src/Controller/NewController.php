<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class NewController extends AbstractController
{
    /**
     * 
     * @Route("/{reactRouting}", name="inicio", defaults={"reactRouting": null})
     */
    public function inicio(): Response
    {	
        return $this->render('new/index.html.twig');
    }
	/**
     * @Route("/registrosClientes", name="Registros")
     */
    public function Registros(): Response
    {	
    	//return $this->render('new/index.html.twig', ['controller_name' => 'NewControllers']);
        
    }
}
