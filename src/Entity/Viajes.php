<?php

namespace App\Entity;

use App\Repository\ViajesRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ViajesRepository::class)
 */
class Viajes
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=30)
     */
    private $codigo_viaje;

    /**
     * @ORM\Column(type="string", length=30)
     */
    private $num_plaza;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $destino;

    /**
     * @ORM\Column(type="string", length=50)
     */
    private $origen;

    /**
     * @ORM\Column(type="float")
     */
    private $precio;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCodigoViaje(): ?string
    {
        return $this->codigo_viaje;
    }

    public function setCodigoViaje(string $codigo_viaje): self
    {
        $this->codigo_viaje = $codigo_viaje;

        return $this;
    }

    public function getNumPlaza(): ?string
    {
        return $this->num_plaza;
    }

    public function setNumPlaza(string $num_plaza): self
    {
        $this->num_plaza = $num_plaza;

        return $this;
    }

    public function getDestino(): ?string
    {
        return $this->destino;
    }

    public function setDestino(string $destino): self
    {
        $this->destino = $destino;

        return $this;
    }

    public function getOrigen(): ?string
    {
        return $this->origen;
    }

    public function setOrigen(string $origen): self
    {
        $this->origen = $origen;

        return $this;
    }

    public function getPrecio(): ?float
    {
        return $this->precio;
    }

    public function setPrecio(float $precio): self
    {
        $this->precio = $precio;

        return $this;
    }
}
