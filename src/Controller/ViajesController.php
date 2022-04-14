<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;
use App\Entity\Viajes;
use Symfony\Component\HttpFoundation\Request;

 /**
 * @Route("/api/viaje", name="update")
 */

class ViajesController extends AbstractController
{
    /**
     * @Route("/create", name="crear",methods={"POST"})
     */
    public function created(Request $request,ManagerRegistry $doctrine):Response
    {
       $datos = json_decode($request->getContent());
       $entityManager = $doctrine->getManager();
       $viaje = new Viajes();
       $viaje->setCodigoViaje($datos->codViajes);
       $viaje->setNumPlaza($datos->nPlaza);
       $viaje->setDestino($datos->Destino);
       $viaje->setOrigen($datos->lOrigen);
       $viaje->setPrecio($datos->precio);
       $entityManager->persist($viaje);
       $entityManager->flush();
       return new Response(json_encode('Se Ha Registrado Un nuevo Cliente '));
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
}
