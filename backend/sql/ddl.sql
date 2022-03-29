drop table if exists user CASCADE; 
drop table if exists role CASCADE; 
drop table if exists user_role CASCADE; 

create table user
(
    id          bigine          auto_increment,
    username    varchar(20)     not null,
    password    varchar(255)    not null,
    nickname    varchar(20)     not null,
    role        varchar(10)     not null,
    primary key (id)
);

create table role
(
    id          bigint          auto_increment,
    name        varchar(50),
    primary key (id)
);

create table user_role
(
    user_id     varchar(20)     not null,
    role_id     varchar(50)     not null,
    primary key (user_id, role_id),
    constraint user_to_user_role foreign key (user_id) references user(id),
    constraint role_to_user_role foreign key (role_id) references role(id)
);
/* 
create table user
(
    username    varchar(20)     not null,
    password    varchar(255)    not null,
    nickname    varchar(20)     not null,
    primary key (username)
); */