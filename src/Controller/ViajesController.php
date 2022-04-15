<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;
use App\Entity\Viajes;
use App\Entity\Cliente;
use App\Entity\PasajerosViajes;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Validator\ValidatorInterface;
 /**
 * @Route("/api/viaje", name="update")
 */

class ViajesController extends AbstractController
{
    /**
     * @Route("/create", name="crear",methods={"POST"})
     */
    public function created(
        Request $request,
        ManagerRegistry $doctrine,
        ValidatorInterface $validator
        ):Response
    {
       $datos = json_decode($request->getContent());
       $entityManager = $doctrine->getManager();
       $viaje = new Viajes();
       $viaje->setCodigoViaje($datos->codViajes);
       $viaje->setNumPlaza($datos->nPlaza);
       $viaje->setDestino($datos->Destino);
       $viaje->setOrigen($datos->lOrigen);
       $viaje->setPrecio($datos->precio);
       $error = $validator->validate($viaje);
       
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
       $entityManager->persist($viaje);
       $entityManager->flush();
       return new Response(json_encode('Se Ha Registrado Un nuevo Cliente'));
    }

    /**
     * @Route("/lista", name="Lista",methods={"GET"})
     */
    public function lista(ManagerRegistry $doctrine)
    {
        $viaje = $doctrine->getRepository(Viajes::class);
        $viajes = $viaje->findAll();
        $viajesArray = [];
        foreach ($viajes as $viajero) {
            $viajesArray[] = [
                'id' => $viajero->getId(),
                'codigo' => $viajero->getCodigoViaje(),
                'destino' => $viajero->getDestino(),
                'origen' => $viajero->getOrigen(),
                'precio' => $viajero->getPrecio()
            ];
        }

        $response = new JsonResponse();
        $response->setData([
            'success' => 200,
            'data' => $viajesArray
        ]);
        return $response;
    }

    /**
     * @Route("/filtro/{id}", name="filtro",methods={"GET"})
     */
    public function filtro(ManagerRegistry $doctrine,$id)
    {
        $viaje = $doctrine->getRepository(Viajes::class);
        $viajes = $viaje->findByExampleField(json_decode($id));
        $viajesArray = [];
        foreach ($viajes as $viajero) {
            $viajesArray[] = [
                'id' => $viajero->getId(),
                'codigo' => $viajero->getCodigoViaje(),
                'destino' => $viajero->getDestino(),
                'origen' => $viajero->getOrigen(),
                'precio' => $viajero->getPrecio()
            ];
        }

        $response = new JsonResponse();
        $response->setData([
            'success' => 200,
            'data' => $viajesArray
        ]);
        return $response;
    }

     /**
     * @Route("/deleted/{id}", name="deleted",methods={"GET"})
     */
    public function deleted(ManagerRegistry $doctrine,$id)
    {
        $entityManager = $doctrine->getManager();
        $viaje = $doctrine->getRepository(Viajes::class);
        $viajes = $viaje->find($id);
        $entityManager->remove($viajes);
        $entityManager->flush();
        $viajeUpdate = $viaje->findAll();
        $viajesArray = [];
        foreach ($viajeUpdate as $viajero) {
            $viajesArray[] = [
                'id' => $viajero->getId(),
                'codigo' => $viajero->getCodigoViaje(),
                'destino' => $viajero->getDestino(),
                'origen' => $viajero->getOrigen(),
                'precio' => $viajero->getPrecio()
            ];
        }

        $response = new JsonResponse();
        $response->setData([
            'success' => 200,
            'data' => $viajesArray
        ]);
        return $response;
    }

      /**
     * @Route("/detallesViajes/{id}", name="detalles",methods={"GET"})
     */
    public function detalles(ManagerRegistry $doctrine,$id)
    {
        $entityManager = $doctrine->getManager();
        $viaje = $doctrine->getRepository(Viajes::class);
        $viajes = $viaje->find($id);
            $viajesArray[] = [
                'id' => $viajes->getId(),
                'codigo' => $viajes->getCodigoViaje(),
                'destino' => $viajes->getDestino(),
                'origen' => $viajes->getOrigen(),
                'precio' => $viajes->getPrecio(),
                'disponible' => intval($viajes->getNumPlaza())
            ];
        $viajess = $doctrine->getRepository(PasajerosViajes::class);
        $viajes3 = $viajess->findBy(array('id_viaje' =>$viajes->getId()));
        $clienteViajeR = [];
        if(count($viajes3) > 0){
            foreach ($viajes3 as $key) {
                $cliente = $doctrine->getRepository(Cliente::class);
                $clienteViaje = $cliente->find($key->getIdCliente());
                $clienteViajeR[] = [
                    'name' => $clienteViaje->getName(),
                    'cedula' => $clienteViaje->getCedula(),
                    'telf' => $clienteViaje->getTelf()
                ];
            }
        }
        $response = new JsonResponse();
        $response->setData([
            'data' => $viajesArray,
            'clientes' => $clienteViajeR
        ]);
        return $response;
    }
    /**
     * @Route("/edit/{id}", name="edit",methods={"GET"})
     */
    public function edit(ManagerRegistry $doctrine,$id)
    {
        $entityManager = $doctrine->getManager();
        $viaje = $doctrine->getRepository(Viajes::class);
        $viajes = $viaje->find($id);
            $viajesArray[] = [
                'id' => $viajes->getId(),
                'codigo' => $viajes->getCodigoViaje(),
                'destino' => $viajes->getDestino(),
                'origen' => $viajes->getOrigen(),
                'precio' => intval($viajes->getPrecio()),
                'disponible' => intval($viajes->getNumPlaza())
            ];
        $response = new JsonResponse();
        $response->setData([
            'data' => $viajesArray
        ]);
        return $response;
    }

     /**
     * @Route("/update/{id}", name="update",methods={"POST"})
     */
    public function update(ManagerRegistry $doctrine,
                           $id,
                           Request $request,
                           ValidatorInterface $validator):Response
    {
        $datos = json_decode($request->getContent());
        $entityManager = $doctrine->getManager();
        $viaje = $doctrine->getRepository(Viajes::class);
        $viajes = $viaje->find($id);
        $viajes->setDestino($datos->Destino);
        $viajes->setOrigen($datos->lOrigen);
        $viajes->setPrecio($datos->precio);
        $viajes->setNumPlaza(strval($datos->nPlaza));
        $viajes->setCodigoViaje($datos->codViajes);

        $error = $validator->validate($viajes);
       
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

        $entityManager->persist($viajes);
        $entityManager->flush();
        
        return new Response(json_encode('Se Ha Actualizad El viaje'));

    }
}
