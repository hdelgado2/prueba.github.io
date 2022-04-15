<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Cliente;
use App\Entity\Viajes;
use App\Entity\PasajerosViajes;
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

           $viajes = $doctrine->getRepository(Viajes::class);
           $ViajesDisponible = $viajes->findTravelExist();
           
           $viajesExiste = [];
           
           foreach ($ViajesDisponible as $key) {
          
               $viajesExiste[] = [
                   'id' => $key->getId(),
                   'codigo_viaje' => $key->getCodigoViaje(),
                   'num_plaza' => $key->getNumPlaza(),
                   'destino' => $key->getDestino(),
                   'origen' => $key->getOrigen(),
                   'precio' => $key->getPrecio()
               ];
           }


            $viajes = $doctrine->getRepository(PasajerosViajes::class);
            $viajeClientes = $viajes->findByCliente($id);
                $viajesR = [];
                foreach ($viajeClientes as $key) {
                    $viajesRelations = $doctrine->getRepository(Viajes::class)->find($key->getIdViaje());
                    $viajesR[] = [
                        'id' => $viajesRelations->getId(),
                        'codigo_viaje' => $viajesRelations->getCodigoViaje(),
                        'num_plaza' => $viajesRelations->getNumPlaza(),
                        'destino' => $viajesRelations->getDestino(),
                        'origen' => $viajesRelations->getOrigen(),
                        'precio' => $viajesRelations->getPrecio()
                    ];
                }

       $response = new JsonResponse();
       $response->setData([
           'data' => $clientesArray,
           'viajes' => $viajesExiste,
           'ViajesR' => $viajesR
       ]);
       return $response;
    }

    /**
     * @Route("/updateCliente", name="update",methods={"POST"})
     * 
     */    
    public function update(
        ManagerRegistry $doctrine,
        Request $request,
        ValidatorInterface $validator)
    {
       $data = json_decode($request->getContent());
       $em = $doctrine->getManager();
       $cliente1 = $doctrine->getRepository(Cliente::class);
       $clientes = $cliente1->find($data->id);
       
       

       list($day, $month, $year) = explode('/', $data->fechaN);
       $date = new \DateTime();
       $date->setDate($year, $month, $day);
       $clientes->setName($data->nombre);
       $clientes->setCedula($data->ced);
       $clientes->setTelf($data->telf);
       $clientes->setFechaNacimiento($date);
       $em->persist($clientes);
       $error = $validator->validate($clientes);
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

      //$viajes = $doctrine->getRepository(Viajes::class);
      if(count($data->viajes) > 0){
      foreach ($data->viajes as $key) {
        $viajesRla = $doctrine->getRepository(PasajerosViajes::class);
        $viajesRla2 = $viajesRla->findOneBy(array('id_cliente' => $data->id,
                                                  'id_viaje' => $key->id));  
        if($viajesRla2 === null){
          $pasajeros = new PasajerosViajes();
          $pasajeros->setIdCliente($clientes->getId());
          $pasajeros->setIdViaje($key->id);
          $em->persist($pasajeros);   
        }
          
         
      }
    }
    /*$entityManager = $doctrine->getManager();
    $cliente1 = $doctrine->getRepository(Cliente::class);
    $clientes = $cliente1->find($id);
    
    $entityManager->remove($clientes);
    $entityManager->flush();*/

      if(count($data->elimiViajes) > 0){
          foreach ($data->elimiViajes as $key) {
              
            $viajesRla = $doctrine->getRepository(PasajerosViajes::class);
            $viajesRla2 = $viajesRla->findOneBy(array('id_cliente' => $data->id,
                                                      'id_viaje' => $key->id));  
            if($viajesRla2 !== null){
                $em->remove($viajesRla2);
            }
          }
      }
        
        
        $em->flush();
        return new Response(json_encode('Se Ha Actualizado El Cliente '));
        
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
