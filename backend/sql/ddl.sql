drop table if exists member CASCADE; 
create table member
(
    username varchar(20),
    password varchar(255),
    nickname varchar(20),
    primary key (nickname) 
);
