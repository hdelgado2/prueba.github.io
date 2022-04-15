<?php

namespace App\Entity;

use App\Repository\PasajerosViajesRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=PasajerosViajesRepository::class)
 */
class PasajerosViajes
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     */
    private $id_viaje;


    /**
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue
     * @ORM\OneToMany(targetEntity="App\Entity\Cliente", mappedBy="id")
     */
    private $id_cliente;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIdViaje(): ?int
    {
        return $this->id_viaje;
    }

    public function setIdViaje(int $id_viaje): self
    {
        $this->id_viaje = $id_viaje;

        return $this;
    }

    public function getIdCliente(): ?int
    {
        return $this->id_cliente;
    }

    public function setIdCliente(int $id_cliente): self
    {
        $this->id_cliente = $id_cliente;

        return $this;
    }
}
