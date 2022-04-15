<?php

namespace App\Repository;

use App\Entity\PasajerosViajes;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method PasajerosViajes|null find($id, $lockMode = null, $lockVersion = null)
 * @method PasajerosViajes|null findOneBy(array $criteria, array $orderBy = null)
 * @method PasajerosViajes[]    findAll()
 * @method PasajerosViajes[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PasajerosViajesRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, PasajerosViajes::class);
    }

    /**
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function add(PasajerosViajes $entity, bool $flush = true): void
    {
        $this->_em->persist($entity);
        if ($flush) {
            $this->_em->flush();
        }
    }

    /**
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function remove(PasajerosViajes $entity, bool $flush = true): void
    {
        $this->_em->remove($entity);
        if ($flush) {
            $this->_em->flush();
        }
    }

    // /**
    //  * @return PasajerosViajes[] Returns an array of PasajerosViajes objects
    //  */
    
    public function findByCliente($val)
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.id_cliente= :val')
            ->setParameter('val', $val)
            ->orderBy('p.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    

    /*
    public function findOneBySomeField($value): ?PasajerosViajes
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
