import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column({
        select: false,
    })
    password: string;

    @Column({
        nullable: true,
        select: false,
    })
    rememberMe: string;

    @Column('tinyint')
    active: number;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;

    @Column({
        select: false,
    })
    passwordResetToken: string;

    @Column({
        type: 'timestamp',
        nullable: true,
        select: false,
    })
    passwordResetExpires: string;
}
