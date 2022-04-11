drop table if exists user CASCADE; 

create table user
(
    id          bigint          auto_increment,
    username    varchar(20)     unique not null,
    password    varchar(255)    not null,
    nickname    varchar(20)     not null,
    is_admin    bool            default false,
    primary key (id)
);

/* 
create table user
(
    username    varchar(20)     not null,
    password    varchar(255)    not null,
    nickname    varchar(20)     not null,
    primary key (username)
); */