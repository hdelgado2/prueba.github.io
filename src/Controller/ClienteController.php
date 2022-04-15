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
use Symfony\Component\Validator\Constraints\DateTime;
use Symfony\Component\Validator\Validator\ValidatorInterface;


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
        $listado = $cliente1->findAll();
        $clientesArray = [];
        foreach ($listado as $cliente) {
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
            'data' => $clientesArray,
            'msg' => 'Se Eliminado con Exito'
        ]);
        
        return $response;
    }

    /**
     * @Route("/cliente", name="app_cliente",methods={"POST"})
     * 
     */
    public function index(
    Request $request,
    ManagerRegistry $doctrine,
    ValidatorInterface $validator): Response
    {
        $datos_p = json_decode($request->getContent());
        
        
        $entityManager = $doctrine->getManager();
        $cliente = new Cliente();
        $cliente->setName($datos_p->nombre);
        $cliente->setCedula($datos_p->ced);
        if($datos_p->fechaN === "") {
            
            $cliente->setFechaNacimiento(new \DateTime());

        }else{
            $cliente->setFechaNacimiento(new \DateTime($datos_p->fechaN));
        }
        
        $cliente->setTelf($datos_p->telf);

        $error = $validator->validate($cliente);
        if(count($error) > 0){
            $errores =[];
            foreach ($error as $key) {
                
                $errores[] = [
                    'errores' => (string)$key->getMessage(),
                    'campo' => $key->getPropertyPath(),
                    'is_invalid' => true
                ];
            }
            
            return new Response(json_encode($errores));
       }
        $entityManager->persist($cliente);
        $entityManager->flush();

        return new Response(json_encode('Se Ha Registrado Un nuevo Cliente'));
        
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
        $clientes = $cliente1->findByName(json_decode($name));
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
     * @Route("/pullCliente/{id}", name="editar",methods={"GET"})
     * 
     */    
    public function editar(ManagerRegistry $doctrine,$id)
    {
       $cliente1 = $doctrine->getRepository(Cliente::class);
       $clientes = $cliente1->find($id);
       
        $clientesArray = [];
            $date = new DateTime($clientes->getFechaNacimiento());
            
           $clientesArray[] = [
               'id' => $clientes->getId(),
               'name' => $clientes->getName(),
               'ced' => $clientes->getCedula(),
               'fech' => date_format($date->format,'d/m/Y'),
               'telf' => $clientes->getTelf()
           ];
       $response = new JsonResponse();
       $response->setData([
           'data' => $clientesArray
       ]);
       return $response;
    }

    /**
     * @Route("/updateCliente", name="update",methods={"POST"})
     * 
     */    
    public function update(ManagerRegistry $doctrine,Request $request)
    {
       $data = json_decode($request->getContent());
       $cliente1 = $doctrine->getRepository(Cliente::class);
       $clientes = $cliente1->find($data->id);
       $em = $doctrine->getManager();
       list($day, $month, $year) = explode('/', $data->fechaN);
       $date = new \DateTime();
       $date->setDate($year, $month, $day);
       $clientes->setName($data->nombre);
       $clientes->setCedula($data->ced);
       $clientes->setTelf($data->telf);
       $clientes->setFechaNacimiento($date);
        $em->persist($clientes);
        $em->flush();
        return new Response(json_encode('Se Ha Actualizado El Cliente '.$clientes->getName()));
        
    }
     /**
     * @Route("/detalleCliente/{id}", name="detalle",methods={"GET"})
     * 
     */    
    public function detalle(ManagerRegistry $doctrine,$id)
    {
       $cliente1 = $doctrine->getRepository(Cliente::class);
       $clientes = $cliente1->find($id);
       
        $clientesArray = [];
            $date = new DateTime($clientes->getFechaNacimiento());
            
           $clientesArray[] = [
               'id' => $clientes->getId(),
               'name' => $clientes->getName(),
               'ced' => $clientes->getCedula(),
               'fech' => date_format($date->format,'d/m/Y'),
               'telf' => $clientes->getTelf()
           ];
       $response = new JsonResponse();
       $response->setData([
           'data' => $clientesArray
       ]);
       return $response;
    }
}
