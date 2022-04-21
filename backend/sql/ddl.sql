drop table if exists user CASCADE; 
drop table if exists memo CASCADE; 

create table user
(
    id          bigint          auto_increment,
    username    varchar(20)     unique not null,
    password    varchar(255)    not null,
    nickname    varchar(20)     not null,
    is_admin    bool            default false,
    primary key (id)
);

create table memo
(
    id          bigint          auto_increment,
    user_id     bigint          not null,
    title       varchar(255)    not null,
    memo        varchar(1000),
    primary key (id),
    foreign key (user_id) 
        references user(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
)
