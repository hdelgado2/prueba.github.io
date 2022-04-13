<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Cliente;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\ORM\Tools\Pagination\Paginator;
use App\Service\ClienteManager;
class ClienteController extends AbstractController
{

    /**
     * @Route("/deletePasajero/{id}", name="delete",methods={"GET"})
     * 
     */
    public function delete(ManagerRegistry $doctrine,$id)
    {
        $entityManager = $doctrine->getManager();
        $cliente1 = $doctrine->getRepository(Cliente::class);
        $clientes = $cliente1->find($id);
        
        $entityManager->remove($clientes);
        $entityManager->flush();

        return new Response(json_encode('Se Ha Eliminado un Cliente '.$clientes->getName()));
        
    }

    /**
     * @Route("/cliente", name="app_cliente",methods={"POST"})
     * 
     */
    public function index(Request $request,ManagerRegistry $doctrine): Response
    {
        $datos_p = json_decode($request->getContent());
        $entityManager = $doctrine->getManager();

        $cliente = new Cliente();
        $cliente->setName($datos_p->nombre);
        $cliente->setCedula($datos_p->ced);
        $cliente->setFechaNacimiento(new \DateTime($datos_p->FechaN));
        $cliente->setTelf($datos_p->telf);
        $entityManager->persist($cliente);
        $entityManager->flush();

        return new Response(json_encode('Se Ha Registrado Un nuevo Cliente '.$cliente->getName()));
        
    }
    /**
     * @Route("/Listado", name="Listado",methods={"GET"})
     * 
     */    

     public function Listado(ManagerRegistry $doctrine)
     {
        $cliente1 = $doctrine->getRepository(Cliente::class);
        $clientes = $cliente1->findByExampleField();
        $clientesArray = [];
        foreach ($clientes as $cliente) {
            $clientesArray[] = [
                'id' => $cliente->getId(),
                'name' => $cliente->getName(),
                'ced' => $cliente->getCedula(),
                'fech' => $cliente->getFechaNacimiento(),
                'telf' => $cliente->getTelf()
            ];
        }

        $response = new JsonResponse();
        $response->setData([
            'success' => 200,
            'data' => $clientesArray
        ]);
        return $response;
     }
    /**
     * @Route("/Filtro/{name}", name="filtro",methods={"GET"})
     * 
     */    
     public function Filtro(ManagerRegistry $doctrine,$name)
     {
        $cliente1 = $doctrine->getRepository(Cliente::class);
        $clientes = $cliente1->findByName($name);
        $clientesArray = [];
        foreach ($clientes as $cliente) {
            $clientesArray[] = [
                'id' => $cliente->getId(),
                'name' => $cliente->getName(),
                'ced' => $cliente->getCedula(),
                'fech' => $cliente->getFechaNacimiento(),
                'telf' => $cliente->getTelf()
            ];
        }

        $response = new JsonResponse();
        $response->setData([
            'success' => 200,
            'data' => $clientesArray
        ]);
        return $response;
     }
}
