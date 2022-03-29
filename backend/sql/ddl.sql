drop table if exists member CASCADE; 
create table member
(
    username    varchar(20),
    password    varchar(255),
    nickname    varchar(20),
    role        varchar(10),
    primary key (nickname)
);
