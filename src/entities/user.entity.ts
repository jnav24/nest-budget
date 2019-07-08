import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
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

    @Column({
        type: 'tinyint',
        default: '1',
    })
    active: number;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;

    @Column({
        default: '',
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
