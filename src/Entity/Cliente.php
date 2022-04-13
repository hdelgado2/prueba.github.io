<?php

namespace App\Entity;

use App\Repository\ClienteRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ClienteRepository::class)
 */
class Cliente
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=50)
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=30)
     */
    private $cedula;

    /**
     * @ORM\Column(type="date")
     */
    private $fecha_nacimiento;

    /**
     * @ORM\Column(type="string", length=30)
     */
    private $telf;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getCedula(): ?string
    {
        return $this->cedula;
    }

    public function setCedula(string $cedula): self
    {
        $this->cedula = $cedula;

        return $this;
    }

    public function getFechaNacimiento(): ?\DateTimeInterface
    {
        return $this->fecha_nacimiento;
    }

    public function setFechaNacimiento(\DateTimeInterface $fecha_nacimiento): self
    {
        $this->fecha_nacimiento = $fecha_nacimiento;

        return $this;
    }

    public function getTelf(): ?string
    {
        return $this->telf;
    }

    public function setTelf(string $telf): self
    {
        $this->telf = $telf;

        return $this;
    }
}
