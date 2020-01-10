CREATE database 
use  instagram;
CREATE TABLE `instagram`.`usuario` (
idUsuario int NOT NULL auto_increment,
nombre varchar (100) not null,
apodo varchar (100) not null,
correeo varchar (200) not null,
contraseña varchar (50) not null,
primary key (idUsuario)
)engine=InnoDB;


use  instagram;
CREATE TABLE `instagram`.`publicacion` (
idPublicacion int not null auto_increment,
descripcion varchar (300) not null,
fecha date not null,
imagen varchar (300) not null,
idUsuario int not null,
primary key (idPublicacion),
constraint idUsuario foreign key (idUsuario)
references usuario (idUsuario)
)engine=InnoDB;
