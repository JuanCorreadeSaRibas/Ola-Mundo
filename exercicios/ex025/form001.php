<?php
    class Person{
        public $nome = null;
        public $sobrenome = null;

        public function __get($attr){
            return $this->$attr;
        }
        public function __set($attr, $value){
            $this->$attr = $value;
        }
    }

    $pessoa = new Person();
    $pessoa->__set("nome",$_POST['nome']);
    $pessoa->__set("sobrenome",$_POST['sobrenome']);
    print_r($pessoa->__get("nome"))
?>