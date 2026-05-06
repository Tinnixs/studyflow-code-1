<?php
interface IEstudanteRepository {
    public function save(EstudanteModel $estudante): bool;
    public function findAll(): array;
}